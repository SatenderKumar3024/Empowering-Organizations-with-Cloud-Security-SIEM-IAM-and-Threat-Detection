"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, MoreHorizontal, FileText, AlertTriangle, Shield, Server } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface IOCData {
  indicator: string
  type: "file" | "url" | "email" | "domain" | "ip"
  threatType: string
  source: "AbuseIPDB" | "OTX" | "MISP" | "ThreatConnect"
  timestamp: string
  country: string
  confidence: number
}

// Full dataset
const fullIOCData: IOCData[] = [
  {
    indicator: "k6x7jkitb5nlh9f5o4amabo14zbna9jo.exe",
    type: "file",
    threatType: "Botnet",
    source: "AbuseIPDB",
    timestamp: "4/7/2025, 11:11:59 PM",
    country: "SE",
    confidence: 20,
  },
  {
    indicator: "4i1zbn71j5ii1vw96cq86gm923lv8z75.exe",
    type: "file",
    threatType: "C2",
    source: "AbuseIPDB",
    timestamp: "4/24/2025, 8:07:08 PM",
    country: "CN",
    confidence: 98,
  },
  {
    indicator: "https://bbp5f2sx.net/path/jmnnz",
    type: "url",
    threatType: "Malware (Emotet)",
    source: "OTX",
    timestamp: "4/11/2025, 12:42:35 PM",
    country: "NL",
    confidence: 56,
  },
  {
    indicator: "https://xru33a3a.org/path/470kq",
    type: "url",
    threatType: "Ransomware",
    source: "OTX",
    timestamp: "4/1/2025, 11:25:13 PM",
    country: "US",
    confidence: 96,
  },
  {
    indicator: "https://wo68hjeq.com/path/iybbj",
    type: "url",
    threatType: "Malware (Lokibot)",
    source: "OTX",
    timestamp: "4/25/2025, 6:13:56 PM",
    country: "IN",
    confidence: 78,
  },
  {
    indicator: "https://i69hr0th.org/path/haqjn",
    type: "url",
    threatType: "Ransomware",
    source: "OTX",
    timestamp: "4/21/2025, 10:29:57 AM",
    country: "BR",
    confidence: 30,
  },
  {
    indicator: "pahv2nhyke0u4ven4g7rjzl415sw8vje.exe",
    type: "file",
    threatType: "Scanning",
    source: "OTX",
    timestamp: "4/16/2025, 5:33:11 AM",
    country: "ES",
    confidence: 66,
  },
  {
    indicator: "8lccf70g@90659r.org",
    type: "email",
    threatType: "Malware (Emotet)",
    source: "OTX",
    timestamp: "4/21/2025, 3:22:06 AM",
    country: "CN",
    confidence: 44,
  },
  {
    indicator: "w5tdg8wlfnb1ydfpjobr1jmznveozhut.pdf",
    type: "file",
    threatType: "C2",
    source: "OTX",
    timestamp: "3/29/2025, 2:23:17 PM",
    country: "CA",
    confidence: 1,
  },
  {
    indicator: "w0x19vnt@7mionr.com",
    type: "email",
    threatType: "Phishing",
    source: "AbuseIPDB",
    timestamp: "4/11/2025, 5:57:25 PM",
    country: "DE",
    confidence: 18,
  },
  // Additional entries for different time filters
  {
    indicator: "malicious-domain.com",
    type: "domain",
    threatType: "Phishing",
    source: "MISP",
    timestamp: "4/26/2025, 2:15:00 PM",
    country: "RU",
    confidence: 85,
  },
  {
    indicator: "192.168.1.254",
    type: "ip",
    threatType: "Scanning",
    source: "ThreatConnect",
    timestamp: "4/26/2025, 1:30:00 PM",
    country: "KP",
    confidence: 92,
  },
  {
    indicator: "evil-attachment.docx",
    type: "file",
    threatType: "Malware",
    source: "MISP",
    timestamp: "4/26/2025, 12:45:00 PM",
    country: "IR",
    confidence: 77,
  },
  {
    indicator: "admin@phishing-domain.net",
    type: "email",
    threatType: "Phishing",
    source: "AbuseIPDB",
    timestamp: "4/26/2025, 11:20:00 AM",
    country: "UA",
    confidence: 63,
  },
  {
    indicator: "https://fake-login.com/portal",
    type: "url",
    threatType: "Credential Harvesting",
    source: "OTX",
    timestamp: "4/26/2025, 10:05:00 AM",
    country: "BY",
    confidence: 89,
  },
]

export function IOCTable({ timeFilter = "24h" }: { timeFilter?: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<IOCData[]>([])
  const [totalCount, setTotalCount] = useState(20000)

  // Filter data based on time filter
  useEffect(() => {
    // Get current date for comparison
    const now = new Date()

    // Calculate the cutoff time based on the timeFilter
    let cutoffTime: Date
    switch (timeFilter) {
      case "1h":
        cutoffTime = new Date(now.getTime() - 60 * 60 * 1000)
        setTotalCount(5000)
        break
      case "6h":
        cutoffTime = new Date(now.getTime() - 6 * 60 * 60 * 1000)
        setTotalCount(10000)
        break
      case "12h":
        cutoffTime = new Date(now.getTime() - 12 * 60 * 60 * 1000)
        setTotalCount(15000)
        break
      case "24h":
      default:
        cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        setTotalCount(20000)
        break
    }

    // For demo purposes, we'll just show different numbers of items based on the time filter
    // In a real app, you would filter by the actual timestamp
    let filteredItems: IOCData[]
    switch (timeFilter) {
      case "1h":
        filteredItems = fullIOCData.slice(0, 3)
        break
      case "6h":
        filteredItems = fullIOCData.slice(0, 5)
        break
      case "12h":
        filteredItems = fullIOCData.slice(0, 8)
        break
      case "24h":
      default:
        filteredItems = fullIOCData
        break
    }

    // Apply search filter if there is a search query
    if (searchQuery) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.threatType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredData(filteredItems)
  }, [timeFilter, searchQuery])

  const getIconForType = (type: string) => {
    switch (type) {
      case "file":
        return <FileText className="h-4 w-4" />
      case "url":
        return <AlertTriangle className="h-4 w-4" />
      case "email":
        return <Shield className="h-4 w-4" />
      default:
        return <Server className="h-4 w-4" />
    }
  }

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500/20 text-green-500 border-green-500/30"
    if (confidence >= 50) return "bg-amber-500/20 text-amber-500 border-amber-500/30"
    return "bg-red-500/20 text-red-500 border-red-500/30"
  }

  return (
    <TooltipProvider>
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Indicators of Compromise</h2>
            <p className="text-muted-foreground text-sm">
              Comprehensive list of all detected IOCs with detailed information and filtering options.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search IOCs..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-normal">
                {timeFilter} data
              </Badge>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Indicator</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Threat Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((ioc, i) => (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-xs truncate max-w-[180px]">{ioc.indicator}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="text-primary">{getIconForType(ioc.type)}</div>
                        <span>{ioc.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ioc.threatType}</TableCell>
                    <TableCell>{ioc.source}</TableCell>
                    <TableCell className="text-muted-foreground">{ioc.timestamp}</TableCell>
                    <TableCell>{ioc.country}</TableCell>
                    <TableCell>
                      <div className="w-full bg-muted/30 rounded-full h-1.5 mt-1.5 mb-1">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"
                          style={{ width: `${ioc.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs">{ioc.confidence}%</span>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">View details</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View details</TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-sm text-muted-foreground mt-4">
              Showing {filteredData.length} of {totalCount} IOCs
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
