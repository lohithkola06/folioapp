"use client"

import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActionRequired() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-all">
          <div className="rounded-lg bg-orange-50 p-2.5">
            <Clock className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-900">Signature Required - Document {i + 1}</div>
            <div className="text-sm text-slate-500">Waiting for your signature</div>
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 h-9 px-4 rounded-lg shadow-sm">Sign Now</Button>
        </div>
      ))}
    </div>
  )
} 