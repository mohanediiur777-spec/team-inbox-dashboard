"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Clock, AlertCircle, Star } from "lucide-react"

export interface DashboardStats {
  avgResponseTime: string
  unresolvedCount: number
  topAgent: {
    name: string
    satisfaction: number
  }
}

interface StatCard {
  label: string
  value: string
  unit?: string
  icon: React.ReactNode
  color: string
}

interface DashboardOverviewProps {
  stats?: DashboardStats
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  const statCards: StatCard[] = [
    {
      label: "Avg Response Time",
      value: stats?.avgResponseTime || "—",
      unit: "mins",
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-400",
    },
    {
      label: "Unresolved Tickets",
      value: stats?.unresolvedCount.toString() || "—",
      unit: "active",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-amber-400",
    },
    {
      label: "Top Performing Agent",
      value: stats?.topAgent.name || "—",
      unit: stats?.topAgent.satisfaction ? `${stats.topAgent.satisfaction}% satisfaction` : undefined,
      icon: <Star className="h-5 w-5" />,
      color: "text-green-400",
    },
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, idx) => (
          <Card key={idx} className="bg-secondary/40 border-border p-4 hover:bg-secondary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  {stat.unit && <span className="text-xs text-muted-foreground">{stat.unit}</span>}
                </div>
              </div>
              <div className={`${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
