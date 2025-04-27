"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ComposedChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  RefreshCw,
  Download,
  Filter,
  Search,
  Clock,
  AlertTriangle,
  Shield,
  Globe,
  FileText,
  Bell,
  Settings,
  Activity,
  Network,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { webSocketService, initializeWebSocketDemo } from "@/lib/websocket-service"
import { SplunkLogo } from "@/components/ui/splunk-logo"

// Threat statistics data
const threatStats = [
  {
    name: "Active Threats",
    value: 3500,
    change: "+12%",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "text-amber-500",
  },
  { name: "Critical IOCs", value: 1000, change: "+10%", icon: <Shield className="h-5 w-5" />, color: "text-red-500" },
  { name: "Countries", value: 52, change: "-3%", icon: <Globe className="h-5 w-5" />, color: "text-blue-500" },
  { name: "Refresh Rate", value: "5 min", icon: <Clock className="h-5 w-5" />, color: "text-green-500" },
]

// Threat trend data
const trendData = [
  { name: "00:00", malware: 5, phishing: 3, ransomware: 1, scanning: 2, botnet: 0 },
  { name: "02:00", malware: 3, phishing: 2, ransomware: 0, scanning: 1, botnet: 1 },
  { name: "04:00", malware: 2, phishing: 1, ransomware: 0, scanning: 0, botnet: 0 },
  { name: "06:00", malware: 4, phishing: 2, ransomware: 1, scanning: 3, botnet: 2 },
  { name: "08:00", malware: 8, phishing: 5, ransomware: 2, scanning: 6, botnet: 3 },
  { name: "10:00", malware: 12, phishing: 8, ransomware: 3, scanning: 7, botnet: 4 },
  { name: "12:00", malware: 10, phishing: 6, ransomware: 2, scanning: 5, botnet: 3 },
  { name: "14:00", malware: 15, phishing: 9, ransomware: 4, scanning: 8, botnet: 5 },
  { name: "16:00", malware: 20, phishing: 12, ransomware: 5, scanning: 10, botnet: 6 },
  { name: "18:00", malware: 15, phishing: 8, ransomware: 3, scanning: 7, botnet: 4 },
  { name: "20:00", malware: 10, phishing: 5, ransomware: 2, scanning: 4, botnet: 2 },
  { name: "22:00", malware: 7, phishing: 4, ransomware: 1, scanning: 3, botnet: 1 },
]

// IOC distribution data
const iocDistributionData = [
  { name: "IP", value: 35, color: "#3b82f6" },
  { name: "URL", value: 25, color: "#ef4444" },
  { name: "Hash", value: 20, color: "#10b981" },
  { name: "Domain", value: 15, color: "#f59e0b" },
  { name: "Email", value: 5, color: "#8b5cf6" },
]

// Recent IOCs data
const recentIOCsData = [
  {
    id: "ioc-001",
    indicator: "hxdbvxf0qpm2t9cnvd7b5arfdbpkcd.dll",
    type: "file",
    threatType: "Phishing",
    source: "OTX",
    country: "IT",
    confidence: 93,
  },
  {
    id: "ioc-002",
    indicator: "xrjrbcvo.io",
    type: "domain",
    threatType: "Botnet",
    source: "OTX",
    country: "FR",
    confidence: 25,
  },
  {
    id: "ioc-003",
    indicator: "8apji4eqx2bwZqkj07115siq9jh3msc.js",
    type: "file",
    threatType: "Ransomware",
    source: "AbuseIPDB",
    country: "JP",
    confidence: 48,
  },
  {
    id: "ioc-004",
    indicator: "41.135.78.11",
    type: "ip",
    threatType: "Malware (Dridex)",
    source: "OTX",
    country: "SE",
    confidence: 6,
  },
  {
    id: "ioc-005",
    indicator: "iwrvx27n.io",
    type: "domain",
    threatType: "Phishing",
    source: "AbuseIPDB",
    country: "IT",
    confidence: 1,
  },
]

