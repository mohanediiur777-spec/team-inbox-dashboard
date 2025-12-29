"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle, AlertCircle, ChevronDown, Copy } from "lucide-react"

const quickReplies = [
  "Thanks for reaching out! How can I help?",
  "I understand your concern. Let me look into that for you.",
  "That sounds great! Is there anything else I can help with?",
  "I appreciate your patience. We're working on it.",
]

interface ActionBarProps {
  ticketId: string
  onResolve?: (ticketId: string) => void
  onEscalate?: (ticketId: string) => void
}

export function ActionBar({ ticketId, onResolve, onEscalate }: ActionBarProps) {
  const [selectedReply, setSelectedReply] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyReply = () => {
    if (selectedReply) {
      navigator.clipboard.writeText(selectedReply)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="rounded-none border-t border-b-0 border-x-0 bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs bg-transparent hover:bg-secondary/30">
              Quick Reply
              <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {quickReplies.map((reply, idx) => (
              <DropdownMenuItem key={idx} onClick={() => setSelectedReply(reply)} className="cursor-pointer text-xs">
                {reply}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="bg-green-600/80 hover:bg-green-600 text-white text-xs"
          onClick={() => onResolve?.(ticketId)}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Resolve Ticket
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-transparent hover:bg-secondary/30"
          onClick={() => onEscalate?.(ticketId)}
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Escalate to Manager
        </Button>

        {selectedReply && (
          <div className="flex-1 flex items-center justify-between gap-2 px-3 py-2 bg-secondary/20 rounded text-xs">
            <span className="text-muted-foreground">
              Ready: <span className="italic text-foreground">{selectedReply.substring(0, 30)}...</span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCopyReply}
              title={copied ? "Copied!" : "Copy"}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
