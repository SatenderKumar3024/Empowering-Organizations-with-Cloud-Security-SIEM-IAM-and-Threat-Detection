// Enhanced PDF generator with proper PDF creation using jsPDF
import { jsPDF } from "jspdf"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export interface PlaybookPDFOptions {
  title: string
  description: string
  steps: {
    title: string
    content: string[]
  }[]
  grcMapping: string[]
}

export interface ResearchPDFOptions {
  title: string
  description: string
  content: {
    title: string
    description: string
    categories: string[]
  }[]
}

export interface CompliancePDFOptions {
  title: string
  description: string
  controls: {
    id: string
    name: string
    description: string
    mapping: string
  }[]
}

export interface ComprehensiveReportOptions {
  title: string
  organization?: string
  date: string
  sections: {
    title: string
    content: string
  }[]
}

// Helper function to create a styled PDF document
function createBasePDF(title: string, subtitle?: string) {
  const doc = new jsPDF()

  // Add logo/header image (placeholder)
  doc.setFillColor(25, 93, 148) // Dark blue header
  doc.rect(0, 0, 210, 25, "F")

  // Add title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.setTextColor(255, 255, 255) // White text for header
  doc.text(title, 105, 15, { align: "center" })

  // Add subtitle if provided
  if (subtitle) {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0) // Black text
    doc.text(subtitle, 105, 35, { align: "center" })
  }

  // Add footer with page numbers
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFont("helvetica", "italic")
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100) // Gray text
    doc.text(`Page ${i} of ${totalPages}`, 105, 290, { align: "center" })
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 295, { align: "center" })
  }

  // Reset text color for content
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)

  return doc
}

// Helper function to add a section heading
function addSectionHeading(doc: jsPDF, text: string, y: number) {
  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.setTextColor(25, 93, 148) // Dark blue
  doc.text(text, 14, y)
  doc.setLineWidth(0.5)
  doc.setDrawColor(25, 93, 148)
  doc.line(14, y + 1, 196, y + 1)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  return y + 10
}

// Helper function to add a subsection heading
function addSubsectionHeading(doc: jsPDF, text: string, y: number) {
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text(text, 14, y)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  return y + 6
}

// Helper function to add paragraph text with word wrapping
function addParagraph(doc: jsPDF, text: string, y: number) {
  const splitText = doc.splitTextToSize(text, 180)
  doc.text(splitText, 14, y)
  return y + splitText.length * 5 + 5
}

// Helper function to add a bullet point list
function addBulletList(doc: jsPDF, items: string[], y: number) {
  let currentY = y

  items.forEach((item) => {
    doc.text("•", 14, currentY)
    const splitText = doc.splitTextToSize(item, 175)
    doc.text(splitText, 20, currentY)
    currentY += splitText.length * 5 + 3
  })

  return currentY + 5
}

// Generate PDF for playbooks
export async function generatePlaybookPDF(options: PlaybookPDFOptions): Promise<Blob> {
  const { title, description, steps, grcMapping } = options

  // Create PDF document
  const doc = createBasePDF("CYBERSECURITY INCIDENT RESPONSE PLAYBOOK", title)

  let y = 45

  // Add description
  y = addParagraph(doc, description, y)
  y += 10

  // Add steps
  y = addSectionHeading(doc, "RESPONSE PROCEDURE", y)

  steps.forEach((step, index) => {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    y = addSubsectionHeading(doc, `${index + 1}. ${step.title}`, y)
    y = addBulletList(doc, step.content, y)
    y += 5
  })

  // Add GRC mapping
  if (y > 230) {
    doc.addPage()
    y = 20
  }

  y = addSectionHeading(doc, "GRC FRAMEWORK MAPPING", y)
  y = addBulletList(doc, grcMapping, y)

  // Return the PDF as a blob
  return doc.output("blob")
}

// Generate PDF for research content
export async function generateResearchPDF(options: ResearchPDFOptions): Promise<Blob> {
  const { title, description, content } = options

  // Create PDF document
  const doc = createBasePDF("SECURITY RESEARCH & COMPLIANCE MAPPING", title)

  let y = 45

  // Add description
  y = addParagraph(doc, description, y)
  y += 10

  // Add content sections
  content.forEach((section) => {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    y = addSectionHeading(doc, section.title, y)
    y = addParagraph(doc, section.description, y)

    // Add categories as bullet points
    y = addSubsectionHeading(doc, "Categories:", y)
    y = addBulletList(doc, section.categories, y)
    y += 10
  })

  // Return the PDF as a blob
  return doc.output("blob")
}

// Generate PDF for compliance frameworks
export async function generateCompliancePDF(options: CompliancePDFOptions): Promise<Blob> {
  const { title, description, controls } = options

  // Create PDF document
  const doc = createBasePDF("COMPLIANCE FRAMEWORK DOCUMENTATION", title)

  let y = 45

  // Add description
  y = addParagraph(doc, description, y)
  y += 10

  // Add controls table
  y = addSectionHeading(doc, "CONTROLS", y)

  // Create table data
  const tableData = controls.map((control) => [control.id, control.name, control.description, control.mapping])

  // Add table
  doc.autoTable({
    startY: y,
    head: [["Control ID", "Name", "Description", "Mapping"]],
    body: tableData,
    headStyles: { fillColor: [25, 93, 148], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 20, right: 14, bottom: 20, left: 14 },
  })

  // Return the PDF as a blob
  return doc.output("blob")
}

// Generate comprehensive report combining multiple sections
export async function generateComprehensiveReport(options: ComprehensiveReportOptions): Promise<Blob> {
  const { title, organization, date, sections } = options

  // Create PDF document
  const doc = createBasePDF("COMPREHENSIVE CYBERSECURITY REPORT", title)

  let y = 45

  // Add organization and date
  doc.setFont("helvetica", "bold")
  doc.text(`Organization: ${organization || "Your Organization"}`, 14, y)
  y += 6
  doc.text(`Date: ${date}`, 14, y)
  y += 10

  // Add table of contents
  y = addSectionHeading(doc, "TABLE OF CONTENTS", y)

  sections.forEach((section, index) => {
    doc.text(`${index + 1}. ${section.title}`, 14, y)
    y += 6
  })

  y += 10

  // Add sections
  sections.forEach((section, index) => {
    doc.addPage()
    y = 20

    y = addSectionHeading(doc, `${index + 1}. ${section.title}`, y)

    // Split the content into paragraphs
    const paragraphs = section.content.split("\n\n")

    paragraphs.forEach((paragraph) => {
      if (paragraph.trim().startsWith("-")) {
        // This is a bullet list
        const items = paragraph.split("\n-").map((item) => item.replace(/^-\s*/, "").trim())
        y = addBulletList(doc, items, y)
      } else if (paragraph.trim().startsWith("#")) {
        // This is a subheading
        y = addSubsectionHeading(doc, paragraph.replace(/^#+\s*/, ""), y)
      } else {
        // Regular paragraph
        y = addParagraph(doc, paragraph, y)
      }

      // Check if we need a new page
      if (y > 270) {
        doc.addPage()
        y = 20
      }
    })
  })

  // Return the PDF as a blob
  return doc.output("blob")
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename || "document.pdf"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
