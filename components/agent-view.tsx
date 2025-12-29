"use client"

import { useState } from "react"
import { TicketSidebar, type Ticket } from "./agent/ticket-sidebar"
import { ChatInterface, type ChatData } from "./agent/chat-interface"
import { ActionBar } from "./agent/action-bar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

interface AgentViewProps {
  tickets?: Ticket[]
  chatDataMap?: Record<string, ChatData>
  onResolveTicket?: (ticketId: string) => void
  onEscalateTicket?: (ticketId: string) => void
}

export function AgentView({ tickets = [], chatDataMap = {}, onResolveTicket, onEscalateTicket }: AgentViewProps) {
  const [selectedTicketId, setSelectedTicketId] = useState<string>("")

  const currentChatData = selectedTicketId ? chatDataMap[selectedTicketId] : undefined

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <TicketSidebar selectedId={selectedTicketId} onSelectTicket={setSelectedTicketId} tickets={tickets} />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={75}>
        <div className="flex flex-col h-full">
          <ChatInterface ticketId={selectedTicketId} chatData={currentChatData} />
          <ActionBar ticketId={selectedTicketId} onResolve={onResolveTicket} onEscalate={onEscalateTicket} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
