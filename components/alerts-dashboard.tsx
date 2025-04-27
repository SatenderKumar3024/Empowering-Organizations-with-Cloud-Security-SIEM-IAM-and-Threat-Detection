"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, Eye, Settings } from "lucide-react"

export function AlertsDashboard() {
  const [activeTab, setActiveTab] = useState("all")

  const alerts = [
    {
      id: "ALERT-001",
      title: "Critical Vulnerability Detected",
      description: "CVE-2023-1234 affecting multiple systems",
      date: "12/15/2023, 9:32:00 AM",
      source: "Vulnerability Scanner",
      severity: "critical",
      status: "open",
    },
    {
      id: "ALERT-002",
      title: "Suspicious Login Attempt",
      description: "Multiple failed login attempts from IP 203.0.113.42",
      date: "12/15/2023, 8:45:00 AM",
      source: "SIEM",
      severity: "high",
      status: "investigating",
    },
    {
      id: "ALERT-003",
      title: "Malware Detected",
      description: "Trojan detected on workstation WS-042",
      date: "12/15/2023, 5:12:00 AM",
      source: "Endpoint Protection",
      severity: "high",
      status: "mitigated",
    },
    {
      id: "ALERT-004",
      title: "Unusual Network Traffic",
      description: "Unusual outbound traffic to 198.51.100.23:4444",
      date: "12/15/2023, 4:27:00 AM",
      source: "Network Monitor",
      severity: "medium",
      status: "open",
    },
    {
      id: "ALERT-005",
      title: "New IOC Added to Watchlist",
      description: "Domain malicious-domain.com added to watchlist",
      date: "12/14/2023, 11:05:00 AM",
      source: "Threat Intelligence",
      severity: "low",
      status: "closed",
    },
  ]

  const filteredAlerts = activeTab === "all" ? alerts : alerts.filter((alert) => alert.status === activeTab)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "investigating":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "mitigated":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "closed":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
          <p className="text-muted-foreground">Monitor and manage security alerts from various detection systems.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 max-w-md">
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="investigating">Investigating</TabsTrigger>
          <TabsTrigger value="mitigated">Mitigated</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Alerts</h3>
            <p className="text-sm text-muted-foreground">Security alerts from all monitoring systems</p>

            <div className="grid gap-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2 text-lg">{alert.id}</CardTitle>
                        <CardTitle className="mt-1">{alert.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="mt-1">{alert.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm">
                      <div>{alert.date}</div>
                      <div>{alert.source}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Alert Settings</h3>
        <p className="text-sm text-muted-foreground mb-6">Configure alert notifications and preferences</p>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Configure how you receive alert notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="slack-notifications">Slack Notifications</Label>
                </div>
                <Switch id="slack-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <Switch id="sms-notifications" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
              <CardDescription>Set thresholds for different alert severities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="critical-alerts">Critical Alerts</Label>
                  <span className="text-sm text-muted-foreground">Immediate</span>
                </div>
                <Slider defaultValue={[100]} max={100} step={1} id="critical-alerts" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-alerts">High Alerts</Label>
                  <span className="text-sm text-muted-foreground">15 minutes</span>
                </div>
                <Slider defaultValue={[75]} max={100} step={1} id="high-alerts" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="medium-alerts">Medium Alerts</Label>
                  <span className="text-sm text-muted-foreground">1 hour</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} id="medium-alerts" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="low-alerts">Low Alerts</Label>
                  <span className="text-sm text-muted-foreground">Daily digest</span>
                </div>
                <Slider defaultValue={[25]} max={100} step={1} id="low-alerts" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
