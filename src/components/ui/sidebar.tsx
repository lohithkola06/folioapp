"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function SidebarTrigger() {
  const context = React.useContext(SidebarContext)
  if (!context) return null
  return (
    <button onClick={() => context.setIsOpen(!context.isOpen)}>
      Toggle
    </button>
  )
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>
}

export function Sidebar({ 
  children, 
  className,
  collapsible 
}: { 
  children: React.ReactNode; 
  className?: string;
  collapsible?: "none" | "hover" | "click";
}) {
  return <div className={cn("w-64", className)}>{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-2 py-1 text-xs font-semibold text-muted-foreground", className)}>{children}</div>
}

export function SidebarGroupContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  )
}

export function SidebarMenuButton({ 
  children, 
  className, 
  asChild,
  isActive 
}: { 
  children: React.ReactNode; 
  className?: string; 
  asChild?: boolean;
  isActive?: boolean;
}) {
  return (
    <button 
      className={cn(
        "flex w-full items-center gap-2 px-2 py-1.5 text-sm",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

export function SidebarMenuAction({ children, showOnHover, className }: { children: React.ReactNode; showOnHover?: boolean; className?: string }) {
  return (
    <button className={cn(
      "opacity-0 group-hover:opacity-100 transition-opacity",
      className
    )}>
      {children}
    </button>
  )
}

export function SidebarMenuBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
      {children}
    </div>
  )
}

export function SidebarMenuSub({ children }: { children: React.ReactNode }) {
  return <div className="ml-4">{children}</div>
}

export function SidebarMenuSubItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenuSubButton({ 
  children, 
  className, 
  asChild 
}: { 
  children: React.ReactNode; 
  className?: string; 
  asChild?: boolean;
}) {
  return (
    <button className={cn("flex w-full items-center gap-2 px-2 py-1.5 text-sm", className)}>
      {children}
    </button>
  )
}

export function SidebarRail() {
  return <div className="absolute right-0 top-0 h-full w-[1px] bg-border" />
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-2 border-b">{children}</div>
} 