// Published reports data
const publishedReportsData = [
  {
    id: "REP-2023-12",
    title: "Monthly Threat Intelligence Summary",
    date: "2023-12-01",
    type: "Monthly",
    author: "Security Team",
  },
  {
    id: "REP-2023-11",
    title: "Monthly Threat Intelligence Summary",
    date: "2023-11-01",
    type: "Monthly",
    author: "Security Team",
  },
  {
    id: "REP-2023-10",
    title: "Monthly Threat Intelligence Summary",
    date: "2023-10-01",
    type: "Monthly",
    author: "Security Team",
  },
  {
    id: "REP-2023-Q3",
    title: "Quarterly Threat Landscape Analysis",
    date: "2023-10-15",
    type: "Quarterly",
    author: "Threat Research Team",
  },
  {
    id: "REP-2023-SPECIAL",
    title: "Special Report: Emerging Ransomware Trends",
    date: "2023-09-22",
    type: "Special",
    author: "Ransomware Task Force",
  },
]

// Team members data
const teamMembersData = [
  {
    id: "TM001",
    name: "Alex Johnson",
    role: "Security Analyst",
    department: "SOC",
    status: "Active",
  },
  {
    id: "TM002",
    name: "Jamie Smith",
    role: "Threat Intelligence Specialist",
    department: "Threat Intel",
    status: "Active",
  },
  {
    id: "TM003",
    name: "Morgan Lee",
    role: "Security Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "TM004",
    name: "Taylor Wilson",
    role: "CISO",
    department: "Executive",
    status: "Active",
  },
  {
    id: "TM005",
    name: "Jordan Rivera",
    role: "Incident Responder",
    department: "SOC",
    status: "On Leave",
  },
  {
    id: "TM006",
    name: "Satender Kumar",
    role: "Security Team Leader",
    department: "Executive",
    status: "Active",
  },
]

// Alerts data
const alertsData = [
  {
    id: "ALERT-001",
    title: "Critical Vulnerability Detected",
    description: "CVE-2023-1234 affecting multiple systems",
    timestamp: "2023-12-15T09:32:00.000Z",
    source: "Vulnerability Scanner",
    severity: "critical",
    status: "open",
  },
  {
    id: "ALERT-002",
    title: "Suspicious Login Attempt",
    description: "Multiple failed login attempts from IP 203.0.113.42",
    timestamp: "2023-12-15T08:45:00.000Z",
    source: "SIEM",
    severity: "high",
    status: "investigating",
  },
  {
    id: "ALERT-003",
    title: "Malware Detected",
    description: "Trojan detected on workstation WS-042",
    timestamp: "2023-12-15T05:12:00.000Z",
    source: "Endpoint Protection",
    severity: "high",
    status: "mitigated",
  },
  {
    id: "ALERT-004",
    title: "Unusual Network Traffic",
    description: "Unusual outbound traffic to 198.51.100.23:4444",
    timestamp: "2023-12-15T04:27:00.000Z",
    source: "Network Monitor",
    severity: "medium",
    status: "open",
  },
  {
    id: "ALERT-005",
    title: "New IOC Added to Watchlist",
    description: "Domain malicious-domain.com added to watchlist",
    timestamp: "2023-12-14T11:05:00.000Z",
    source: "Threat Intelligence",
    severity: "low",
    status: "closed",
  },
]

// New data for enhanced visualizations
const attackVectorData = [
  { name: "Email Phishing", value: 35 },
  { name: "Web Application", value: 22 },
  { name: "Unpatched Systems", value: 18 },
  { name: "Credential Theft", value: 12 },
  { name: "Supply Chain", value: 8 },
  { name: "Social Engineering", value: 5 },
]

const threatActorData = [
  { name: "APT28", value: 15, category: "Nation State" },
  { name: "Lazarus Group", value: 12, category: "Nation State" },
  { name: "Conti", value: 10, category: "Ransomware" },
  { name: "LockBit", value: 8, category: "Ransomware" },
  { name: "Lapsus$", value: 7, category: "Hacktivism" },
  { name: "Anonymous", value: 5, category: "Hacktivism" },
  { name: "FIN7", value: 4, category: "Financial" },
]

