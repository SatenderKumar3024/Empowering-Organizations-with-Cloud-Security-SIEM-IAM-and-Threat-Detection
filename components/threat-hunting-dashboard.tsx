"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Play, Clock, Calendar, Eye, FileText } from "lucide-react"

export function ThreatHuntingDashboard() {
  const [activeTab, setActiveTab] = useState("hunts")

  const huntTemplates = [
    {
      id: "HUNT-001",
      name: "Suspicious PowerShell Commands",
      description: "Detect suspicious PowerShell commands that may indicate malicious activity",
      category: "Endpoint",
      complexity: "Medium",
      lastRun: "2023-12-10",
      status: "Available",
    },
    {
      id: "HUNT-002",
      name: "Unusual Network Connections",
      description: "Identify unusual outbound network connections to potential C2 servers",
      category: "Network",
      complexity: "High",
      lastRun: "2023-12-05",
      status: "Available",
    },
    {
      id: "HUNT-003",
      name: "Privilege Escalation Attempts",
      description: "Detect attempts to escalate privileges on systems",
      category: "Identity",
      complexity: "High",
      lastRun: "2023-11-28",
      status: "Available",
    },
    {
      id: "HUNT-004",
      name: "Unusual Authentication Patterns",
      description: "Identify unusual authentication patterns that may indicate credential theft",
      category: "Identity",
      complexity: "Medium",
      lastRun: "2023-11-20",
      status: "Available",
    },
    {
      id: "HUNT-005",
      name: "Data Exfiltration Indicators",
      description: "Detect potential data exfiltration through DNS, HTTP, or other protocols",
      category: "Network",
      complexity: "High",
      lastRun: "2023-11-15",
      status: "Available",
    },
  ]

  const activeHunts = [
    {
      id: "HUNT-RUN-001",
      name: "Suspicious PowerShell Commands",
      startTime: "2023-12-15 09:30:00",
      status: "In Progress",
      progress: 65,
      analyst: "Alex Johnson",
    },
    {
      id: "HUNT-RUN-002",
      name: "Unusual Network Connections",
      startTime: "2023-12-15 08:15:00",
      status: "In Progress",
      progress: 82,
      analyst: "Jamie Smith",
    },
  ]

  const pastHunts = [
    {
      id: "HUNT-RUN-003",
      name: "Privilege Escalation Attempts",
      startTime: "2023-12-14 14:20:00",
      endTime: "2023-12-14 15:45:00",
      status: "Completed",
      findings: 3,
      analyst: "Morgan Lee",
    },
    {
      id: "HUNT-RUN-004",
      name: "Unusual Authentication Patterns",
      startTime: "2023-12-13 10:10:00",
      endTime: "2023-12-13 11:30:00",
      status: "Completed",
      findings: 7,
      analyst: "Jamie Smith",
    },
    {
      id: "HUNT-RUN-005",
      name: "Data Exfiltration Indicators",
      startTime: "2023-12-12 09:00:00",
      endTime: "2023-12-12 10:45:00",
      status: "Completed",
      findings: 0,
      analyst: "Alex Johnson",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "High":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Threat Hunting</h2>
          <p className="text-muted-foreground">Proactively search for threats across your environment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            New Hunt
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="hunts">Hunt Templates</TabsTrigger>
          <TabsTrigger value="active">Active Hunts</TabsTrigger>
          <TabsTrigger value="past">Past Hunts</TabsTrigger>
        </TabsList>

        <TabsContent value="hunts" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search hunt templates..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="endpoint">Endpoint</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="identity">Identity</SelectItem>
                  <SelectItem value="cloud">Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {huntTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{template.category}</Badge>
                      <span className="text-muted-foreground">ID: {template.id}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Last run: {template.lastRun}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Play className="mr-2 h-4 w-4" /> Run Hunt
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hunt ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Analyst</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeHunts.map((hunt) => (
                  <TableRow key={hunt.id}>
                    <TableCell className="font-medium">{hunt.id}</TableCell>
                    <TableCell>{hunt.name}</TableCell>
                    <TableCell>{hunt.startTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(hunt.status)}>
                        {hunt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${hunt.progress}%` }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{hunt.progress}%</div>
                    </TableCell>
                    <TableCell>{hunt.analyst}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search past hunts..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hunt ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Analyst</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastHunts.map((hunt) => (
                  <TableRow key={hunt.id}>
                    <TableCell className="font-medium">{hunt.id}</TableCell>
                    <TableCell>{hunt.name}</TableCell>
                    <TableCell>{hunt.startTime}</TableCell>
                    <TableCell>{hunt.endTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(hunt.status)}>
                        {hunt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          hunt.findings > 0
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-green-500/10 text-green-500 border-green-500/20"
                        }
                      >
                        {hunt.findings}
                      </Badge>
                    </TableCell>
                    <TableCell>{hunt.analyst}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
