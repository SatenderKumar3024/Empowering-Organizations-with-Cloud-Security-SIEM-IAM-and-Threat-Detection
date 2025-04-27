"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ChevronDown, ChevronUp, CheckCircle2, Loader2, Shield, Users, Cloud } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generatePlaybookPDF, downloadPDF } from "@/lib/pdf-generator"

interface PlaybookStep {
  title: string
  content: string[]
}

interface Playbook {
  id?: string
  title: string
  icon?: React.ReactNode
  description: string
  steps: {
    title: string
    content: string[]
    nistMapping?: string[]
  }[]
  grcMapping?: string[]
}

interface PlaybookCardProps {
  playbook: Playbook
}

export function PlaybookCard({ playbook }: PlaybookCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { toast } = useToast()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Get the appropriate icon based on the playbook title
  const getPlaybookIcon = () => {
    if (playbook.icon) return playbook.icon

    if (playbook.title.toLowerCase().includes("ddos")) {
      return <Shield className="h-5 w-5 text-cyan-500" />
    } else if (playbook.title.toLowerCase().includes("insider")) {
      return <Users className="h-5 w-5 text-purple-500" />
    } else if (playbook.title.toLowerCase().includes("cloud")) {
      return <Cloud className="h-5 w-5 text-blue-500" />
    }

    return <Shield className="h-5 w-5 text-primary" />
  }

  // Extract NIST mappings from steps
  const getAllNistMappings = () => {
    const mappings = new Set<string>()
    playbook.steps.forEach((step) => {
      if (step.nistMapping) {
        step.nistMapping.forEach((mapping) => mappings.add(mapping))
      }
    })
    return Array.from(mappings)
  }

  const handleDownload = async () => {
    setIsGeneratingPDF(true)

    try {
      toast({
        title: "Generating PDF",
        description: `Preparing the ${playbook.title} playbook for download.`,
      })

      // Format steps for PDF generation
      const formattedSteps = playbook.steps.map((step) => ({
        title: step.title,
        content: step.content,
      }))

      // Get all NIST mappings
      const grcMapping = playbook.grcMapping || getAllNistMappings()

      // Generate PDF
      const pdfBlob = await generatePlaybookPDF({
        title: playbook.title,
        description: playbook.description,
        steps: formattedSteps,
        grcMapping: grcMapping,
      })

      downloadPDF(pdfBlob, `${playbook.id || playbook.title.toLowerCase().replace(/\s+/g, "-")}-playbook.pdf`)

      toast({
        title: "PDF Generated",
        description: "Your playbook has been successfully downloaded.",
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
    <Card className="overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none" />
      <CardHeader className="bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getPlaybookIcon()}
            <CardTitle>{playbook.title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpand}
            aria-label={isExpanded ? "Collapse playbook" : "Expand playbook"}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        <CardDescription>{playbook.description}</CardDescription>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {playbook.steps.map((step, index) => (
                  <AccordionItem key={index} value={`step-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">{step.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-0 list-none">
                        {step.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {step.nistMapping && step.nistMapping.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">NIST CSF Mapping:</p>
                          <div className="flex flex-wrap gap-1">
                            {step.nistMapping.map((mapping, mapIndex) => (
                              <Badge key={mapIndex} variant="outline" className="bg-primary/10 text-primary">
                                {mapping}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3">GRC Mapping</h4>
                <div className="flex flex-wrap gap-2">
                  {(playbook.grcMapping || getAllNistMappings()).map((mapping, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                      {mapping}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pb-6">
              <Button
                onClick={handleDownload}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Playbook
                  </>
                )}
              </Button>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
