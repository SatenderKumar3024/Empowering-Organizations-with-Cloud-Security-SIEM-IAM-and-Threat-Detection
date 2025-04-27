"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaybookCard } from "@/components/playbook-card"
import { NistCSFDetail } from "@/components/nist-csf-detail"
import { Shield, Users, Cloud } from "lucide-react"

export function PlaybooksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("playbooks")

  const ddosPlaybook = {
    id: "ddos-attack",
    title: "DDoS Attack Response",
    icon: <Shield className="h-5 w-5 text-cyan-500" />,
    description:
      "A comprehensive playbook for responding to Distributed Denial of Service attacks targeting your infrastructure.",
    steps: [
      {
        title: "Detection & Analysis",
        content: [
          "Identify abnormal traffic patterns, bandwidth consumption, and service degradation.",
          "Analyze traffic logs and network flow data to determine attack type (volumetric, protocol, or application layer).",
          "Correlate alerts from multiple monitoring systems to confirm the attack.",
        ],
        nistMapping: ["DE.AE-2", "DE.AE-3", "DE.CM-1"],
      },
      {
        title: "Containment",
        content: [
          "Implement traffic filtering, rate limiting, and utilize CDN or DDoS protection services.",
          "Consider traffic diversion through scrubbing centers for large-scale attacks.",
          "Activate emergency response procedures and notify relevant stakeholders.",
        ],
        nistMapping: ["RS.MI-1", "RS.MI-2", "PR.PT-4"],
      },
      {
        title: "Eradication",
        content: [
          "Block malicious IP addresses and networks.",
          "Adjust firewall rules and implement more stringent traffic validation.",
          "Patch vulnerable systems that could be leveraged in reflection attacks.",
        ],
        nistMapping: ["RS.MI-3", "PR.IP-1", "PR.AC-5"],
      },
      {
        title: "Recovery",
        content: [
          "Gradually restore services while monitoring traffic.",
          "Implement additional capacity and redundancy.",
          "Verify system integrity and normal operation of all services.",
        ],
        nistMapping: ["RC.RP-1", "RC.MI-1", "RC.MI-2"],
      },
      {
        title: "Post-Incident",
        content: [
          "Document attack vectors, effectiveness of response, and lessons learned.",
          "Update protection mechanisms and response procedures.",
          "Consider architectural changes to improve resilience.",
        ],
        nistMapping: ["RS.IM-1", "RS.IM-2", "ID.RA-5"],
      },
    ],
  }

  const insiderThreatPlaybook = {
    id: "insider-threat",
    title: "Insider Threat Response",
    icon: <Users className="h-5 w-5 text-purple-500" />,
    description:
      "A structured approach to detecting, investigating, and mitigating threats from within your organization.",
    steps: [
      {
        title: "Initial Detection",
        content: [
          "Monitor for unusual access patterns, data exfiltration attempts, and privilege escalation.",
          "Correlate user behavior analytics with security events and HR information.",
          "Establish baseline of normal user behavior to identify anomalies.",
        ],
        nistMapping: ["DE.CM-3", "DE.CM-7", "DE.AE-5"],
      },
      {
        title: "Investigation",
        content: [
          "Preserve evidence through proper forensic procedures.",
          "Review access logs, email communications, and endpoint activity.",
          "Interview relevant personnel while maintaining confidentiality.",
        ],
        nistMapping: ["RS.AN-3", "PR.AC-4", "DE.AE-2"],
      },
      {
        title: "Containment Strategy",
        content: [
          "Implement least privilege access restrictions.",
          "Consider account suspension or network segregation.",
          "Monitor for additional suspicious activities across related systems.",
        ],
        nistMapping: ["RS.MI-1", "PR.AC-4", "PR.PT-3"],
      },
      {
        title: "Threat Neutralization",
        content: [
          "Revoke compromised credentials and access paths.",
          "Recover or secure exposed data.",
          "Implement additional monitoring on affected systems and similar access patterns.",
        ],
        nistMapping: ["RS.MI-2", "RS.MI-3", "PR.IP-3"],
      },
      {
        title: "Remediation & Reporting",
        content: [
          "Document the incident with appropriate legal and HR teams.",
          "Update security awareness training and access control policies.",
          "Implement additional detective controls for similar scenarios.",
        ],
        nistMapping: ["RC.IM-1", "RC.IM-2", "RS.CO-2"],
      },
    ],
  }

  const cloudBreachPlaybook = {
    id: "cloud-breach",
    title: "Cloud Security Breach",
    icon: <Cloud className="h-5 w-5 text-blue-500" />,
    description: "A detailed response plan for security incidents involving cloud infrastructure and services.",
    steps: [
      {
        title: "Breach Identification",
        content: [
          "Monitor cloud security posture and alerts.",
          "Analyze authentication logs, API calls, and resource utilization.",
          "Identify affected services, data, and potential blast radius.",
        ],
        nistMapping: ["DE.AE-2", "DE.CM-8", "ID.AM-4"],
      },
      {
        title: "Isolation & Containment",
        content: [
          "Isolate compromised resources using security groups or network policies.",
          "Rotate compromised credentials and API keys.",
          "Enable additional logging and monitoring.",
        ],
        nistMapping: ["RS.MI-1", "PR.AC-1", "PR.PT-4"],
      },
      {
        title: "Impact Assessment",
        content: [
          "Determine data exposure and service disruption.",
          "Analyze cloud trail logs and resource configurations.",
          "Identify potential regulatory and compliance implications.",
        ],
        nistMapping: ["RS.AN-4", "ID.RA-4", "ID.RA-6"],
      },
      {
        title: "Service Restoration",
        content: [
          "Deploy clean infrastructure using infrastructure as code.",
          "Restore from known good backups.",
          "Implement enhanced security controls and monitoring.",
        ],
        nistMapping: ["RC.RP-1", "PR.IP-4", "PR.DS-1"],
      },
      {
        title: "Long-term Remediation",
        content: [
          "Implement cloud security best practices including least privilege, MFA, and encryption.",
          "Enhance automated compliance checking and security posture management.",
          "Conduct regular security assessments of cloud infrastructure.",
        ],
        nistMapping: ["RC.IM-1", "PR.IP-7", "ID.GV-4"],
      },
    ],
  }

  return (
    <section id="playbooks" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-background to-background/90">
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
            Incident Response Playbooks
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive, step-by-step guides for responding to common cybersecurity incidents, mapped to the NIST
            Cybersecurity Framework.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="playbooks" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
                <TabsTrigger value="nist-csf">NIST CSF</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="playbooks" className="mt-0 space-y-12">
              <PlaybookCard playbook={ddosPlaybook} />
              <PlaybookCard playbook={insiderThreatPlaybook} />
              <PlaybookCard playbook={cloudBreachPlaybook} />
            </TabsContent>

            <TabsContent value="nist-csf" className="mt-0">
              <NistCSFDetail />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
