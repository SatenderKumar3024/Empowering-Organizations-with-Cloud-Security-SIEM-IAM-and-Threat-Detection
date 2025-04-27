"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, CheckCircle, RefreshCw, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LogoPlaceholder } from "@/components/ui/logo-placeholder"

interface Ticket {
  id: string
  number: string
  shortDescription: string
  priority: "1-critical" | "2-high" | "3-moderate" | "4-low"
  state: "new" | "in progress" | "on hold" | "resolved" | "closed"
  assignedTo: string
  createdAt: string
  updatedAt: string
}

const mockTickets: Ticket[] = [
  {
    id: "ticket-001",
    number: "INC0010234",
    shortDescription: "Ransomware detected on finance department workstation",
    priority: "1-critical",
    state: "in progress",
    assignedTo: "Security Incident Response Team",
    createdAt: "2025-04-27T09:15:23.000Z",
    updatedAt: "2025-04-27T09:45:12.000Z",
  },
  {
    id: "ticket-002",
    number: "INC0010233",
    shortDescription: "Multiple failed login attempts on admin portal",
    priority: "2-high",
    state: "new",
    assignedTo: "Security Operations",
    createdAt: "2025-04-27T08:32:45.000Z",
    updatedAt: "2025-04-27T08:32:45.000Z",
  },
  {
    id: "ticket-003",
    number: "INC0010232",
    shortDescription: "Suspicious outbound traffic detected to known C2 server",
    priority: "2-high",
    state: "in progress",
    assignedTo: "Network Security Team",
    createdAt: "2025-04-27T07:55:18.000Z",
    updatedAt: "2025-04-27T08:15:33.000Z",
  },
  {
    id: "ticket-004",
    number: "INC0010231",
    shortDescription: "DLP alert: Sensitive data exfiltration attempt",
    priority: "1-critical",
    state: "in progress",
    assignedTo: "Data Security Team",
    createdAt: "2025-04-27T07:12:09.000Z",
    updatedAt: "2025-04-27T07:45:22.000Z",
  },
  {
    id: "ticket-005",
    number: "INC0010230",
    shortDescription: "Firewall rule misconfiguration on DMZ segment",
    priority: "3-moderate",
    state: "on hold",
    assignedTo: "Network Operations",
    createdAt: "2025-04-27T06:45:33.000Z",
    updatedAt: "2025-04-27T07:10:15.000Z",
  },
  {
    id: "ticket-006",
    number: "INC0010229",
    shortDescription: "Phishing campaign targeting executive team",
    priority: "2-high",
    state: "resolved",
    assignedTo: "Security Awareness Team",
    createdAt: "2025-04-26T15:22:47.000Z",
    updatedAt: "2025-04-27T05:18:29.000Z",
  },
  {
    id: "ticket-007",
    number: "INC0010228",
    shortDescription: "Unauthorized access to development server",
    priority: "3-moderate",
    state: "closed",
    assignedTo: "Application Security Team",
    createdAt: "2025-04-26T14:15:33.000Z",
    updatedAt: "2025-04-26T18:45:12.000Z",
  },
  {
    id: "ticket-008",
    number: "INC0010227",
    shortDescription: "SSL certificate expiration warning for customer portal",
    priority: "4-low",
    state: "resolved",
    assignedTo: "Infrastructure Team",
    createdAt: "2025-04-26T12:33:21.000Z",
    updatedAt: "2025-04-26T14:22:05.000Z",
  },
]

