"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, FileText, ShieldCheck, Network } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResearchDetails } from "@/components/research-details"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ResearchSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedFramework, setSelectedFramework] = useState("nist")
  const { toast } = useToast()

  const researchTopics = [
    {
      id: "nist",
      title: "NIST 800-53 Overview",
      icon: <ClipboardCheck className="h-6 w-6 text-cyan-500" />,
      description: "Analysis of the NIST Special Publication 800-53 security and privacy controls framework",
      content: [
        {
          title: "Access Control (AC)",
          description: "Policies and procedures for ensuring proper access privileges",
          categories: [
            "AC-1 Access Control Policy and Procedures",
            "AC-2 Account Management",
            "AC-3 Access Enforcement",
          ],
        },
        {
          title: "Audit and Accountability (AU)",
          description: "Tracking, monitoring, and analyzing system activity",
          categories: [
            "AU-1 Audit and Accountability Policy",
            "AU-2 Event Logging",
            "AU-6 Audit Review, Analysis, and Reporting",
          ],
        },
        {
          title: "Incident Response (IR)",
          description: "Planning and responding to security incidents",
          categories: ["IR-1 Incident Response Policy", "IR-4 Incident Handling", "IR-8 Incident Response Plan"],
        },
      ],
    },
    {
      id: "iso",
      title: "ISO 27001 Framework",
      icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
      description: "Examination of the ISO 27001 information security management system standard",
      content: [
        {
          title: "A.5 Information Security Policies",
          description: "Management direction for information security",
          categories: ["A.5.1 Management direction for information security", "A.5.2 Information security policies"],
        },
        {
          title: "A.9 Access Control",
          description: "Business requirements of access control",
          categories: [
            "A.9.1 Business requirements for access control",
            "A.9.2 User access management",
            "A.9.4 System and application access control",
          ],
        },
        {
          title: "A.16 Information Security Incident Management",
          description: "Management of information security incidents and improvements",
          categories: [
            "A.16.1 Management of information security incidents",
            "A.16.1.5 Response to information security incidents",
          ],
        },
      ],
    },
    {
      id: "mitre",
      title: "MITRE ATT&CK Framework",
      icon: <Network className="h-6 w-6 text-purple-500" />,
      description: "Analysis of adversary tactics and techniques based on real-world observations",
      content: [
        {
          title: "Initial Access",
          description: "Techniques used to gain an initial foothold within a network",
          categories: ["T1566 Phishing", "T1190 Exploit Public-Facing Application", "T1133 External Remote Services"],
        },
        {
          title: "Execution",
          description: "Techniques that result in adversary-controlled code running on a local or remote system",
          categories: [
            "T1059 Command and Scripting Interpreter",
            "T1204 User Execution",
            "T1047 Windows Management Instrumentation",
          ],
        },
        {
          title: "Persistence",
          description: "Techniques used to maintain presence on systems",
          categories: ["T1098 Account Manipulation", "T1136 Create Account", "T1505 Server Software Component"],
        },
      ],
    },
    {
      id: "grc",
      title: "GRC Implementation Guide",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      description: "Governance, Risk, and Compliance implementation strategies for security programs",
      content: [
        {
          title: "Governance",
          description: "Establishing direction, authority, and accountability",
          categories: ["Security Policies", "Program Management", "Leadership and Commitment"],
        },
        {
          title: "Risk Management",
          description: "Identifying, assessing, and mitigating security risks",
          categories: ["Risk Assessment", "Risk Treatment", "Risk Monitoring"],
        },
        {
          title: "Compliance",
          description: "Meeting regulatory and contractual obligations",
          categories: ["Compliance Monitoring", "Audit Management", "Regulatory Tracking"],
        },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const handleDownloadResearch = async () => {
    toast({
      title: "Generating PDF",
      description: `Preparing the ${researchTopics.find((t) => t.id === selectedFramework)?.title} research document for download.`,
    })

    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "PDF Generated",
      description: "Your research document has been successfully downloaded.",
    })
  }

  return (
    <section id="research" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-background to-background/90">
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
            Security Research & Compliance Mapping
          </h2>
          <p className="text-lg text-muted-foreground">
            Analysis of key cybersecurity frameworks and standards that inform our incident response methodologies and
            governance recommendations.
          </p>
        </motion.div>

        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="detailed">Detailed View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="pt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {researchTopics.map((topic) => (
                <motion.div key={topic.id} variants={itemVariants} className="h-full">
                  <Card
                    className="h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                    onClick={() => setSelectedFramework(topic.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {topic.icon}
                        <CardTitle>{topic.title}</CardTitle>
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {topic.content.map((item, itemIndex) => (
                          <AccordionItem key={itemIndex} value={`${topic.id}-${itemIndex}`}>
                            <AccordionTrigger className="text-lg font-medium">{item.title}</AccordionTrigger>
                            <AccordionContent>
                              <p className="mb-3 text-muted-foreground">{item.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {item.categories.map((category, catIndex) => (
                                  <Badge key={catIndex} variant="outline" className="bg-primary/10 text-primary">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="detailed" className="pt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="space-y-2">
                  {researchTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
                        selectedFramework === topic.id
                          ? "bg-primary/15 text-primary"
                          : "hover:bg-primary/5 hover:text-primary"
                      }`}
                      onClick={() => setSelectedFramework(topic.id)}
                    >
                      {topic.icon}
                      <span className="font-medium">{topic.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3">
                <ResearchDetails framework={selectedFramework} />
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleDownloadResearch}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                  >
                    <Download className="h-4 w-4" />
                    Download Research
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
