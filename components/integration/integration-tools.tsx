"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Shield, BarChart, Ticket, AlertTriangle, Search, Server, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface IntegrationTool {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: "SIEM" | "Ticketing" | "Vulnerability" | "Threat Intel" | "Other"
  status: "connected" | "available" | "coming-soon"
}

const integrationTools: IntegrationTool[] = [
  {
    id: "splunk",
    name: "Splunk",
    description: "SIEM platform for real-time security monitoring and threat hunting",
    icon: <Search className="h-6 w-6 text-orange-500" />,
    category: "SIEM",
    status: "connected",
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    description: "IT service management platform for security incident tracking",
    icon: <Ticket className="h-6 w-6 text-green-500" />,
    category: "Ticketing",
    status: "connected",
  },
  {
    id: "tenable",
    name: "Tenable",
    description: "Vulnerability management platform for continuous assessment",
    icon: <AlertTriangle className="h-6 w-6 text-blue-500" />,
    category: "Vulnerability",
    status: "available",
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    description: "Endpoint detection and response platform",
    icon: <Shield className="h-6 w-6 text-red-500" />,
    category: "Threat Intel",
    status: "available",
  },
  {
    id: "elastic",
    name: "Elastic Security",
    description: "Unified security platform for SIEM and endpoint security",
    icon: <Server className="h-6 w-6 text-purple-500" />,
    category: "SIEM",
    status: "available",
  },
  {
    id: "qradar",
    name: "IBM QRadar",
    description: "Security intelligence platform for threat detection",
    icon: <BarChart className="h-6 w-6 text-blue-500" />,
    category: "SIEM",
    status: "coming-soon",
  },
  {
    id: "jira",
    name: "Jira Service Management",
    description: "Issue tracking and service management platform",
    icon: <Ticket className="h-6 w-6 text-blue-500" />,
    category: "Ticketing",
    status: "coming-soon",
  },
  {
    id: "qualys",
    name: "Qualys",
    description: "Cloud-based vulnerability management platform",
    icon: <Database className="h-6 w-6 text-cyan-500" />,
    category: "Vulnerability",
    status: "coming-soon",
  },
]

export function IntegrationTools() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { toast } = useToast()

  const handleIntegrationClick = (tool: IntegrationTool) => {
    if (tool.status === "connected") {
      // Navigate to the tool's dashboard
      const section = document.getElementById(tool.id)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }

      // Find and click the tab
      const tabElement = document.querySelector(`[data-value="${tool.id}"]`) as HTMLElement
      if (tabElement) {
        tabElement.click()
      } else {
        toast({
          title: `${tool.name} Dashboard`,
          description: `Opening ${tool.name} dashboard view`,
        })
      }
    } else if (tool.status === "available") {
      toast({
        title: `Connect to ${tool.name}`,
        description: `Opening integration wizard for ${tool.name}`,
      })
    } else {
      toast({
        title: `${tool.name} Coming Soon`,
        description: "This integration will be available in a future update",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Connected</Badge>
      case "available":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Available</Badge>
      case "coming-soon":
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Coming Soon</Badge>
      default:
        return null
    }
  }

  return (
    <section
      id="integration-tools"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-background/90 to-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
            }}
          >
            Security Integration Tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect your security tools and platforms for a unified incident response workflow. Integrate with SIEM,
            ticketing systems, and vulnerability scanners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrationTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer ${
                  tool.status === "coming-soon" ? "opacity-70" : ""
                }`}
                onClick={() => handleIntegrationClick(tool)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-muted/50">{tool.icon}</div>
                    {getStatusBadge(tool.status)}
                  </div>
                  <CardTitle className="text-lg mt-2">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant={tool.status === "connected" ? "default" : "outline"}
                    className="w-full gap-2"
                    disabled={tool.status === "coming-soon"}
                  >
                    {tool.status === "connected" ? "View Dashboard" : "Connect"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
