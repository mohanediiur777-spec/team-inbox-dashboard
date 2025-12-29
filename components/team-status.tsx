"use client"
import { Card } from "@/components/ui/card"

export interface TeamMember {
  id: string
  name: string
  status: "online" | "offline" | "busy"
  assignedTickets: number
  responseTime: string
}

const statusColors = {
  online: "bg-green-500/20 text-green-400",
  busy: "bg-yellow-500/20 text-yellow-400",
  offline: "bg-gray-500/20 text-gray-400",
}

const statusDot = {
  online: "bg-green-500",
  busy: "bg-yellow-500",
  offline: "bg-gray-500",
}

interface TeamStatusProps {
  members?: TeamMember[]
}

export function TeamStatus({ members = [] }: TeamStatusProps) {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-sm mb-4">Team Status</h3>
      <div className="space-y-2">
        {members.length > 0 ? (
          members.map((member) => (
            <Card
              key={member.id}
              className={`bg-secondary/40 border-border p-3 hover:bg-secondary/60 transition-all duration-200 cursor-pointer ${
                member.status === "offline" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-2 w-2 rounded-full ${statusDot[member.status]} animate-pulse`} />
                <span className="font-medium text-sm truncate">{member.name}</span>
                <span className="text-xs text-muted-foreground ml-auto capitalize">{member.status}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1 ml-4">
                <div className="flex justify-between">
                  <span>Tickets:</span>
                  <span className="font-medium">{member.assignedTickets}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response:</span>
                  <span className="font-medium">{member.responseTime}</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground text-sm">No team members</div>
        )}
      </div>
    </div>
  )
}
