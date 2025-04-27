"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { IOCTable } from "@/components/ioc-table"
import { SecurityAnalytics } from "@/components/security-analytics"
import { VulnerabilityDashboard } from "@/components/vulnerability-dashboard"
import { EnhancedSplunkDashboard } from "@/components/integration/enhanced-splunk-dashboard"
import { ServiceNowDashboard } from "@/components/integration/servicenow-dashboard"
import { TeamDashboard } from "@/components/team-dashboard"
import { AlertsDashboard } from "@/components/alerts-dashboard"
import { SettingsDashboard } from "@/components/settings-dashboard"
import { ThreatHuntingDashboard } from "@/components/threat-hunting-dashboard"

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("iocs")

  // Listen for navigation events from the sidebar
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      if (event.detail && event.detail.tabValue) {
        setActiveTab(event.detail.tabValue)
      }
    }

    // Add event listener
    window.addEventListener("dashboardNavigate", handleNavigation as EventListener)

    // Clean up
    return () => {
      window.removeEventListener("dashboardNavigate", handleNavigation as EventListener)
    }
  }, [])

  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="iocs" data-value="iocs">
              IOCs
            </TabsTrigger>
            <TabsTrigger value="reports" data-value="reports">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" data-value="vulnerabilities">
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger value="splunk" data-value="splunk">
              Splunk
            </TabsTrigger>
            <TabsTrigger value="servicenow" data-value="servicenow">
              ServiceNow
            </TabsTrigger>
          </TabsList>

          <TabsContent value="iocs" id="iocs" className="mt-0 space-y-6">
            <IOCTable />
          </TabsContent>

          <TabsContent value="threat-hunting" id="threat-hunting" className="mt-0 space-y-6">
            <ThreatHuntingDashboard />
          </TabsContent>

          <TabsContent value="reports" id="reports" className="mt-0 space-y-6">
            <SecurityAnalytics />
          </TabsContent>

          <TabsContent value="vulnerabilities" id="vulnerabilities" className="mt-0 space-y-6">
            <VulnerabilityDashboard />
          </TabsContent>

          <TabsContent value="team" id="team" className="mt-0 space-y-6">
            <TeamDashboard />
          </TabsContent>

          <TabsContent value="alerts" id="alerts" className="mt-0 space-y-6">
            <AlertsDashboard />
          </TabsContent>

          <TabsContent value="splunk" id="splunk" className="mt-0 space-y-6">
            <EnhancedSplunkDashboard />
          </TabsContent>

          <TabsContent value="servicenow" id="servicenow" className="mt-0 space-y-6">
            <ServiceNowDashboard />
          </TabsContent>

          <TabsContent value="settings" id="settings" className="mt-0 space-y-6">
            <SettingsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
