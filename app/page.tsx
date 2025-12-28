"use client"

import { useState } from "react"
import { AgentView } from "@/components/agent-view"
import { ManagerView } from "@/components/manager-view"
import { Button } from "@/components/ui/button"

type UserRole = "agent" | "manager"

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>("agent")

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">SD</span>
            </div>
            <h1 className="text-lg font-semibold">Support Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={currentRole === "agent" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentRole("agent")}
            >
              Agent View
            </Button>
            <Button
              variant={currentRole === "manager" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentRole("manager")}
            >
              Manager View
            </Button>
          </div>
        </div>
      </div>

      <main className="flex h-[calc(100vh-56px)] overflow-hidden">
        {currentRole === "agent" ? <AgentView /> : <ManagerView />}
      </main>
    </div>
  )
}
