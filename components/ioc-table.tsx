"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Download, Copy, AlertCircle } from "lucide-react"

interface IOC {
  id: string
  type: string
  value: string
  firstSeen: string
  lastSeen: string
  confidence: "Low" | "Medium" | "High"
  source: string
  campaign?: string
}

export function IOCTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [iocs, setIocs] = useState<IOC[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIocs([
        {
          id: "ioc-001",
          type: "IP Address",
          value: "192.168.45.123",
          firstSeen: "2025-04-20",
          lastSeen: "2025-04-27",
          confidence: "High",
          source: "Internal SIEM",
          campaign: "BlackCat Ransomware",
        },
        {
          id: "ioc-002",
          type: "Domain",
          value: "malicious-domain.com",
          firstSeen: "2025-04-22",
          lastSeen: "2025-04-27",
          confidence: "Medium",
          source: "Threat Intelligence Feed",
        },
        {
          id: "ioc-003",
          type: "Hash",
          value: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
          firstSeen: "2025-04-15",
          lastSeen: "2025-04-26",
          confidence: "High",
          source: "CISA Advisory",
          campaign: "APT29 Campaign",
        },
        {
          id: "ioc-004",
          type: "URL",
          value: "https://fake-login.malicious-site.net/portal",
          firstSeen: "2025-04-24",
          lastSeen: "2025-04-27",
          confidence: "High",
          source: "Phishing Report",
          campaign: "Credential Harvest",
        },
        {
          id: "ioc-005",
          type: "Email",
          value: "suspicious@phishing-domain.com",
          firstSeen: "2025-04-23",
          lastSeen: "2025-04-25",
          confidence: "Medium",
          source: "Email Gateway",
        },
        {
          id: "ioc-006",
          type: "IP Address",
          value: "45.67.89.123",
          firstSeen: "2025-04-21",
          lastSeen: "2025-04-27",
          confidence: "High",
          source: "Firewall Logs",
          campaign: "DDoS Campaign",
        },
        {
          id: "ioc-007",
          type: "Hash",
          value: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4",
          firstSeen: "2025-04-19",
          lastSeen: "2025-04-26",
          confidence: "Low",
          source: "Sandbox Analysis",
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredIOCs = iocs.filter(
    (ioc) =>
      ioc.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ioc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ioc.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ioc.campaign && ioc.campaign.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`Copied: ${text}`)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "High":
        return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
      case "Low":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const downloadCSV = () => {
    const headers = ["Type", "Value", "First Seen", "Last Seen", "Confidence", "Source", "Campaign"]
    const csvContent = [
      headers.join(","),
      ...filteredIOCs.map((ioc) =>
        [
          ioc.type,
          `"${ioc.value}"`,
          ioc.firstSeen,
          ioc.lastSeen,
          ioc.confidence,
          ioc.source,
          ioc.campaign || "N/A",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "iocs_export.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full shadow-lg border-border/50">
      <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <CardTitle>Indicators of Compromise (IOCs)</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadCSV}
            className="text-white border-white/20 hover:bg-white/10 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search IOCs by value, type, source, or campaign..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted">
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>First Seen</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIOCs.length > 0 ? (
                  filteredIOCs.map((ioc) => (
                    <TableRow key={ioc.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{ioc.type}</TableCell>
                      <TableCell className="font-mono text-sm">{ioc.value}</TableCell>
                      <TableCell>{ioc.firstSeen}</TableCell>
                      <TableCell>{ioc.lastSeen}</TableCell>
                      <TableCell>{getConfidenceBadge(ioc.confidence)}</TableCell>
                      <TableCell>{ioc.source}</TableCell>
                      <TableCell>{ioc.campaign || "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(ioc.value)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy value</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No IOCs found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
