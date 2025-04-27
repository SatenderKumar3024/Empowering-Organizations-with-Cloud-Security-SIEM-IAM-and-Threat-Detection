"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Play, Clock, AlertTriangle, Shield, Server, Download, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LogoPlaceholder } from "@/components/ui/logo-placeholder"

interface SplunkEvent {
  id: string
  timestamp: string
  source: string
  sourceType: string
  host: string
  message: string
  severity: "info" | "low" | "medium" | "high" | "critical"
}

const mockSplunkEvents: SplunkEvent[] = [
  {
    id: "event-001",
    timestamp: "2025-04-27T10:15:23.000Z",
    source: "firewall",
    sourceType: "cisco:asa",
    host: "fw-edge-01",
    message: "Connection denied by ACL from 203.0.113.100:12345 to 10.0.0.5:443",
    severity: "medium",
  },
  {
    id: "event-002",
    timestamp: "2025-04-27T10:14:56.000Z",
    source: "waf",
    sourceType: "f5:bigip",
    host: "waf-prod-02",
    message: "SQL injection attempt detected in HTTP request",
    severity: "high",
  },
  {
    id: "event-003",
    timestamp: "2025-04-27T10:13:42.000Z",
    source: "ids",
    sourceType: "snort",
    host: "ids-dmz-01",
    message: "INDICATOR-SCAN Port scan detected from 198.51.100.75",
    severity: "medium",
  },
  {
    id: "event-004",
    timestamp: "2025-04-27T10:12:18.000Z",
    source: "windows",
    sourceType: "windows:security",
    host: "dc-prod-01",
    message: "Multiple failed login attempts for administrator account",
    severity: "high",
  },
  {
    id: "event-005",
    timestamp: "2025-04-27T10:11:05.000Z",
    source: "proxy",
    sourceType: "bluecoat:proxy",
    host: "proxy-corp-01",
    message: "Connection to known malicious domain malware-site.example.com",
    severity: "critical",
  },
  {
    id: "event-006",
    timestamp: "2025-04-27T10:10:32.000Z",
    source: "antivirus",
    sourceType: "symantec:ep",
    host: "ws-finance-15",
    message: "Malware detected: Trojan.Emotet in file attachment",
    severity: "critical",
  },
  {
    id: "event-007",
    timestamp: "2025-04-27T10:09:47.000Z",
    source: "linux",
    sourceType: "syslog",
    host: "web-app-03",
    message: "Failed SSH authentication attempt from 192.0.2.155",
    severity: "low",
  },
  {
    id: "event-008",
    timestamp: "2025-04-27T10:08:23.000Z",
    source: "dns",
    sourceType: "bind:query",
    host: "dns-internal-01",
    message: "DNS query for known C2 domain botnet-controller.example.net",
    severity: "high",
  },
]

export function SplunkDashboard({ timeFilter = "24h" }: { timeFilter?: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SplunkEvent[]>(mockSplunkEvents)
  const { toast } = useToast()

  const handleSearch = () => {
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults(mockSplunkEvents)
      } else {
        const filtered = mockSplunkEvents.filter(
          (event) =>
            event.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.host.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setSearchResults(filtered)
      }

      setIsSearching(false)

      toast({
        title: "Search completed",
        description: `Found ${searchResults.length} events matching your query`,
      })
    }, 1000)
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Low</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Info</Badge>
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "firewall":
        return <Shield className="h-4 w-4" />
      case "waf":
        return <Shield className="h-4 w-4" />
      case "ids":
        return <AlertTriangle className="h-4 w-4" />
      case "windows":
        return <Server className="h-4 w-4" />
      case "proxy":
        return <Server className="h-4 w-4" />
      case "antivirus":
        return <Shield className="h-4 w-4" />
      case "linux":
        return <Server className="h-4 w-4" />
      case "dns":
        return <Server className="h-4 w-4" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <LogoPlaceholder
              text="SPLUNK"
              bgColor="#000000"
              color="#65A637"
              height="24px"
              width="80px"
              className="mr-2"
            />
            Splunk Security Dashboard
          </CardTitle>
          <Badge variant="outline">Time range: {timeFilter}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search SPL: source=* host=* severity=high OR severity=critical"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
              {isSearching ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {isSearching ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              {timeFilter}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Time</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead className="w-[40%]">Message</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((event) => (
                  <TableRow key={event.id} className="hover:bg-muted/20">
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="text-primary">{getSourceIcon(event.source)}</div>
                        <span>{event.source}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{event.host}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{event.message}</TableCell>
                    <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            {searchResults.length} events found • Query time: 0.35s
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
