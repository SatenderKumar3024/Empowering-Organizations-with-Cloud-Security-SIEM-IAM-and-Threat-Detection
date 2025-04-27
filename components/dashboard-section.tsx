"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Shield, Zap, BadgeAlert } from "lucide-react"
import { ThreeDGlobe } from "@/components/three-d-globe"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { IOCTable } from "@/components/ioc-table"
import { ThreatOrigins } from "@/components/threat-origins"
import { SplunkDashboard } from "@/components/integration/splunk-dashboard"
import { ServiceNowDashboard } from "@/components/integration/servicenow-dashboard"
import { useToast } from "@/hooks/use-toast"
import { VulnerabilityScanner } from "@/components/vulnerability-scanner"

interface ThreatStat {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}

export function DashboardSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [timeFilter, setTimeFilter] = useState("24h")
  const [activeTab, setActiveTab] = useState("iocs")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Define target values for each time filter
  const targetValues = {
    "24h": [42, 24587, 18, 60],
    "12h": [28, 12645, 11, 30],
    "6h": [16, 6312, 7, 15],
    "1h": [5, 1087, 2, 5],
  }

  // Animated counter stats - initialize with zeros
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

  // Function to check if all stats have reached their target values
  const allReachedTarget = useCallback((stats: ThreatStat[], targetFilter: string) => {
    const targets = targetValues[targetFilter as keyof typeof targetValues]
    return stats.every((stat, idx) => stat.value >= targets[idx])
  }, [])

  // Function to animate the stats
  const animateStats = useCallback(
    (currentFilter: string) => {
      // Clear any existing animation
      if (animationRef.current) {
        clearInterval(animationRef.current)
        animationRef.current = null
      }

      // Reset values
      setThreatStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: 0,
        })),
      )

      const targetForCurrentFilter = targetValues[currentFilter as keyof typeof targetValues]

      // Start new animation
      animationRef.current = setInterval(() => {
        setThreatStats((prev) => {
          const newStats = prev.map((stat, idx) => {
            const target = targetForCurrentFilter[idx]
            const step = Math.max(1, Math.floor(target / 20))
            const newValue = Math.min(target, stat.value + step)
            return { ...stat, value: newValue }
          })

          // If all stats have reached their targets, clear the interval
          if (allReachedTarget(newStats, currentFilter)) {
            if (animationRef.current) {
              clearInterval(animationRef.current)
              animationRef.current = null
            }
          }

          return newStats
        })
      }, 50)
    },
    [allReachedTarget],
  )

  // Effect to start animation when component comes into view
  useEffect(() => {
    if (isInView) {
      animateStats(timeFilter)
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isInView, timeFilter, animateStats])

  const refreshData = () => {
    setIsRefreshing(true)
    setProgress(0)

    // Restart animation
    animateStats(timeFilter)

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

  // Update the handleTimeFilterChange function to properly propagate the filter to all components
  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value)

    // Restart animation with new filter
    animateStats(value)

    toast({
      title: "Time filter updated",
      description: `Showing data for the last ${value}`,
    })
  }

  return (
    <section id="dashboard" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
            }}
          >
            Threat Intelligence Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Interactive visualization of global cyber threats, security events, and critical indicators of compromise.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <DashboardSidebar />

            <div className="flex-1">
              <Tabs defaultValue="iocs" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="iocs" data-value="iocs">
                      IOCs
                    </TabsTrigger>
                    <TabsTrigger value="map" data-value="global-threats">
                      Threat Map
                    </TabsTrigger>
                    <TabsTrigger value="analytics" data-value="threat-hunting">
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

                  <Tabs value={timeFilter} onValueChange={handleTimeFilterChange} className="hidden md:block">
                    <TabsList>
                      <TabsTrigger value="24h">24h</TabsTrigger>
                      <TabsTrigger value="12h">12h</TabsTrigger>
                      <TabsTrigger value="6h">6h</TabsTrigger>
                      <TabsTrigger value="1h">1h</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <TabsContent value="iocs" className="mt-0" id="iocs">
                  <IOCTable timeFilter={timeFilter} />
                </TabsContent>

                <TabsContent value="map" className="mt-0" id="global-threats">
                  <Card className="border-primary/20 bg-background/70 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="pb-0">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <CardTitle>Global Threat Map</CardTitle>
                        <div className="md:hidden">
                          <Tabs value={timeFilter} onValueChange={handleTimeFilterChange}>
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

                <TabsContent value="analytics" className="mt-0 space-y-6" id="threat-hunting">
                  <ThreatOrigins timeFilter={timeFilter} />
                </TabsContent>

                <TabsContent value="vulnerabilities" className="mt-0" id="vulnerabilities">
                  <VulnerabilityScanner timeFilter={timeFilter} />
                </TabsContent>

                <TabsContent value="splunk" className="mt-0" id="splunk">
                  <SplunkDashboard timeFilter={timeFilter} />
                </TabsContent>

                <TabsContent value="servicenow" className="mt-0" id="servicenow">
                  <ServiceNowDashboard />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
