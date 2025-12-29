import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إعداد الاتصال بقاعدة البيانات
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'hamdi_secret_pass_123';

// 1. تفعيل الرابط مع فيسبوك
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

// 2. استقبال الرسايل وتخزينها
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === 'page') {
      // Loop على كل الأحداث اللي وصلت
      for (const entry of body.entry) {
        const webhook_event = entry.messaging?.[0];
        
        if (webhook_event) {
          console.log('Received event:', webhook_event);

          const sender_id = webhook_event.sender.id;
          const recipient_id = webhook_event.recipient.id;
          
          // تحديد نوع الرسالة (هل هي من عميل ولا رد من الصفحة؟)
          // فيسبوك بيبعت flag اسمه is_echo = true لو دي رسالة خارجة من الصفحة
          const is_echo = webhook_event.message?.is_echo || false;
          const text = webhook_event.message?.text;

          if (text) {
            // تسجيل الرسالة في Supabase
            const { error } = await supabase
              .from('messages')
              .insert({
                sender_id: sender_id,
                recipient_id: recipient_id,
                text: text,
                is_echo: is_echo, // ده أهم حقل للفلترة في الداشبورد
                platform: 'facebook'
              });

            if (error) console.error('Supabase Error:', error);
            else console.log('Message Saved to DB ✅');
          }
        }
      }
      return new NextResponse('EVENT_RECEIVED', { status: 200 });
    }
    return new NextResponse('Not Found', { status: 404 });
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}