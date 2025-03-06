"use client"

import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActionRequired() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
          <div className="rounded-lg bg-yellow-100 p-2">
            <Clock className="h-4 w-4 text-yellow-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Signature Required - Document {i + 1}</div>
            <div className="text-sm text-muted-foreground">Waiting for your signature</div>
          </div>
          <Button size="sm">Sign Now</Button>
        </div>
      ))}
    </div>
  )
} 