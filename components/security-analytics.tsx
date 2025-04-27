"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileBarChart } from "lucide-react"

const threatData = [
  { name: "Jan", malware: 65, phishing: 42, ddos: 23, ransomware: 12 },
  { name: "Feb", malware: 59, phishing: 38, ddos: 27, ransomware: 15 },
  { name: "Mar", malware: 80, phishing: 43, ddos: 29, ransomware: 18 },
  { name: "Apr", malware: 81, phishing: 55, ddos: 43, ransomware: 22 },
  { name: "May", malware: 56, phishing: 48, ddos: 38, ransomware: 19 },
  { name: "Jun", malware: 55, phishing: 52, ddos: 35, ransomware: 23 },
]

const severityData = [
  { name: "Critical", value: 24, color: "#ef4444" },
  { name: "High", value: 45, color: "#f97316" },
  { name: "Medium", value: 78, color: "#eab308" },
  { name: "Low", value: 53, color: "#3b82f6" },
]

const sourceData = [
  { name: "External", value: 65, color: "#8b5cf6" },
  { name: "Internal", value: 35, color: "#06b6d4" },
]

export function SecurityAnalytics() {
  const [activeTab, setActiveTab] = useState("trends")

  return (
    <Card className="w-full shadow-lg border-border/50">
      <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex items-center gap-2">
          <FileBarChart className="h-5 w-5 text-purple-400" />
          <CardTitle>Security Analytics</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="trends">Threat Trends</TabsTrigger>
            <TabsTrigger value="severity">Severity Distribution</TabsTrigger>
            <TabsTrigger value="sources">Threat Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-0">
            <ChartContainer
              config={{
                malware: {
                  label: "Malware",
                  color: "hsl(var(--chart-1))",
                },
                phishing: {
                  label: "Phishing",
                  color: "hsl(var(--chart-2))",
                },
                ddos: {
                  label: "DDoS",
                  color: "hsl(var(--chart-3))",
                },
                ransomware: {
                  label: "Ransomware",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={threatData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="malware" stackId="a" fill="var(--color-malware)" />
                  <Bar dataKey="phishing" stackId="a" fill="var(--color-phishing)" />
                  <Bar dataKey="ddos" stackId="a" fill="var(--color-ddos)" />
                  <Bar dataKey="ransomware" stackId="a" fill="var(--color-ransomware)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="text-sm text-muted-foreground mt-2 text-center">
              Monthly security incident trends over the last 6 months
            </div>
          </TabsContent>

          <TabsContent value="severity" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} incidents`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground mt-2 text-center">
              Distribution of security incidents by severity level
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground mt-2 text-center">
              Distribution of security incidents by source
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
