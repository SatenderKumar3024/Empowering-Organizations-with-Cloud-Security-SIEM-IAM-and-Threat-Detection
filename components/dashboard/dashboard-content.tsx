"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Shield, Zap, BadgeAlert, RefreshCw, Download } from "lucide-react"
import { ThreeDGlobe } from "@/components/three-d-globe"
import { IOCTable } from "@/components/ioc-table"
import { ThreatOrigins } from "@/components/threat-origins"
import { useAuth } from "@/components/auth/auth-provider"

interface ThreatStat {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}

export function DashboardContent() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("24h")
  const [activeTab, setActiveTab] = useState("iocs")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Animated counter stats
  const [threatStats, setThreatStats] = useState<ThreatStat[]>([
    {
      label: "Active Threats",
      value: 0,
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-red-500",
    },
    {
      label: "Security Events",
      value: 0,
      icon: <Shield className="h-5 w-5" />,
      color: "text-amber-500",
    },
    {
      label: "Critical IOCs",
      value: 0,
      icon: <BadgeAlert className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      label: "Refresh Rate",
      value: 0,
      icon: <Zap className="h-5 w-5" />,
      color: "text-green-500",
    },
  ])

  // Animated counter effect
  useEffect(() => {
    const targetValues = {
      "24h": [42, 24587, 18, 60],
      "12h": [28, 12645, 11, 30],
      "6h": [16, 6312, 7, 15],
      "1h": [5, 1087, 2, 5],
    }

    const targetForCurrentFilter = targetValues[timeFilter as keyof typeof targetValues]

    const interval = setInterval(() => {
      setThreatStats((prev) =>
        prev.map((stat, idx) => {
          const target = targetForCurrentFilter[idx]
          const step = Math.max(1, Math.floor(target / 20))
          const newValue = Math.min(target, stat.value + step)
          return { ...stat, value: newValue }
        }),
      )
    }, 50)

    const allReachedTarget = () => {
      return threatStats.every((stat, idx) => stat.value >= targetForCurrentFilter[idx])
    }

    if (allReachedTarget()) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timeFilter, threatStats])

  const refreshData = () => {
    setIsRefreshing(true)
    setProgress(0)

    // Reset stats to animate them again
    setThreatStats((prev) =>
      prev.map((stat) => ({
        ...stat,
        value: 0,
      })),
    )

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRefreshing(false)

          toast({
            title: "Data refreshed",
            description: `Updated with latest threat intelligence data as of ${new Date().toLocaleTimeString()}`,
          })

          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Your threat intelligence data is being exported to CSV",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">Here's what's happening in your security environment today</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {isRefreshing && <Progress value={progress} className="h-1" />}

      <Tabs defaultValue="iocs" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="iocs">IOCs</TabsTrigger>
            <TabsTrigger value="map">Threat Map</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <Tabs value={timeFilter} onValueChange={setTimeFilter} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="12h">12h</TabsTrigger>
              <TabsTrigger value="6h">6h</TabsTrigger>
              <TabsTrigger value="1h">1h</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="iocs" className="mt-0">
          <IOCTable />
        </TabsContent>
        <TabsContent value="map" className="mt-0">
          <Card className="border-primary/20 bg-background/70 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle>Global Threat Map</CardTitle>
                <div className="md:hidden">
                  <Tabs value={timeFilter} onValueChange={setTimeFilter}>
                    <TabsList>
                      <TabsTrigger value="24h">24h</TabsTrigger>
                      <TabsTrigger value="12h">12h</TabsTrigger>
                      <TabsTrigger value="6h">6h</TabsTrigger>
                      <TabsTrigger value="1h">1h</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {threatStats.map((stat, idx) => (
                  <Card key={idx} className="bg-card/30 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</p>
                        </div>
                        <div className={`p-2 rounded-full bg-primary/10 ${stat.color}`}>{stat.icon}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="aspect-[16/9] w-full h-[400px] md:h-[500px] bg-background/30 rounded-lg overflow-hidden border border-primary/20">
                <ThreeDGlobe timeFilter={timeFilter} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-0 space-y-6">
          <ThreatOrigins />
        </TabsContent>
      </Tabs>
    </div>
  )
}
