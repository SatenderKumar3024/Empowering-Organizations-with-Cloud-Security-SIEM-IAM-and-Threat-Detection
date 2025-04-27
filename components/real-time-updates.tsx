"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Zap, Globe, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ThreatUpdate {
  id: string
  type: string
  severity: "Low" | "Medium" | "High" | "Critical"
  timestamp: Date
  details?: string
  source?: string
}

export function RealTimeUpdates() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [newThreats, setNewThreats] = useState(5)
  const [criticalAlerts, setCriticalAlerts] = useState(2)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [latestThreats, setLatestThreats] = useState<ThreatUpdate[]>([
    {
      id: "threat-1",
      type: "Phishing",
      severity: "High",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      details: "Targeted phishing campaign detected against financial sector",
      source: "Email Gateway",
    },
    {
      id: "threat-2",
      type: "Malware",
      severity: "Critical",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      details: "Ransomware signature detected on endpoint",
      source: "EDR",
    },
    {
      id: "threat-3",
      type: "DDoS",
      severity: "High",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      details: "Volumetric attack targeting web servers",
      source: "Network IDS",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update the last updated time
      setLastUpdated(new Date())

      // Random chance to add a new threat
      if (Math.random() > 0.7) {
        const threatTypes = ["Phishing", "Malware", "DDoS", "Brute Force", "Data Exfiltration", "Insider Threat"]
        const severities: ("Low" | "Medium" | "High" | "Critical")[] = ["Low", "Medium", "High", "Critical"]
        const sources = ["Email Gateway", "EDR", "Network IDS", "SIEM", "Firewall", "WAF"]

        const newThreat: ThreatUpdate = {
          id: `threat-${Date.now()}`,
          type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          timestamp: new Date(),
          details: `New ${threatTypes[Math.floor(Math.random() * threatTypes.length)]} activity detected`,
          source: sources[Math.floor(Math.random() * sources.length)],
        }

        setLatestThreats((prev) => [newThreat, ...prev.slice(0, 2)])
        setNewThreats((prev) => prev + 1)

        if (newThreat.severity === "Critical") {
          setCriticalAlerts((prev) => prev + 1)
        }
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "High":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "Low":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      default:
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
    }
  }

  return (
    <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Real-time Threat Updates
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
            Live
          </Badge>
        </CardTitle>
        <button
          onClick={handleRefresh}
          className="p-1 rounded-full hover:bg-muted transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
        </button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-xs text-muted-foreground mb-4 flex justify-between items-center">
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              {newThreats} new threats detected
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-red-500" />
              {criticalAlerts} critical alerts
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Latest Threats:</h3>

          <div className="space-y-3">
            {latestThreats.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center p-2 rounded-md bg-muted/50"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{threat.type}</span>
                    <Badge className={getSeverityColor(threat.severity)}>{threat.severity}</Badge>
                  </div>
                  {threat.details && <span className="text-xs text-muted-foreground mt-1">{threat.details}</span>}
                </div>
                <div className="flex flex-col items-end text-xs text-muted-foreground">
                  <span>{threat.timestamp.toLocaleTimeString()}</span>
                  {threat.source && <span>{threat.source}</span>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-2">
            <Globe className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-xs text-muted-foreground">Monitoring global threat landscape</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
