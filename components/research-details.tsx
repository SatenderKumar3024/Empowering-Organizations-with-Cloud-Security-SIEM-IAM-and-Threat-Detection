"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateResearchPDF, downloadPDF } from "@/lib/pdf-generator"

interface FrameworkDetail {
  id: string
  title: string
  description: string
  keyPoints: string[]
  references: string[]
}

export function ResearchDetails({ framework }: { framework: string }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { toast } = useToast()

  const frameworkDetails: Record<string, FrameworkDetail> = {
    nist: {
      id: "nist",
      title: "NIST 800-53 Framework",
      description:
        "NIST Special Publication 800-53 provides a catalog of security and privacy controls for federal information systems and organizations to protect organizational operations and assets.",
      keyPoints: [
        "Provides a structured approach to security control selection and implementation",
        "Organizes controls into 20 families (e.g., Access Control, Incident Response)",
        "Defines three security control baselines: Low, Moderate, and High impact",
        "Supports risk management framework (RMF) implementation",
        "Includes control enhancements for specialized security capabilities",
        "Provides flexibility for tailoring controls to specific organizational needs",
        "Addresses both security and privacy requirements",
      ],
      references: [
        "NIST SP 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations",
        "NIST SP 800-37: Guide for Applying the Risk Management Framework",
        "NIST SP 800-171: Protecting Controlled Unclassified Information",
      ],
    },
    iso: {
      id: "iso",
      title: "ISO 27001 Framework",
      description:
        "ISO/IEC 27001 is an international standard for information security management systems (ISMS) that provides requirements for establishing, implementing, maintaining, and continually improving an ISMS.",
      keyPoints: [
        "Follows the Plan-Do-Check-Act (PDCA) cycle for continuous improvement",
        "Requires formal risk assessment and treatment processes",
        "Includes 114 controls across 14 control domains (Annex A)",
        "Focuses on management system requirements rather than specific technologies",
        "Requires documented policies, procedures, and evidence of implementation",
        "Supports certification through accredited certification bodies",
        "Integrates with other ISO management system standards",
      ],
      references: [
        "ISO/IEC 27001:2022: Information Security Management Systems - Requirements",
        "ISO/IEC 27002:2022: Code of Practice for Information Security Controls",
        "ISO/IEC 27005: Information Security Risk Management",
      ],
    },
    mitre: {
      id: "mitre",
      title: "MITRE ATT&CK Framework",
      description:
        "MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations of cyber attacks.",
      keyPoints: [
        "Organizes techniques into 14 tactical categories (Initial Access, Execution, etc.)",
        "Documents specific procedures used by threat actors (APT groups)",
        "Provides a common language for describing attack behaviors",
        "Supports threat intelligence, detection, and mitigation activities",
        "Includes matrices for Enterprise, Mobile, and ICS environments",
        "Maps techniques to specific threat groups and software",
        "Enables gap analysis for security controls and detection capabilities",
      ],
      references: [
        "MITRE ATT&CK Enterprise Matrix",
        "MITRE ATT&CK for Industrial Control Systems (ICS)",
        "MITRE D3FEND: Countermeasures for ATT&CK techniques",
      ],
    },
    grc: {
      id: "grc",
      title: "GRC Implementation Guide",
      description:
        "Governance, Risk, and Compliance (GRC) is an integrated approach to organizational governance, enterprise risk management, and regulatory compliance.",
      keyPoints: [
        "Aligns security activities with business objectives and stakeholder expectations",
        "Establishes clear roles, responsibilities, and accountability structures",
        "Implements risk-based decision making across the organization",
        "Streamlines compliance activities across multiple regulatory frameworks",
        "Provides metrics and reporting for executive oversight",
        "Supports continuous monitoring and improvement processes",
        "Integrates with enterprise architecture and business processes",
      ],
      references: [
        "OCEG GRC Capability Model (Red Book)",
        "COBIT 2019: Control Objectives for Information Technologies",
        "NIST Cybersecurity Framework (CSF)",
      ],
    },
  }

  const details = frameworkDetails[framework]

  if (!details) {
    return <div>Framework details not found</div>
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      toast({
        title: "Generating PDF",
        description: `Preparing the ${details.title} research document for download.`,
      })

      // Format content for PDF generation
      const formattedContent = [
        {
          title: "Overview",
          description: details.description,
          categories: [],
        },
        {
          title: "Key Implementation Points",
          description: "Important aspects of framework implementation:",
          categories: details.keyPoints,
        },
        {
          title: "Key References",
          description: "Important documentation and resources:",
          categories: details.references,
        },
      ]

      // Generate PDF
      const pdfBlob = await generateResearchPDF({
        title: details.title,
        description: details.description,
        content: formattedContent,
      })

      downloadPDF(pdfBlob, `${details.id}-research.pdf`)

      toast({
        title: "PDF Generated",
        description: "Your research document has been successfully downloaded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
      console.error("PDF generation error:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{details.title}</CardTitle>
          <CardDescription>{details.description}</CardDescription>
        </div>
        <Button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Research
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Key Implementation Points</h4>
          <ul className="space-y-2">
            {details.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Key References</h4>
          <div className="flex flex-wrap gap-2">
            {details.references.map((ref, index) => (
              <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                {ref}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
