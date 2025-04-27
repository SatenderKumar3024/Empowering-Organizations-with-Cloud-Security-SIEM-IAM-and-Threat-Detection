"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Compass,
  FileBarChart,
  Users,
  Bell,
  Settings,
  Search,
  Shield,
  Database,
  Ticket,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  count?: number
  active?: boolean
  value: string
}

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("iocs")

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: "IOCs",
      href: "#iocs",
      value: "iocs",
      count: 2347,
      active: activeItem === "iocs",
    },
    {
      icon: <Compass className="h-5 w-5" />,
      label: "Threat Hunting",
      href: "#threat-hunting",
      value: "threat-hunting",
      active: activeItem === "threat-hunting",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: "Vulnerabilities",
      href: "#vulnerabilities",
      value: "vulnerabilities",
      active: activeItem === "vulnerabilities",
    },
    {
      icon: <FileBarChart className="h-5 w-5" />,
      label: "Reports",
      href: "#reports",
      value: "reports",
      active: activeItem === "reports",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Team",
      href: "#team",
      value: "team",
      active: activeItem === "team",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Alerts",
      href: "#alerts",
      value: "alerts",
      count: 7,
      active: activeItem === "alerts",
    },
    {
      icon: <Database className="h-5 w-5" />,
      label: "Splunk",
      href: "#splunk",
      value: "splunk",
      active: activeItem === "splunk",
    },
    {
      icon: <Ticket className="h-5 w-5" />,
      label: "ServiceNow",
      href: "#servicenow",
      value: "servicenow",
      active: activeItem === "servicenow",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "#settings",
      value: "settings",
      active: activeItem === "settings",
    },
  ]

  // Create a custom event to communicate between components
  const handleItemClick = (item: SidebarItem) => {
    setActiveItem(item.value)

    // Dispatch a custom event that the dashboard content can listen for
    const event = new CustomEvent("dashboardNavigate", {
      detail: { tabValue: item.value },
    })
    window.dispatchEvent(event)

    // Try to find and click the tab directly as a fallback
    const tabElement = document.querySelector(`[data-value="${item.value}"]`) as HTMLElement
    if (tabElement) {
      tabElement.click()
    }
  }

  return (
    <div className="w-64 border-r border-border/30 min-h-[500px] bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-sm">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="w-full rounded-md bg-background/50 border border-border/50 px-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search dashboards..."
          />
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="flex items-center justify-between px-2 py-1.5">
          <h3 className="text-sm font-medium text-muted-foreground">DASHBOARDS</h3>
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary px-1.5">
            {sidebarItems.length}
          </Badge>
        </div>
        <div className="mt-2 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                item.active ? "bg-primary/15 text-primary" : "text-foreground",
              )}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <div className="flex items-center">
                {item.count !== undefined && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "mr-1 px-1 py-0 text-xs",
                      item.active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {item.count}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
