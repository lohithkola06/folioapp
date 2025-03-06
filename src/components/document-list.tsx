"use client"

import { FileText } from "lucide-react"

export function DocumentList() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
          <div className="rounded-lg bg-muted p-2">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Document {i + 1}</div>
            <div className="text-sm text-muted-foreground">Added on {new Date().toLocaleDateString()}</div>
          </div>
          <div className="text-sm text-muted-foreground">PDF • 2.3MB</div>
        </div>
      ))}
    </div>
  )
} 