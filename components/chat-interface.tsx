"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Phone, MoreVertical, Paperclip } from "lucide-react"

export interface Message {
  id: string
  sender: "agent" | "customer"
  text: string
  timestamp: string
}

export interface ChatData {
  customerId: string
  customerName: string
  messages: Message[]
}

interface ChatInterfaceProps {
  ticketId: string
  chatData?: ChatData
}

export function ChatInterface({ ticketId, chatData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(chatData?.messages || [])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatData) {
      setMessages(chatData.messages)
    }
  }, [chatData])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: String(Date.now()),
      sender: "agent",
      text: input,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInput("")
    // TODO: Send message to API
  }

  const customerName = chatData?.customerName || "Customer"

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{customerName}</h3>
          <p className="text-xs text-muted-foreground">Ticket #{ticketId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "agent" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                  message.sender === "agent"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No messages yet</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-card p-4">
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Press Enter to send</p>
      </div>
    </div>
  )
}
