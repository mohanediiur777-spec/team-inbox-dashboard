"use client"

import { useState } from "react"
import { DashboardOverview, type DashboardStats } from "./manager/dashboard-overview"
import { LiveFeed, type FeedItem } from "./manager/live-feed"
import { TeamStatus, type TeamMember } from "./manager/team-status"
import { AIAutoReplyToggle } from "./manager/ai-auto-reply-toggle"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

interface ManagerViewProps {
  dashboardStats?: DashboardStats
  feedItems?: FeedItem[]
  teamMembers?: TeamMember[]
  onAIToggle?: (enabled: boolean) => void
}

export function ManagerView({ dashboardStats, feedItems, teamMembers, onAIToggle }: ManagerViewProps) {
  const [aiEnabled, setAiEnabled] = useState(false)

  const handleAIToggle = (enabled: boolean) => {
    setAiEnabled(enabled)
    onAIToggle?.(enabled)
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="flex flex-col h-full border-r border-border">
          <div className="p-4 border-b border-border">
            <AIAutoReplyToggle enabled={aiEnabled} onChange={handleAIToggle} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <TeamStatus members={teamMembers} />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={75}>
        <div className="flex flex-col h-full overflow-hidden">
          <DashboardOverview stats={dashboardStats} />
          <div className="border-t border-border flex-1 overflow-y-auto">
            <LiveFeed feedItems={feedItems} />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
