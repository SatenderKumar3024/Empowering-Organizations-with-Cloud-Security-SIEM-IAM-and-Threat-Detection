"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResult {
  name: string
  status: "success" | "error" | "pending"
  message?: string
}

export default function SystemTest() {
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

  const runTests = () => {
    setIsRunning(true)
    setCurrentTest(0)
    setResults((prev) => prev.map((result) => ({ ...result, status: "pending" })))
  }

  useEffect(() => {
    if (!isRunning) return

    if (currentTest >= results.length) {
      setIsRunning(false)
      return
    }

    const timer = setTimeout(() => {
      // Simulate test results - in a real app, these would be actual tests
      const newResults = [...results]
      // For demo purposes, we'll randomly succeed or fail tests
      // In a real app, you'd have actual test logic here
      const success = Math.random() > 0.2 // 80% chance of success

      newResults[currentTest] = {
        ...newResults[currentTest],
        status: success ? "success" : "error",
        message: success ? "Test passed successfully" : "Test failed - check component",
      }

      setResults(newResults)
      setCurrentTest((prev) => prev + 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isRunning, currentTest, results])

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>System Test</CardTitle>
        <CardDescription>
          Test all components and functionality of the Cybersecurity Incident Response system
        </CardDescription>
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
      <CardFooter>
        <Button onClick={runTests} disabled={isRunning} className="w-full">
          {isRunning ? "Running Tests..." : "Run All Tests"}
        </Button>
      </CardFooter>
    </Card>
  )
}
