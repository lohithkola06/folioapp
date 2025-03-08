"use client"

import { FileText } from "lucide-react"

export function DocumentList() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-all">
          <div className="rounded-lg bg-slate-100/80 p-2.5">
            <FileText className="h-5 w-5 text-slate-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-900">Document {i + 1}</div>
            <div className="text-sm text-slate-500">Added on {new Date().toLocaleDateString()}</div>
          </div>
          <div className="text-sm text-slate-500">PDF • 2.3MB</div>
        </div>
      ))}
    </div>
  )
} 