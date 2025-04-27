"use client"

import { useState, useEffect } from "react"
import { Bell, X, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Define threat types and severity levels
type Severity = "Low" | "Medium" | "High" | "Critical"
type ThreatType = "Phishing" | "Malware" | "DDoS" | "Ransomware" | "Zero-day" | "Brute Force" | "SQL Injection"

interface Threat {
  type: ThreatType
  severity: Severity
  timestamp: Date
}

export function ThreatNotification() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [threats, setThreats] = useState<Threat[]>([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [newThreatsCount, setNewThreatsCount] = useState(0)
  const [criticalAlertsCount, setCriticalAlertsCount] = useState(0)

  // Function to generate random threats
  const generateRandomThreats = () => {
    const threatTypes: ThreatType[] = [
      "Phishing",
      "Malware",
      "DDoS",
      "Ransomware",
      "Zero-day",
      "Brute Force",
      "SQL Injection",
    ]
    const severityLevels: Severity[] = ["Low", "Medium", "High", "Critical"]

    // Generate random number of threats (0-3)
    const numThreats = Math.floor(Math.random() * 4)
    const newThreats: Threat[] = []

    for (let i = 0; i < numThreats; i++) {
      const type = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)]
      newThreats.push({
        type,
        severity,
        timestamp: new Date(),
      })
    }

    // Keep only the most recent 5 threats
    const updatedThreats = [...newThreats, ...threats].slice(0, 5)
    setThreats(updatedThreats)
    setLastUpdated(new Date())
    setNewThreatsCount(updatedThreats.length)
    setCriticalAlertsCount(updatedThreats.filter((t) => t.severity === "Critical").length)
  }

  // Update threats periodically
  useEffect(() => {
    // Initial threats
    generateRandomThreats()

    // Update every 15 seconds
    const interval = setInterval(() => {
      generateRandomThreats()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Get severity badge color
  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case "Low":
        return "bg-green-500 hover:bg-green-600"
      case "Medium":
        return "bg-blue-500 hover:bg-blue-600"
      case "High":
        return "bg-amber-500 hover:bg-amber-600"
      case "Critical":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed left-4 bottom-4 z-50 max-w-xs w-full animate-in fade-in slide-in-from-left-5 duration-300">
      <Card className="bg-slate-950 text-white border-slate-800 shadow-xl overflow-hidden">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-400" />
            <h3 className="font-medium">Real-time Threat Updates</h3>
          </div>
          <div className="flex items-center gap-1">
            <Badge className="bg-green-600 hover:bg-green-700">Live</Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-3 pt-0 space-y-3">
            <div className="text-sm text-slate-400">Last updated: {lastUpdated.toLocaleTimeString()}</div>

            <div className="space-y-1">
              <div className="text-sm">{newThreatsCount} new threats detected</div>
              {criticalAlertsCount > 0 && (
                <div className="text-sm text-red-400">{criticalAlertsCount} critical alerts</div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium">Latest Threats:</div>
              <div className="space-y-2">
                {threats.map((threat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-sm">{threat.type}</div>
                    <Badge className={getSeverityColor(threat.severity)}>{threat.severity}</Badge>
                  </div>
                ))}
                {threats.length === 0 && <div className="text-sm text-slate-400">No threats detected</div>}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
