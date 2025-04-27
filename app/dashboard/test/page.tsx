"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { VulnerabilityScanner } from "@/components/vulnerability-scanner"
import { IOCTable } from "@/components/ioc-table"
import { SplunkDashboard } from "@/components/integration/splunk-dashboard"
import { ServiceNowDashboard } from "@/components/integration/servicenow-dashboard"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TestResult {
  name: string
  status: "success" | "error" | "pending"
  message?: string
}

export default function TestPage() {
  const [timeFilter, setTimeFilter] = useState("24h")
  const [results, setResults] = useState<TestResult[]>([
    { name: "Dashboard Navigation", status: "pending" },
    { name: "Vulnerability Scanner", status: "pending" },
    { name: "Time Filter", status: "pending" },
    { name: "Search Functionality", status: "pending" },
    { name: "NIST CSF Integration", status: "pending" },
    { name: "Playbooks Display", status: "pending" },
    { name: "Splunk Integration", status: "pending" },
    { name: "ServiceNow Integration", status: "pending" },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState(0)
  const { toast } = useToast()

  const runTests = () => {
    setIsRunning(true)
    setCurrentTest(0)
    setResults((prev) => prev.map((result) => ({ ...result, status: "pending" })))

    toast({
      title: "Test Suite Started",
      description: "Running comprehensive tests on all components",
    })
  }

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value)
    toast({
      title: "Time Filter Updated",
      description: `Time filter changed to ${value}`,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-500" />
      case "error":
        return <XCircle className="text-red-500" />
      default:
        return <AlertCircle className="text-yellow-500" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">System Test Dashboard</h1>
        <p className="text-muted-foreground">
          Use this page to test and verify all components and functionality of the Cybersecurity Incident Response
          system.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={runTests} disabled={isRunning}>
          {isRunning ? "Running Tests..." : "Run All Tests"}
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Time Filter:</span>
          <Tabs value={timeFilter} onValueChange={handleTimeFilterChange}>
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="12h">12h</TabsTrigger>
              <TabsTrigger value="6h">6h</TabsTrigger>
              <TabsTrigger value="1h">1h</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs defaultValue="vulnerability-scanner">
        <TabsList className="mb-4">
          <TabsTrigger value="vulnerability-scanner">Vulnerability Scanner</TabsTrigger>
          <TabsTrigger value="ioc-table">IOC Table</TabsTrigger>
          <TabsTrigger value="splunk">Splunk Dashboard</TabsTrigger>
          <TabsTrigger value="servicenow">ServiceNow</TabsTrigger>
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerability-scanner">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Scanner Test</CardTitle>
              <CardDescription>
                Test the vulnerability scanner component with different time filters and scan functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilityScanner timeFilter={timeFilter} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ioc-table">
          <Card>
            <CardHeader>
              <CardTitle>IOC Table Test</CardTitle>
              <CardDescription>
                Test the IOC table component with different time filters and search functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IOCTable timeFilter={timeFilter} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splunk">
          <Card>
            <CardHeader>
              <CardTitle>Splunk Dashboard Test</CardTitle>
              <CardDescription>Test the Splunk integration component with search functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <SplunkDashboard timeFilter={timeFilter} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="servicenow">
          <Card>
            <CardHeader>
              <CardTitle>ServiceNow Dashboard Test</CardTitle>
              <CardDescription>Test the ServiceNow integration component with search functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceNowDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test-results">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Results of automated tests on all components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span>{result.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {result.message || (result.status === "pending" ? "Waiting..." : "")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center">
        <div>
          <Badge variant="outline" className="mr-2">
            Current Time Filter: {timeFilter}
          </Badge>
          <Badge variant="outline">Test Status: {isRunning ? "Running" : "Ready"}</Badge>
        </div>
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