const securityPostureData = [
  { name: "Endpoint Protection", score: 85, benchmark: 75 },
  { name: "Network Security", score: 72, benchmark: 80 },
  { name: "Cloud Security", score: 68, benchmark: 75 },
  { name: "Identity Management", score: 90, benchmark: 85 },
  { name: "Data Protection", score: 65, benchmark: 80 },
  { name: "Application Security", score: 78, benchmark: 75 },
  { name: "Security Awareness", score: 60, benchmark: 70 },
]

const incidentResponseData = [
  { name: "Detection", value: 15, avg: 25 },
  { name: "Triage", value: 10, avg: 15 },
  { name: "Investigation", value: 45, avg: 60 },
  { name: "Containment", value: 30, avg: 45 },
  { name: "Eradication", value: 60, avg: 90 },
  { name: "Recovery", value: 120, avg: 180 },
]

const vulnerabilityTrendData = [
  { name: "Jan", critical: 5, high: 12, medium: 25, low: 18 },
  { name: "Feb", critical: 7, high: 15, medium: 22, low: 20 },
  { name: "Mar", critical: 4, high: 13, medium: 28, low: 15 },
  { name: "Apr", critical: 6, high: 10, medium: 24, low: 22 },
  { name: "May", critical: 8, high: 18, medium: 30, low: 25 },
  { name: "Jun", critical: 10, high: 20, medium: 27, low: 18 },
  { name: "Jul", critical: 12, high: 22, medium: 32, low: 20 },
  { name: "Aug", critical: 9, high: 17, medium: 29, low: 23 },
  { name: "Sep", critical: 7, high: 14, medium: 26, low: 19 },
  { name: "Oct", critical: 8, high: 16, medium: 28, low: 21 },
  { name: "Nov", critical: 10, high: 19, medium: 31, low: 24 },
  { name: "Dec", critical: 12, high: 21, medium: 33, low: 26 },
]

const networkTrafficData = [
  { time: "00:00", inbound: 120, outbound: 80, blocked: 15 },
  { time: "01:00", inbound: 90, outbound: 60, blocked: 10 },
  { time: "02:00", inbound: 75, outbound: 45, blocked: 8 },
  { time: "03:00", inbound: 60, outbound: 30, blocked: 5 },
  { time: "04:00", inbound: 45, outbound: 25, blocked: 3 },
  { time: "05:00", inbound: 60, outbound: 35, blocked: 7 },
  { time: "06:00", inbound: 90, outbound: 50, blocked: 12 },
  { time: "07:00", inbound: 150, outbound: 85, blocked: 18 },
  { time: "08:00", inbound: 230, outbound: 140, blocked: 25 },
  { time: "09:00", inbound: 280, outbound: 180, blocked: 30 },
  { time: "10:00", inbound: 310, outbound: 210, blocked: 35 },
  { time: "11:00", inbound: 290, outbound: 190, blocked: 32 },
  { time: "12:00", inbound: 270, outbound: 175, blocked: 28 },
  { time: "13:00", inbound: 285, outbound: 185, blocked: 30 },
  { time: "14:00", inbound: 310, outbound: 200, blocked: 34 },
  { time: "15:00", inbound: 335, outbound: 220, blocked: 38 },
  { time: "16:00", inbound: 320, outbound: 210, blocked: 36 },
  { time: "17:00", inbound: 290, outbound: 180, blocked: 32 },
  { time: "18:00", inbound: 250, outbound: 150, blocked: 28 },
  { time: "19:00", inbound: 210, outbound: 130, blocked: 24 },
  { time: "20:00", inbound: 180, outbound: 110, blocked: 20 },
  { time: "21:00", inbound: 160, outbound: 95, blocked: 18 },
  { time: "22:00", inbound: 140, outbound: 85, blocked: 15 },
  { time: "23:00", inbound: 130, outbound: 75, blocked: 12 },
]

