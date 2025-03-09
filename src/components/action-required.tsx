"use client"

import { Clock } from "lucide-react"

export function ActionRequired() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
        <Clock className="h-6 w-6 text-orange-600" />
      </div>
      <h3 className="mb-1 font-medium text-slate-900">No Actions Required</h3>
      <p className="text-sm text-slate-500">You're all caught up! No documents need your attention.</p>
    </div>
  )
} 