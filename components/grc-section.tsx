"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function GrcSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { toast } = useToast()

  const frameworks = [
    {
      id: "nist",
      name: "NIST CSF",
      description:
        "The NIST Cybersecurity Framework provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.",
      mappings: [
        {
          category: "Identify (ID)",
          controls: [
            {
              id: "ID.AM-3",
              name: "Asset Management",
              description: "Organizational communication and data flows are mapped",
              irMapping: "DDoS Attack, Cloud Breach",
            },
            {
              id: "ID.AM-4",
              name: "Asset Management",
              description: "External information systems are catalogued",
              irMapping: "Cloud Breach",
            },
            {
              id: "ID.RA-1",
              name: "Risk Assessment",
              description: "Asset vulnerabilities are identified and documented",
              irMapping: "All Playbooks",
            },
          ],
        },
        {
          category: "Protect (PR)",
          controls: [
            {
              id: "PR.AC-4",
              name: "Access Control",
              description: "Access permissions and authorizations are managed",
              irMapping: "Insider Threat, Cloud Breach",
            },
            {
              id: "PR.DS-1",
              name: "Data Security",
              description: "Data-at-rest is protected",
              irMapping: "Cloud Breach",
            },
            {
              id: "PR.DS-4",
              name: "Data Security",
              description: "Adequate capacity to ensure availability is maintained",
              irMapping: "DDoS Attack",
            },
          ],
        },
        {
          category: "Detect (DE)",
          controls: [
            {
              id: "DE.AE-2",
              name: "Anomalies and Events",
              description: "Detected events are analyzed to understand attack targets and methods",
              irMapping: "Cloud Breach",
            },
            {
              id: "DE.CM-1",
              name: "Security Continuous Monitoring",
              description: "The network is monitored to detect potential cybersecurity events",
              irMapping: "DDoS Attack",
            },
            {
              id: "DE.CM-3",
              name: "Security Continuous Monitoring",
              description: "Personnel activity is monitored to detect potential cybersecurity events",
              irMapping: "Insider Threat",
            },
          ],
        },
        {
          category: "Respond (RS)",
          controls: [
            {
              id: "RS.RP-1",
              name: "Response Planning",
              description: "Response plan is executed during or after an incident",
              irMapping: "All Playbooks",
            },
            {
              id: "RS.CO-2",
              name: "Communications",
              description: "Incidents are reported consistent with established criteria",
              irMapping: "Insider Threat",
            },
            {
              id: "RS.MI-2",
              name: "Mitigation",
              description: "Incidents are mitigated",
              irMapping: "Cloud Breach",
            },
          ],
        },
      ],
    },
    {
      id: "iso27001",
      name: "ISO 27001",
      description:
        "ISO/IEC 27001 is an international standard on how to manage information security. It details requirements for establishing, implementing, maintaining and continually improving an information security management system (ISMS).",
      mappings: [
        {
          category: "A.7 Human Resource Security",
          controls: [
            {
              id: "A.7.2.3",
              name: "Disciplinary Process",
              description: "Formal disciplinary process for employees who have committed a security breach",
              irMapping: "Insider Threat",
            },
          ],
        },
        {
          category: "A.8 Asset Management",
          controls: [
            {
              id: "A.8.2.3",
              name: "Handling of Assets",
              description: "Procedures for handling assets developed and implemented",
              irMapping: "Cloud Breach",
            },
          ],
        },
        {
          category: "A.9 Access Control",
          controls: [
            {
              id: "A.9.2.3",
              name: "Management of Privileged Access Rights",
              description: "The allocation and use of privileged access rights shall be restricted and controlled",
              irMapping: "Insider Threat",
            },
          ],
        },
        {
          category: "A.12 Operations Security",
          controls: [
            {
              id: "A.12.4.1",
              name: "Event Logging",
              description:
                "Event logs recording user activities, exceptions, and information security events shall be produced",
              irMapping: "Insider Threat, Cloud Breach",
            },
          ],
        },
        {
          category: "A.13 Communications Security",
          controls: [
            {
              id: "A.13.1.1",
              name: "Network Controls",
              description: "Networks shall be managed and controlled to protect information in systems",
              irMapping: "DDoS Attack",
            },
            {
              id: "A.13.1.2",
              name: "Security of Network Services",
              description:
                "Security mechanisms, service levels, and management requirements of all network services shall be identified",
              irMapping: "DDoS Attack",
            },
            {
              id: "A.13.1.3",
              name: "Segregation in Networks",
              description:
                "Groups of information services, users, and information systems shall be segregated on networks",
              irMapping: "Cloud Breach",
            },
          ],
        },
        {
          category: "A.16 Information Security Incident Management",
          controls: [
            {
              id: "A.16.1.5",
              name: "Response to Information Security Incidents",
              description:
                "Information security incidents shall be responded to in accordance with the documented procedures",
              irMapping: "DDoS Attack",
            },
            {
              id: "A.16.1.7",
              name: "Collection of Evidence",
              description:
                "Procedures for the identification, collection, acquisition, and preservation of information shall be established",
              irMapping: "Insider Threat",
            },
          ],
        },
      ],
    },
    {
      id: "nist80053",
      name: "NIST 800-53",
      description:
        "NIST Special Publication 800-53 provides a catalog of security and privacy controls for federal information systems and organizations to protect organizational operations and assets.",
      mappings: [
        {
          category: "Access Control (AC)",
          controls: [
            {
              id: "AC-2",
              name: "Account Management",
              description: "The organization manages information system accounts",
              irMapping: "Insider Threat",
            },
            {
              id: "AC-3",
              name: "Access Enforcement",
              description: "The system enforces approved authorizations for logical access",
              irMapping: "Cloud Breach",
            },
          ],
        },
        {
          category: "Audit and Accountability (AU)",
          controls: [
            {
              id: "AU-6",
              name: "Audit Review, Analysis, and Reporting",
              description: "The organization reviews and analyzes information system audit records",
              irMapping: "DDoS Attack, Insider Threat",
            },
            {
              id: "AU-12",
              name: "Audit Generation",
              description: "The information system generates audit records",
              irMapping: "Cloud Breach",
            },
          ],
        },
        {
          category: "Contingency Planning (CP)",
          controls: [
            {
              id: "CP-9",
              name: "Information System Backup",
              description: "The organization conducts backups of information system documentation",
              irMapping: "Cloud Breach",
            },
          ],
        },
        {
          category: "Incident Response (IR)",
          controls: [
            {
              id: "IR-4",
              name: "Incident Handling",
              description: "The organization implements an incident handling capability",
              irMapping: "DDoS Attack, Insider Threat",
            },
          ],
        },
        {
          category: "Personnel Security (PS)",
          controls: [
            {
              id: "PS-4",
              name: "Personnel Termination",
              description:
                "The organization, upon termination of individual employment, disables information system access",
              irMapping: "Insider Threat",
            },
          ],
        },
        {
          category: "System and Communications Protection (SC)",
          controls: [
            {
              id: "SC-5",
              name: "Denial of Service Protection",
              description: "The information system protects against or limits the effects of denial of service attacks",
              irMapping: "DDoS Attack",
            },
          ],
        },
        {
          category: "System and Information Integrity (SI)",
          controls: [
            {
              id: "SI-4",
              name: "Information System Monitoring",
              description:
                "The organization monitors the information system to detect attacks and indicators of potential attacks",
              irMapping: "Cloud Breach",
            },
          ],
        },
      ],
    },
  ]

  const handleDownloadFramework = () => {
    toast({
      title: "Generating PDF",
      description: `Preparing the ${frameworks.find((f) => f.id === "nist")?.name} framework documentation for download.`,
    })

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "PDF Generated",
        description: "Your framework documentation has been successfully downloaded.",
      })
    }, 2000)
  }

  return (
    <section id="grc" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">GRC Framework Mapping</h2>
          <p className="text-lg text-muted-foreground">
            Our incident response playbooks are mapped to key Governance, Risk, and Compliance frameworks to ensure your
            security program meets regulatory requirements and industry best practices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Framework Controls Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="nist" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="nist">NIST CSF</TabsTrigger>
                  <TabsTrigger value="iso27001">ISO 27001</TabsTrigger>
                  <TabsTrigger value="nist80053">NIST 800-53</TabsTrigger>
                </TabsList>
                {frameworks.map((framework) => (
                  <TabsContent key={framework.id} value={framework.id} className="mt-6">
                    <p className="text-muted-foreground mb-6">{framework.description}</p>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Control ID</TableHead>
                            <TableHead>Control Name</TableHead>
                            <TableHead className="max-w-[300px]">Description</TableHead>
                            <TableHead>IR Playbook Mapping</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {framework.mappings.map((category, categoryIndex) => (
                            <>
                              <TableRow key={`category-${categoryIndex}`}>
                                <TableCell colSpan={4} className="bg-muted/30 font-medium">
                                  {category.category}
                                </TableCell>
                              </TableRow>
                              {category.controls.map((control, controlIndex) => (
                                <TableRow key={`control-${controlIndex}`}>
                                  <TableCell className="font-mono text-sm">{control.id}</TableCell>
                                  <TableCell>{control.name}</TableCell>
                                  <TableCell className="max-w-[300px]">{control.description}</TableCell>
                                  <TableCell>{control.irMapping}</TableCell>
                                </TableRow>
                              ))}
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleDownloadFramework}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  Download Framework
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