// Mock vulnerability data for the vulnerability tab
const mockVulnerabilities = [
  {
    id: "vuln-001",
    number: "VUL0002345",
    name: "Log4j Remote Code Execution",
    cvss: 9.8,
    severity: "critical",
    status: "open",
    affectedSystems: 12,
    discoveredDate: "2025-04-25T14:22:05.000Z",
  },
  {
    id: "vuln-002",
    number: "VUL0002344",
    name: "SQL Injection in Web Application",
    cvss: 8.5,
    severity: "high",
    status: "in progress",
    affectedSystems: 3,
    discoveredDate: "2025-04-24T10:15:30.000Z",
  },
  {
    id: "vuln-003",
    number: "VUL0002343",
    name: "Cross-Site Scripting (XSS)",
    cvss: 6.4,
    severity: "medium",
    status: "in progress",
    affectedSystems: 5,
    discoveredDate: "2025-04-23T16:45:12.000Z",
  },
  {
    id: "vuln-004",
    number: "VUL0002342",
    name: "Outdated SSL/TLS Configuration",
    cvss: 5.2,
    severity: "medium",
    status: "remediated",
    affectedSystems: 8,
    discoveredDate: "2025-04-22T09:30:45.000Z",
  },
  {
    id: "vuln-005",
    number: "VUL0002341",
    name: "Default Credentials on Network Device",
    cvss: 7.8,
    severity: "high",
    status: "remediated",
    affectedSystems: 1,
    discoveredDate: "2025-04-21T14:10:22.000Z",
  },
]

export function ServiceNowDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets)
  const [vulnerabilities, setVulnerabilities] = useState(mockVulnerabilities)
  const [activeTab, setActiveTab] = useState("incidents")
  const { toast } = useToast()

  const handleSearch = () => {
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setTickets(mockTickets)
        setVulnerabilities(mockVulnerabilities)
      } else {
        if (activeTab === "incidents") {
          const filtered = mockTickets.filter(
            (ticket) =>
              ticket.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ticket.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ticket.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          setTickets(filtered)
        } else if (activeTab === "vulnerabilities") {
          const filtered = mockVulnerabilities.filter(
            (vuln) =>
              vuln.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              vuln.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
              vuln.severity.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          setVulnerabilities(filtered)
        }
      }

      setIsSearching(false)

      toast({
        title: "Search completed",
        description: `Found ${activeTab === "incidents" ? tickets.length : vulnerabilities.length} items matching "${searchQuery}"`,
      })
    }, 1000)
  }

  const handleCreateTicket = () => {
    toast({
      title: "Create Ticket",
      description: "Opening new ticket creation form",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "1-critical":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">P1-Critical</Badge>
      case "2-high":
        return <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">P2-High</Badge>
      case "3-moderate":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">P3-Moderate</Badge>
      case "4-low":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">P4-Low</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>
    }
  }

  const getStateBadge = (state: string) => {
    switch (state) {
      case "new":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">New</Badge>
      case "in progress":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">In Progress</Badge>
      case "on hold":
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">On Hold</Badge>
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Resolved</Badge>
      case "closed":
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Closed</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>
    }
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
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <LogoPlaceholder
              text="ServiceNow"
              bgColor="#81B5A1"
              color="#FFFFFF"
              height="24px"
              width="100px"
              className="mr-2"
            />
            ServiceNow Security Operations
          </CardTitle>
          <Button onClick={handleCreateTicket} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="incidents" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="tasks">Security Tasks</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching} variant="outline" className="gap-2">
              {isSearching ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {isSearching ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="incidents" className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Number</TableHead>
                    <TableHead className="w-[40%]">Description</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/20 cursor-pointer">
                      <TableCell className="font-medium">{ticket.number}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{ticket.shortDescription}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getStateBadge(ticket.state)}</TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(ticket.updatedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-muted-foreground mt-4">{tickets.length} incidents found</div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Number</TableHead>
                    <TableHead className="w-[30%]">Vulnerability</TableHead>
                    <TableHead>CVSS</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Affected Systems</TableHead>
                    <TableHead>Discovered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vulnerabilities.map((vuln) => (
                    <TableRow key={vuln.id} className="hover:bg-muted/20 cursor-pointer">
                      <TableCell className="font-medium">{vuln.number}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{vuln.name}</TableCell>
                      <TableCell className="font-mono font-bold">
                        <span
                          className={
                            vuln.cvss >= 9.0
                              ? "text-red-500"
                              : vuln.cvss >= 7.0
                                ? "text-orange-500"
                                : vuln.cvss >= 4.0
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                          }
                        >
                          {vuln.cvss.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                      <TableCell>{getStateBadge(vuln.status)}</TableCell>
                      <TableCell>{vuln.affectedSystems}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(vuln.discoveredDate).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-muted-foreground mt-4">{vulnerabilities.length} vulnerabilities found</div>
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium">Security Tasks</h3>
                <p className="text-muted-foreground">No pending security tasks found</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
