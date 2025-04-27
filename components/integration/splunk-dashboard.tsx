"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw, Download } from "lucide-react"
import Image from "next/image"

const alertData = [
  { name: "00:00", alerts: 12 },
  { name: "01:00", alerts: 8 },
  { name: "02:00", alerts: 5 },
  { name: "03:00", alerts: 3 },
  { name: "04:00", alerts: 2 },
  { name: "05:00", alerts: 4 },
  { name: "06:00", alerts: 7 },
  { name: "07:00", alerts: 15 },
  { name: "08:00", alerts: 25 },
  { name: "09:00", alerts: 32 },
  { name: "10:00", alerts: 28 },
  { name: "11:00", alerts: 20 },
  { name: "12:00", alerts: 18 },
  { name: "13:00", alerts: 23 },
  { name: "14:00", alerts: 31 },
  { name: "15:00", alerts: 38 },
  { name: "16:00", alerts: 42 },
  { name: "17:00", alerts: 35 },
  { name: "18:00", alerts: 28 },
  { name: "19:00", alerts: 22 },
  { name: "20:00", alerts: 18 },
  { name: "21:00", alerts: 15 },
  { name: "22:00", alerts: 12 },
  { name: "23:00", alerts: 10 },
]

const sourceData = [
  { name: "Firewall", value: 145 },
  { name: "IDS/IPS", value: 87 },
  { name: "EDR", value: 65 },
  { name: "WAF", value: 43 },
  { name: "DNS", value: 32 },
  { name: "DHCP", value: 21 },
  { name: "VPN", value: 18 },
]

const severityData = [
  { name: "Critical", value: 24 },
  { name: "High", value: 45 },
  { name: "Medium", value: 78 },
  { name: "Low", value: 53 },
  { name: "Informational", value: 120 },
]

export function SplunkDashboard() {
  const [activeTab, setActiveTab] = useState("alerts")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 1500)
  }

  useEffect(() => {
    // Initial load simulation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <Card className="w-full shadow-lg border-border/50">
      <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 relative">
              {"/splunk-logo.png" ? (
                <Image src="/splunk-logo.png" alt="Splunk Logo" fill className="object-contain" />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center rounded-full">
                  <span className="text-xs font-medium">S</span>
                </div>
              )}
            </div>
            <CardTitle>Splunk Security Dashboard</CardTitle>
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              Connected
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        <div className="text-xs text-white/70 mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="alerts">Alert Timeline</TabsTrigger>
            <TabsTrigger value="sources">Alert Sources</TabsTrigger>
            <TabsTrigger value="severity">Severity Distribution</TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <div className="text-sm text-muted-foreground">Loading Splunk data...</div>
              </div>
            </div>
          ) : (
            <>
              <TabsContent value="alerts" className="mt-0">
                <ChartContainer
                  config={{
                    alerts: {
                      label: "Security Alerts",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={alertData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="alerts"
                        stroke="var(--color-alerts)"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="text-sm text-muted-foreground mt-2 text-center">
                  Security alert volume over the last 24 hours
                </div>
              </TabsContent>

              <TabsContent value="sources" className="mt-0">
                <ChartContainer
                  config={{
                    value: {
                      label: "Alert Count",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sourceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="text-sm text-muted-foreground mt-2 text-center">Security alerts by source system</div>
              </TabsContent>

              <TabsContent value="severity" className="mt-0">
                <ChartContainer
                  config={{
                    value: {
                      label: "Alert Count",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={severityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="text-sm text-muted-foreground mt-2 text-center">Security alerts by severity level</div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