const userActivityData = [
  { time: "00:00", logins: 5, failedLogins: 2, privilegedAccess: 1 },
  { time: "01:00", logins: 3, failedLogins: 1, privilegedAccess: 0 },
  { time: "02:00", logins: 2, failedLogins: 0, privilegedAccess: 0 },
  { time: "03:00", logins: 1, failedLogins: 0, privilegedAccess: 0 },
  { time: "04:00", logins: 1, failedLogins: 1, privilegedAccess: 0 },
  { time: "05:00", logins: 3, failedLogins: 0, privilegedAccess: 1 },
  { time: "06:00", logins: 8, failedLogins: 2, privilegedAccess: 2 },
  { time: "07:00", logins: 25, failedLogins: 5, privilegedAccess: 4 },
  { time: "08:00", logins: 65, failedLogins: 8, privilegedAccess: 10 },
  { time: "09:00", logins: 85, failedLogins: 10, privilegedAccess: 15 },
  { time: "10:00", logins: 75, failedLogins: 7, privilegedAccess: 12 },
  { time: "11:00", logins: 70, failedLogins: 6, privilegedAccess: 10 },
  { time: "12:00", logins: 60, failedLogins: 5, privilegedAccess: 8 },
  { time: "13:00", logins: 72, failedLogins: 8, privilegedAccess: 11 },
  { time: "14:00", logins: 80, failedLogins: 9, privilegedAccess: 14 },
  { time: "15:00", logins: 75, failedLogins: 7, privilegedAccess: 12 },
  { time: "16:00", logins: 65, failedLogins: 6, privilegedAccess: 10 },
  { time: "17:00", logins: 45, failedLogins: 4, privilegedAccess: 7 },
  { time: "18:00", logins: 25, failedLogins: 3, privilegedAccess: 4 },
  { time: "19:00", logins: 15, failedLogins: 2, privilegedAccess: 2 },
  { time: "20:00", logins: 10, failedLogins: 1, privilegedAccess: 1 },
  { time: "21:00", logins: 8, failedLogins: 1, privilegedAccess: 1 },
  { time: "22:00", logins: 5, failedLogins: 0, privilegedAccess: 0 },
  { time: "23:00", logins: 3, failedLogins: 1, privilegedAccess: 0 },
]

const securityMaturityData = [
  { subject: "Identify", A: 80, B: 90, fullMark: 100 },
  { subject: "Protect", A: 75, B: 85, fullMark: 100 },
  { subject: "Detect", A: 65, B: 80, fullMark: 100 },
  { subject: "Respond", A: 70, B: 85, fullMark: 100 },
  { subject: "Recover", A: 60, B: 75, fullMark: 100 },
]

const threatIntelSourceData = [
  { name: "Internal", value: 30 },
  { name: "Commercial", value: 25 },
  { name: "OSINT", value: 20 },
  { name: "Partner", value: 15 },
  { name: "Government", value: 10 },
]

const alertsBySystemData = [
  {
    name: "Firewall",
    critical: 5,
    high: 12,
    medium: 25,
    low: 40,
  },
  {
    name: "IDS/IPS",
    critical: 8,
    high: 15,
    medium: 30,
    low: 35,
  },
  {
    name: "EDR",
    critical: 10,
    high: 20,
    medium: 15,
    low: 20,
  },
  {
    name: "SIEM",
    critical: 12,
    high: 18,
    medium: 22,
    low: 30,
  },
  {
    name: "WAF",
    critical: 3,
    high: 10,
    medium: 18,
    low: 25,
  },
]

