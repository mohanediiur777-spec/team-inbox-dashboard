"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export interface Ticket {
  id: string
  customer: string
  preview: string
  status: "open" | "pending" | "closed"
  channel: "facebook" | "instagram" | "whatsapp"
  unread: boolean
  timestamp: string
}

const channelColors = {
  whatsapp: "bg-green-500/20 text-green-400",
  facebook: "bg-blue-500/20 text-blue-400",
  instagram: "bg-pink-500/20 text-pink-400",
}

const statusColors = {
  open: "bg-blue-500/20 text-blue-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  closed: "bg-gray-500/20 text-gray-400",
}

interface TicketSidebarProps {
  selectedId: string
  onSelectTicket: (id: string) => void
  tickets?: Ticket[]
}

export function TicketSidebar({ selectedId, onSelectTicket, tickets = [] }: TicketSidebarProps) {
  const [filter, setFilter] = useState<"all" | "open" | "pending" | "closed">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter = filter === "all" || ticket.status === filter
    const matchesSearch =
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.preview.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusCounts = () => ({
    open: tickets.filter((t) => t.status === "open").length,
    pending: tickets.filter((t) => t.status === "pending").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  })

  const counts = getStatusCounts()

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="p-4 border-b border-border space-y-3">
        <h2 className="font-semibold">Inbox</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {[
            { label: "Open", value: "open" as const, count: counts.open },
            { label: "Pending", value: "pending" as const, count: counts.pending },
            { label: "Closed", value: "closed" as const, count: counts.closed },
          ].map(({ label, value, count }) => (
            <Button
              key={value}
              variant={filter === value ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(value)}
              className="text-xs"
            >
              {label} ({count})
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => onSelectTicket(ticket.id)}
              className={`w-full px-4 py-3 border-b border-border text-left transition-all duration-200 ${
                selectedId === ticket.id ? "bg-primary/10 border-l-2 border-l-primary" : "hover:bg-secondary/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`font-medium truncate ${ticket.unread ? "font-bold" : ""}`}>{ticket.customer}</span>
                {ticket.unread && <div className="h-2 w-2 rounded-full bg-primary animate-pulse flex-shrink-0 mt-1" />}
              </div>
              <p className="text-xs text-muted-foreground truncate mb-2">{ticket.preview}</p>
              <div className="flex items-center gap-1 flex-wrap">
                <Badge variant="secondary" className={`text-xs ${channelColors[ticket.channel]}`}>
                  {ticket.channel}
                </Badge>
                <Badge variant="secondary" className={`text-xs ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto">{ticket.timestamp}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground text-sm">No tickets found</div>
        )}
      </div>
    </div>
  )
}
