"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface FeedItem {
  id: string
  agent: string
  customer: string
  action: string
  timestamp: string
  channel: "facebook" | "instagram" | "whatsapp"
}

const channelBadgeColors = {
  whatsapp: "bg-green-500/20 text-green-400",
  facebook: "bg-blue-500/20 text-blue-400",
  instagram: "bg-pink-500/20 text-pink-400",
}

const agentColors = ["text-blue-400", "text-purple-400", "text-pink-400", "text-amber-400"]

interface LiveFeedProps {
  feedItems?: FeedItem[]
}

export function LiveFeed({ feedItems = [] }: LiveFeedProps) {
  const [feed, setFeed] = useState(feedItems)

  useEffect(() => {
    const agents = ["Sarah", "Mike", "Alex", "Emma"]
    const customers = ["John", "Emma", "Alex", "Lisa", "James", "Patricia", "Robert"]
    const actions = ["replied to", "resolved ticket for", "assigned to", "escalated from"]
    const channels = ["whatsapp", "facebook", "instagram"] as const

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newItem: FeedItem = {
          id: String(Date.now()),
          agent: agents[Math.floor(Math.random() * agents.length)],
          customer: customers[Math.floor(Math.random() * customers.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          timestamp: "just now",
          channel: channels[Math.floor(Math.random() * channels.length)],
        }
        setFeed((prev) => [newItem, ...prev.slice(0, 9)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Live Activity Feed</h2>
      <div className="space-y-3">
        {feed.length > 0 ? (
          feed.map((item, idx) => (
            <Card
              key={item.id}
              className={`bg-secondary/30 border-border p-4 hover:bg-secondary/50 transition-all duration-300 ${
                idx === 0 ? "animate-in slide-in-from-top-2 duration-300" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className={`font-semibold ${agentColors[Math.floor(Math.random() * agentColors.length)]}`}>
                      {item.agent}
                    </span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-semibold text-foreground">{item.customer}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="secondary" className={`text-xs ${channelBadgeColors[item.channel]}`}>
                    {item.channel}
                  </Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.timestamp}</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground text-sm">No activity yet</div>
        )}
      </div>
    </div>
  )
}
