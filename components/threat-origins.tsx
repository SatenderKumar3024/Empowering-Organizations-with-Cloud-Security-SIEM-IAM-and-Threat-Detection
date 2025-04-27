"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ThreatOrigin {
  country: string
  count: number
  percentage: number
}

interface ThreatTarget {
  country: string
  count: number
  percentage: number
}

// Data for different time filters
const threatOriginsData = {
  "24h": [
    { country: "China", count: 1243, percentage: 24 },
    { country: "Russia", count: 932, percentage: 18 },
    { country: "North Korea", count: 621, percentage: 12 },
    { country: "Iran", count: 465, percentage: 9 },
    { country: "United States", count: 362, percentage: 7 },
  ],
  "12h": [
    { country: "China", count: 743, percentage: 26 },
    { country: "Russia", count: 532, percentage: 19 },
    { country: "North Korea", count: 421, percentage: 15 },
    { country: "Iran", count: 265, percentage: 9 },
    { country: "United States", count: 162, percentage: 6 },
  ],
  "6h": [
    { country: "China", count: 443, percentage: 28 },
    { country: "Russia", count: 332, percentage: 21 },
    { country: "North Korea", count: 221, percentage: 14 },
    { country: "Iran", count: 165, percentage: 10 },
    { country: "United States", count: 92, percentage: 6 },
  ],
  "1h": [
    { country: "China", count: 143, percentage: 30 },
    { country: "Russia", count: 132, percentage: 28 },
    { country: "North Korea", count: 81, percentage: 17 },
    { country: "Iran", count: 65, percentage: 14 },
    { country: "United States", count: 32, percentage: 7 },
  ],
}

const threatTargetsData = {
  "24h": [
    { country: "United States", count: 1654, percentage: 32 },
    { country: "United Kingdom", count: 723, percentage: 14 },
    { country: "Germany", count: 568, percentage: 11 },
    { country: "Canada", count: 465, percentage: 9 },
    { country: "Australia", count: 362, percentage: 7 },
  ],
  "12h": [
    { country: "United States", count: 954, percentage: 34 },
    { country: "United Kingdom", count: 423, percentage: 15 },
    { country: "Germany", count: 368, percentage: 13 },
    { country: "Canada", count: 265, percentage: 9 },
    { country: "Australia", count: 162, percentage: 6 },
  ],
  "6h": [
    { country: "United States", count: 554, percentage: 36 },
    { country: "United Kingdom", count: 223, percentage: 15 },
    { country: "Germany", count: 168, percentage: 11 },
    { country: "Canada", count: 145, percentage: 9 },
    { country: "Australia", count: 92, percentage: 6 },
  ],
  "1h": [
    { country: "United States", count: 154, percentage: 38 },
    { country: "United Kingdom", count: 73, percentage: 18 },
    { country: "Germany", count: 58, percentage: 14 },
    { country: "Canada", count: 45, percentage: 11 },
    { country: "Australia", count: 32, percentage: 8 },
  ],
}

export function ThreatOrigins({ timeFilter = "24h" }: { timeFilter?: string }) {
  const [threatOrigins, setThreatOrigins] = useState<ThreatOrigin[]>([])
  const [threatTargets, setThreatTargets] = useState<ThreatTarget[]>([])

  useEffect(() => {
    // Update data based on time filter
    setThreatOrigins(threatOriginsData[timeFilter as keyof typeof threatOriginsData] || threatOriginsData["24h"])
    setThreatTargets(threatTargetsData[timeFilter as keyof typeof threatTargetsData] || threatTargetsData["24h"])
  }, [timeFilter])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Threat Origins</CardTitle>
          <p className="text-sm text-muted-foreground">
            Countries with highest malicious activity in the last {timeFilter}
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {threatOrigins.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.country}</span>
                  <Badge variant="outline" className="font-normal text-xs">
                    {item.count} threats
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[200px] h-2 bg-muted/30 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-300"
                      style={{ width: `${item.percentage * 3}px` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Target Countries</CardTitle>
          <p className="text-sm text-muted-foreground">Most frequently targeted countries in the last {timeFilter}</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {threatTargets.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.country}</span>
                  <Badge variant="outline" className="font-normal text-xs">
                    {item.count} threats
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[200px] h-2 bg-muted/30 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-300"
                      style={{ width: `${item.percentage * 3}px` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
