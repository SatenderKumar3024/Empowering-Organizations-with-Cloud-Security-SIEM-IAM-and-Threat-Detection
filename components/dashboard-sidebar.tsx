"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Compass,
  Globe,
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
}

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("iocs")

  const sidebarItems: SidebarItem[] = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: "IOCs",
      href: "#iocs",
      count: 2347,
      active: activeItem === "iocs",
    },
    {
      icon: <Compass className="h-5 w-5" />,
      label: "Threat Hunting",
      href: "#threat-hunting",
      active: activeItem === "threat-hunting",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Global Threats",
      href: "#global-threats",
      count: 156,
      active: activeItem === "global-threats",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: "Vulnerabilities",
      href: "#vulnerabilities",
      active: activeItem === "vulnerabilities",
    },
    {
      icon: <FileBarChart className="h-5 w-5" />,
      label: "Reports",
      href: "#reports",
      active: activeItem === "reports",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Team",
      href: "#team",
      active: activeItem === "team",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Alerts",
      href: "#alerts",
      count: 7,
      active: activeItem === "alerts",
    },
    {
      icon: <Database className="h-5 w-5" />,
      label: "Splunk",
      href: "#splunk",
      active: activeItem === "splunk",
    },
    {
      icon: <Ticket className="h-5 w-5" />,
      label: "ServiceNow",
      href: "#servicenow",
      active: activeItem === "servicenow",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "#settings",
      active: activeItem === "settings",
    },
  ]

  const handleItemClick = (label: string, href: string) => {
    const itemId = label.toLowerCase().replace(/\s+/g, "-")
    setActiveItem(itemId)

    // Find the tab element and click it if it exists
    const tabId = href.replace("#", "")
    const tabElement = document.querySelector(`[data-value="${tabId}"], [value="${tabId}"]`) as HTMLElement
    if (tabElement) {
      tabElement.click()
    }

    // Scroll to the section if it exists
    const section = document.getElementById(href.replace("#", ""))
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
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
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                item.active ? "bg-primary/15 text-primary" : "text-foreground",
              )}
              onClick={(e) => {
                e.preventDefault()
                handleItemClick(item.label, item.href)
              }}
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
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
