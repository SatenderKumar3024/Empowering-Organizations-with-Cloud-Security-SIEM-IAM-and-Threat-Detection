"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComprehensiveReport } from "@/components/comprehensive-report"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Shield, Users, Cloud } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DownloadsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { toast } = useToast()

  const handleQuickDownload = async (type: string) => {
    toast({
      title: "Quick Download",
      description: `Preparing ${type} for download...`,
    })

    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Download Complete",
      description: `Your ${type} has been downloaded.`,
    })
  }

  return (
    <section id="downloads" ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-background/90 to-background">
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
            Documentation & Downloads
          </h2>
          <p className="text-lg text-muted-foreground">
            Access and download comprehensive documentation, playbooks, and reports for your cybersecurity program.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="comprehensive" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="comprehensive">Comprehensive Report</TabsTrigger>
                <TabsTrigger value="quick">Quick Downloads</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="comprehensive" className="mt-0">
              <ComprehensiveReport />
            </TabsContent>

            <TabsContent value="quick" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-cyan-500" />
                      DDoS Attack Playbook
                    </CardTitle>
                    <CardDescription>
                      A comprehensive response plan for Distributed Denial of Service attacks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleQuickDownload("DDoS Attack Playbook")}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Playbook
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      Insider Threat Playbook
                    </CardTitle>
                    <CardDescription>
                      A structured approach to detecting and mitigating threats from within your organization.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleQuickDownload("Insider Threat Playbook")}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Playbook
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-blue-500" />
                      Cloud Security Breach Playbook
                    </CardTitle>
                    <CardDescription>
                      A detailed response plan for security incidents involving cloud infrastructure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleQuickDownload("Cloud Security Breach Playbook")}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Playbook
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      NIST CSF Documentation
                    </CardTitle>
                    <CardDescription>Detailed mapping of controls to the NIST Cybersecurity Framework.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleQuickDownload("NIST CSF Documentation")}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Documentation
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-500" />
                      ISO 27001 Controls
                    </CardTitle>
                    <CardDescription>Mapping of incident response procedures to ISO 27001 controls.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleQuickDownload("ISO 27001 Controls")}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Controls
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-red-500" />
                      Threat Intelligence Report
                    </CardTitle>
                    <CardDescription>Current threat landscape and indicators of compromise.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleQuickDownload("Threat Intelligence Report")}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