export function EnhancedSplunkDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [alertFilter, setAlertFilter] = useState("all")
  const [reportFilter, setReportFilter] = useState("published")
  const [timeRange, setTimeRange] = useState("24h")
  const [advancedView, setAdvancedView] = useState(false)
  const [realTimeData, setRealTimeData] = useState<any[]>([])
  const [threatCount, setThreatCount] = useState(0)
  const { toast } = useToast()

  // Initialize WebSocket for real-time data
  useEffect(() => {
    initializeWebSocketDemo()

    // Listen for threat updates
    webSocketService.on("threat-update", (data) => {
      setRealTimeData((prev) => [...data.threatData, ...prev].slice(0, 10))
      setThreatCount((prev) => prev + data.newThreats)
    })

    return () => {
      webSocketService.off("threat-update", () => {})
    }
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())
      toast({
        title: "Dashboard refreshed",
        description: `Data updated as of ${new Date().toLocaleTimeString()}`,
      })
    }, 1500)
  }

  useEffect(() => {
    // Initial load simulation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(
      () => {
        handleRefresh()
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  const filteredAlerts = alertsData.filter((alert) => {
    if (alertFilter === "all") return true
    return alert.status === alertFilter
  })

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Open</Badge>
      case "investigating":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Investigating</Badge>
      case "mitigated":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Mitigated</Badge>
      case "closed":
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Closed</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>
    }
  }

  const getStatusBadgeTeam = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>
      case "On Leave":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">On Leave</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Inactive</Badge>
    }
  }

  // Calculate metrics for the dashboard
  const metrics = useMemo(() => {
    return {
      totalAlerts: alertsData.length,
      openAlerts: alertsData.filter((a) => a.status === "open").length,
      criticalAlerts: alertsData.filter((a) => a.severity === "critical").length,
      mitigatedAlerts: alertsData.filter((a) => a.status === "mitigated").length,
    }
  }, [])

  return (
    <Card className="w-full shadow-lg border-border/50">
      <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SplunkLogo size="md" className="shadow-lg" />
            <div className="flex flex-col">
              <CardTitle>Splunk Security Dashboard</CardTitle>
              <div className="text-xs text-white/70">Enterprise Security Analytics</div>
            </div>
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              Connected
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] h-9 text-white border-white/20 bg-white/5">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="12h">Last 12 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              {isLoading ? <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-white/70">Last updated: {lastUpdated.toLocaleTimeString()}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAdvancedView(!advancedView)}
              className="text-white hover:bg-white/10"
            >
              {advancedView ? "Standard View" : "Advanced View"}
              {advancedView ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
            <TabsTrigger
              value="dashboard"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              <Shield className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              <Activity className="h-4 w-4 mr-2" />
              Advanced Analytics
            </TabsTrigger>
            <TabsTrigger
              value="network"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              <Network className="h-4 w-4 mr-2" />
              Network Security
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex justify-center items-center h-[500px]">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <div className="text-sm text-muted-foreground">Loading Splunk data...</div>
              </div>
            </div>
          ) : (
            <>
              {/* Main Dashboard Tab */}
              <TabsContent value="dashboard" className="m-0 p-4">
                {/* Real-time threat counter */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-lg mb-6 border border-slate-700">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Real-time Threat Intelligence</h3>
                      <p className="text-sm text-slate-400">Live security events from connected systems</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-amber-500">{threatCount}</div>
                        <div className="text-xs text-slate-400">New Threats</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-red-500">{metrics.criticalAlerts}</div>
                        <div className="text-xs text-slate-400">Critical</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-blue-500">{metrics.openAlerts}</div>
                        <div className="text-xs text-slate-400">Open</div>
                      </div>
                      <div className="h-10 w-10 relative">
                        <div className="absolute inset-0 bg-green-500 rounded-full opacity-25 animate-ping"></div>
                        <div className="relative flex items-center justify-center h-full w-full bg-green-500 rounded-full">
                          <span className="text-white text-xs">Live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {threatStats.map((stat, idx) => (
                    <Card key={idx} className="bg-card/30 backdrop-blur-sm border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
                            <div className="flex items-center gap-2">
                              <p className={`text-2xl font-bold ${stat.color}`}>
                                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                              </p>
                              {stat.change && (
                                <span
                                  className={`text-xs ${
                                    stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                                  }`}
                                >
                                  {stat.change}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`p-2 rounded-full bg-primary/10 ${stat.color}`}>{stat.icon}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Threat Trend Chart */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Threat Trend</CardTitle>
                        <div className="flex gap-1">
                          <Badge variant="outline" className="bg-background/50">
                            Last 24 Hours
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          malware: {
                            label: "Malware",
                            color: "hsl(280, 100%, 70%)",
                          },
                          phishing: {
                            label: "Phishing",
                            color: "hsl(10, 100%, 70%)",
                          },
                          ransomware: {
                            label: "Ransomware",
                            color: "hsl(40, 100%, 70%)",
                          },
                          scanning: {
                            label: "Scanning",
                            color: "hsl(120, 100%, 70%)",
                          },
                          botnet: {
                            label: "Botnet",
                            color: "hsl(200, 100%, 70%)",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a3a55" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="malware"
                              stroke="var(--color-malware)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="phishing"
                              stroke="var(--color-phishing)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="ransomware"
                              stroke="var(--color-ransomware)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="scanning"
                              stroke="var(--color-scanning)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="botnet"
                              stroke="var(--color-botnet)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* IOC Distribution */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">IOC Distribution</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          By Type
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={iocDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {iocDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value, name) => [`${value} indicators`, name]}
                              contentStyle={{ backgroundColor: "#1a2035", borderColor: "#2a3a55" }}
                            />
                            <Legend formatter={(value, entry) => <span style={{ color: "#94a3b8" }}>{value}</span>} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent IOCs */}
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Recent IOCs</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-1" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Indicator</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Threat Type</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(realTimeData.length > 0 ? realTimeData : recentIOCsData).map((ioc) => (
                            <TableRow key={ioc.id} className="hover:bg-muted/20">
                              <TableCell className="font-mono text-xs">{ioc.indicator}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                                  {ioc.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{ioc.threatType}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    ioc.source === "OTX"
                                      ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                      : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  }
                                >
                                  {ioc.source}
                                </Badge>
                              </TableCell>
                              <TableCell>{ioc.country}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        ioc.confidence > 80
                                          ? "bg-red-500"
                                          : ioc.confidence > 40
                                            ? "bg-amber-500"
                                            : ioc.confidence > 20
                                              ? "bg-blue-500"
                                              : "bg-gray-500"
                                      }`}
                                      style={{ width: `${ioc.confidence}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs">{ioc.confidence}%</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Search className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                      <div>
                        Showing {realTimeData.length > 0 ? realTimeData.length : recentIOCsData.length} of 1,000+ IOCs
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Previous
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Analytics Tab */}
              <TabsContent value="advanced" className="m-0 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Attack Vector Analysis */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Attack Vector Analysis</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          {timeRange}
                        </Badge>
                      </div>
                      <CardDescription>Distribution of attack vectors in security incidents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={attackVectorData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {attackVectorData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"][index % 6]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Threat Actor Analysis */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Threat Actor Analysis</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          Top Actors
                        </Badge>
                      </div>
                      <CardDescription>Attribution and activity of known threat actors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <Treemap
                            data={threatActorData}
                            dataKey="value"
                            aspectRatio={4 / 3}
                            stroke="#374151"
                            fill="#3b82f6"
                          >
                            <Tooltip
                              content={({ payload }) => {
                                if (payload && payload.length > 0) {
                                  const data = payload[0].payload
                                  return (
                                    <div className="bg-slate-800 p-2 border border-slate-700 rounded shadow-md">
                                      <p className="font-medium">{data.name}</p>
                                      <p className="text-sm text-slate-300">Category: {data.category}</p>
                                      <p className="text-sm text-slate-300">Activity: {data.value}</p>
                                    </div>
                                  )
                                }
                                return null
                              }}
                            />
                          </Treemap>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Security Posture */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Security Posture Assessment</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          vs. Industry Benchmark
                        </Badge>
                      </div>
                      <CardDescription>Comparison of security controls against industry benchmarks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={securityPostureData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="name" type="category" width={150} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" name="Your Score" fill="#3b82f6" />
                            <Bar dataKey="benchmark" name="Industry Benchmark" fill="#94a3b8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Incident Response Metrics */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Incident Response Metrics</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          Time in Minutes
                        </Badge>
                      </div>
                      <CardDescription>Response time metrics compared to industry average</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={incidentResponseData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                          >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Your Time" barSize={20} fill="#3b82f6" />
                            <Line type="monotone" dataKey="avg" name="Industry Avg" stroke="#ff7300" />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Vulnerability Trends */}
                <Card className="border-border/50 mb-6">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Vulnerability Trends</CardTitle>
                      <Badge variant="outline" className="bg-background/50">
                        12 Month Trend
                      </Badge>
                    </div>
                    <CardDescription>Monthly vulnerability discovery by severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={vulnerabilityTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="critical"
                            name="Critical"
                            stroke="#ef4444"
                            fillOpacity={1}
                            fill="url(#colorCritical)"
                          />
                          <Area
                            type="monotone"
                            dataKey="high"
                            name="High"
                            stroke="#f97316"
                            fillOpacity={1}
                            fill="url(#colorHigh)"
                          />
                          <Area
                            type="monotone"
                            dataKey="medium"
                            name="Medium"
                            stroke="#eab308"
                            fillOpacity={1}
                            fill="url(#colorMedium)"
                          />
                          <Area
                            type="monotone"
                            dataKey="low"
                            name="Low"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorLow)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Maturity Model */}
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Security Maturity Model</CardTitle>
                      <Badge variant="outline" className="bg-background/50">
                        NIST CSF
                      </Badge>
                    </div>
                    <CardDescription>
                      Security maturity assessment based on NIST Cybersecurity Framework
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securityMaturityData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Your Organization"
                            dataKey="A"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                          />
                          <Radar
                            name="Industry Average"
                            dataKey="B"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.6}
                          />
                          <Legend />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Network Security Tab */}
              <TabsContent value="network" className="m-0 p-4">
                <div className="grid grid-cols-1 gap-6 mb-6">
                  {/* Network Traffic Analysis */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Network Traffic Analysis</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          Last 24 Hours
                        </Badge>
                      </div>
                      <CardDescription>Inbound, outbound, and blocked traffic patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={networkTrafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="inbound"
                              name="Inbound Traffic"
                              stroke="#3b82f6"
                              fillOpacity={1}
                              fill="url(#colorInbound)"
                            />
                            <Area
                              type="monotone"
                              dataKey="outbound"
                              name="Outbound Traffic"
                              stroke="#10b981"
                              fillOpacity={1}
                              fill="url(#colorOutbound)"
                            />
                            <Area
                              type="monotone"
                              dataKey="blocked"
                              name="Blocked Traffic"
                              stroke="#ef4444"
                              fillOpacity={1}
                              fill="url(#colorBlocked)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* User Activity */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">User Activity</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          Last 24 Hours
                        </Badge>
                      </div>
                      <CardDescription>Login activity and privileged access events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="logins" name="Successful Logins" fill="#3b82f6" />
                            <Bar dataKey="failedLogins" name="Failed Logins" fill="#ef4444" />
                            <Line
                              type="monotone"
                              dataKey="privilegedAccess"
                              name="Privileged Access"
                              stroke="#f59e0b"
                              strokeWidth={2}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Threat Intelligence Sources */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Threat Intelligence Sources</CardTitle>
                        <Badge variant="outline" className="bg-background/50">
                          Distribution
                        </Badge>
                      </div>
                      <CardDescription>Distribution of threat intelligence by source</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={threatIntelSourceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label
                            >
                              {threatIntelSourceData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"][index % 5]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alerts by System */}
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Alerts by System</CardTitle>
                      <Badge variant="outline" className="bg-background/50">
                        By Severity
                      </Badge>
                    </div>
                    <CardDescription>Distribution of alerts across security systems by severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={alertsBySystemData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="critical" name="Critical" stackId="a" fill="#ef4444" />
                          <Bar dataKey="high" name="High" stackId="a" fill="#f97316" />
                          <Bar dataKey="medium" name="Medium" stackId="a" fill="#eab308" />
                          <Bar dataKey="low" name="Low" stackId="a" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="m-0 p-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Reports</h2>
                    <p className="text-muted-foreground">
                      Access and manage threat intelligence reports and scheduled report generation.
                    </p>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>

                <Tabs defaultValue="published" onValueChange={setReportFilter}>
                  <TabsList>
                    <TabsTrigger value="published">Published Reports</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
                    <TabsTrigger value="templates">Report Templates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="published" className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Published Reports</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Access and download previously published threat intelligence reports
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {publishedReportsData.map((report) => (
                                <TableRow key={report.id} className="hover:bg-muted/20">
                                  <TableCell className="font-mono">{report.id}</TableCell>
                                  <TableCell>{report.title}</TableCell>
                                  <TableCell>{report.date}</TableCell>
                                  <TableCell>{report.type}</TableCell>
                                  <TableCell>{report.author}</TableCell>
                                  <TableCell>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="scheduled" className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Scheduled Reports</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          View and manage automatically generated scheduled reports
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center items-center py-8">
                          <div className="text-center">
                            <FileText className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No scheduled reports configured</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Set up automated report generation based on your security data
                            </p>
                            <Button>Schedule New Report</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="templates" className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Report Templates</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Manage and customize report templates for consistent reporting
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center p-4">
                                <FileText className="h-10 w-10 text-blue-400 mb-2" />
                                <h3 className="font-medium mb-1">Monthly Summary</h3>
                                <p className="text-xs text-muted-foreground mb-4">
                                  Comprehensive monthly security overview
                                </p>
                                <Button variant="outline" size="sm">
                                  Use Template
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center p-4">
                                <FileText className="h-10 w-10 text-purple-400 mb-2" />
                                <h3 className="font-medium mb-1">Incident Report</h3>
                                <p className="text-xs text-muted-foreground mb-4">
                                  Detailed analysis of security incidents
                                </p>
                                <Button variant="outline" size="sm">
                                  Use Template
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center p-4">
                                <FileText className="h-10 w-10 text-amber-400 mb-2" />
                                <h3 className="font-medium mb-1">Executive Brief</h3>
                                <p className="text-xs text-muted-foreground mb-4">
                                  High-level security posture for executives
                                </p>
                                <Button variant="outline" size="sm">
                                  Use Template
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="m-0 p-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Alerts</h2>
                    <p className="text-muted-foreground">
                      Monitor and manage security alerts from various detection systems.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="all" onValueChange={setAlertFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All Alerts</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="investigating">Investigating</TabsTrigger>
                    <TabsTrigger value="mitigated">Mitigated</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>

                  <TabsContent value={alertFilter} className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Recent Alerts</CardTitle>
                        <p className="text-sm text-muted-foreground">Security alerts from all monitoring systems</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {filteredAlerts.map((alert) => (
                            <div
                              key={alert.id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/50 bg-card/30"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {getSeverityBadge(alert.severity)}
                                  {getStatusBadge(alert.status)}
                                </div>
                                <h3 className="text-lg font-medium">
                                  {alert.id}: {alert.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                                  <span>{alert.source}</span>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 border-t border-border/50 pt-6">
                          <h3 className="text-lg font-medium mb-4">Alert Settings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Notification Channels</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-sm flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect width="20" height="16" x="2" y="4" rx="2" />
                                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    Email Notifications
                                  </label>
                                  <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary">
                                    <span
                                      data-state="checked"
                                      className="pointer-events-none block h-3 w-3 translate-x-4 rounded-full bg-background shadow-lg ring-0 transition-transform"
                                    ></span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <label className="text-sm flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    SMS Notifications
                                  </label>
                                  <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary">
                                    <span
                                      data-state="checked"
                                      className="pointer-events-none block h-3 w-3 translate-x-4 rounded-full bg-background shadow-lg ring-0 transition-transform"
                                    ></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Alert Thresholds</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Critical Alerts
                                  </label>
                                  <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary">
                                    <span
                                      data-state="checked"
                                      className="pointer-events-none block h-3 w-3 translate-x-4 rounded-full bg-background shadow-lg ring-0 transition-transform"
                                    ></span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <label className="text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    High Alerts
                                  </label>
                                  <div className="relative inline-flex h-4 w-8 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary">
                                    <span
                                      data-state="checked"
                                      className="pointer-events-none block h-3 w-3 translate-x-4 rounded-full bg-background shadow-lg ring-0 transition-transform"
                                    ></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
