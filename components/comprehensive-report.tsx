"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Download, Loader2, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateComprehensiveReport, downloadPDF } from "@/lib/pdf-generator"

export function ComprehensiveReport() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [organization, setOrganization] = useState("")
  const [selectedSections, setSelectedSections] = useState({
    playbooks: true,
    research: true,
    grc: true,
    dashboard: false,
  })
  const { toast } = useToast()

  const handleSectionToggle = (section: keyof typeof selectedSections) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleDownloadReport = async () => {
    setIsGeneratingPDF(true)

    try {
      toast({
        title: "Generating Comprehensive Report",
        description: "Preparing your customized cybersecurity report. This may take a moment.",
      })

      // Build sections based on selections
      const reportSections = []

      if (selectedSections.playbooks) {
        reportSections.push({
          title: "Incident Response Playbooks",
          content: `
This section contains detailed incident response playbooks for common cybersecurity incidents:

1. DDoS Attack Response
   - Detection & Analysis
   - Containment
   - Eradication
   - Recovery
   - Post-Incident

2. Insider Threat Response
   - Initial Detection
   - Investigation
   - Containment Strategy
   - Threat Neutralization
   - Remediation & Reporting

3. Cloud Security Breach
   - Breach Identification
   - Isolation & Containment
   - Impact Assessment
   - Service Restoration
   - Long-term Remediation

Each playbook is mapped to relevant NIST CSF controls to ensure alignment with industry standards.
          `,
        })
      }

      if (selectedSections.research) {
        reportSections.push({
          title: "Security Research & Compliance Mapping",
          content: `
This section provides analysis of key cybersecurity frameworks:

1. NIST 800-53 Overview
   - Access Control (AC)
   - Audit and Accountability (AU)
   - Incident Response (IR)
   - Risk Assessment (RA)

2. ISO 27001 Framework
   - A.5 Information Security Policies
   - A.6 Organization of Information Security
   - A.8 Asset Management
   - A.9 Access Control
   - A.16 Information Security Incident Management

3. MITRE ATT&CK Framework
   - Initial Access
   - Execution
   - Persistence
   - Privilege Escalation
          `,
        })
      }

      if (selectedSections.grc) {
        reportSections.push({
          title: "GRC Framework Mapping",
          content: `
This section maps incident response playbooks to key Governance, Risk, and Compliance frameworks:

1. NIST CSF
   - Identify (ID)
     - ID.AM-3: Organizational communication and data flows are mapped
     - ID.AM-4: External information systems are catalogued
     - ID.RA-1: Asset vulnerabilities are identified and documented

   - Protect (PR)
     - PR.AC-4: Access permissions and authorizations are managed
     - PR.DS-1: Data-at-rest is protected
     - PR.DS-4: Adequate capacity to ensure availability is maintained

   - Detect (DE)
     - DE.AE-2: Detected events are analyzed to understand attack targets and methods
     - DE.CM-1: The network is monitored to detect potential cybersecurity events
     - DE.CM-3: Personnel activity is monitored to detect potential cybersecurity events

   - Respond (RS)
     - RS.RP-1: Response plan is executed during or after an incident
     - RS.CO-2: Incidents are reported consistent with established criteria
     - RS.MI-2: Incidents are mitigated

2. ISO 27001
   - A.7 Human Resource Security
   - A.8 Asset Management
   - A.9 Access Control
   - A.12 Operations Security
   - A.13 Communications Security
   - A.16 Information Security Incident Management

3. NIST 800-53
   - Access Control (AC)
   - Audit and Accountability (AU)
   - Contingency Planning (CP)
   - Incident Response (IR)
   - Personnel Security (PS)
   - System and Communications Protection (SC)
   - System and Information Integrity (SI)
          `,
        })
      }

      if (selectedSections.dashboard) {
        reportSections.push({
          title: "Threat Intelligence Dashboard",
          content: `
This section provides a snapshot of the current threat landscape:

1. Active Threats: 42
2. Security Events: 24,587
3. Critical IOCs: 18
4. Refresh Rate: 60 seconds

Global Threat Map highlights:
- DDoS attacks originating from multiple countries
- Phishing campaigns targeting financial institutions
- Ransomware activity increasing in healthcare sector
- Insider threats detected across multiple industries

Indicators of Compromise (IOCs):
- Malicious IP addresses: 128
- Suspicious domains: 87
- Malware hashes: 56
- Command and control servers: 23

Vulnerability Assessment:
- Critical vulnerabilities: 12
- High vulnerabilities: 34
- Medium vulnerabilities: 78
- Low vulnerabilities: 156
          `,
        })
      }

      const pdfBlob = await generateComprehensiveReport({
        title: "Comprehensive Cybersecurity Report",
        organization: organization || "Your Organization",
        date: new Date().toLocaleDateString(),
        sections: reportSections,
      })

      downloadPDF(pdfBlob, "comprehensive-cybersecurity-report.pdf")

      toast({
        title: "Report Generated",
        description: "Your comprehensive report has been successfully downloaded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
      console.error("Report generation error:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Comprehensive Report Generator
        </CardTitle>
        <CardDescription>
          Create a customized report that combines multiple sections of the cybersecurity incident response
          documentation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="organization">Organization Name</Label>
          <Input
            id="organization"
            placeholder="Your Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Include Sections:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="playbooks"
                checked={selectedSections.playbooks}
                onCheckedChange={() => handleSectionToggle("playbooks")}
              />
              <Label htmlFor="playbooks" className="cursor-pointer">
                Incident Response Playbooks
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="research"
                checked={selectedSections.research}
                onCheckedChange={() => handleSectionToggle("research")}
              />
              <Label htmlFor="research" className="cursor-pointer">
                Security Research & Compliance
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="grc" checked={selectedSections.grc} onCheckedChange={() => handleSectionToggle("grc")} />
              <Label htmlFor="grc" className="cursor-pointer">
                GRC Framework Mapping
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dashboard"
                checked={selectedSections.dashboard}
                onCheckedChange={() => handleSectionToggle("dashboard")}
              />
              <Label htmlFor="dashboard" className="cursor-pointer">
                Threat Intelligence Dashboard
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleDownloadReport}
          disabled={isGeneratingPDF || !Object.values(selectedSections).some(Boolean)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Comprehensive Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
