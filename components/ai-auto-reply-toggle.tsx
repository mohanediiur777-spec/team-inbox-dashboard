"use client"

import { Switch } from "@/components/ui/switch"
import { Bot } from "lucide-react"

interface AIAutoReplyToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export function AIAutoReplyToggle({ enabled, onChange }: AIAutoReplyToggleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">AI Auto-Reply</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">Enable when team is offline</p>
      <div className="flex items-center gap-2">
        <Switch checked={enabled} onCheckedChange={onChange} id="ai-toggle" />
        <label htmlFor="ai-toggle" className="text-xs font-medium cursor-pointer">
          {enabled ? "Enabled" : "Disabled"}
        </label>
      </div>
      {enabled && (
        <div className="mt-2 p-2 bg-primary/10 rounded text-xs text-primary">
          AI responses active for offline tickets
        </div>
      )}
    </div>
  )
}
