"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, ArrowRight } from "lucide-react"

interface NistCSFCategory {
  function: string
  id: string
  name: string
  description: string
  subcategories: {
    id: string
    name: string
    description: string
  }[]
}

export function NistCSFDetail() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const csfCategories: NistCSFCategory[] = [
    {
      function: "Identify",
      id: "ID",
      name: "Asset Management",
      description:
        "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy.",
      subcategories: [
        {
          id: "ID.AM-1",
          name: "Physical devices and systems",
          description: "Physical devices and systems within the organization are inventoried",
        },
        {
          id: "ID.AM-2",
          name: "Software platforms and applications",
          description: "Software platforms and applications within the organization are inventoried",
        },
        {
          id: "ID.AM-3",
          name: "Communication flows",
          description: "Organizational communication and data flows are mapped",
        },
        {
          id: "ID.AM-4",
          name: "External information systems",
          description: "External information systems are catalogued",
        },
      ],
    },
    {
      function: "Protect",
      id: "PR",
      name: "Access Control",
      description:
        "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions.",
      subcategories: [
        {
          id: "PR.AC-1",
          name: "Identities and credentials",
          description:
            "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
        },
        {
          id: "PR.AC-4",
          name: "Access permissions",
          description:
            "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties",
        },
        {
          id: "PR.AC-5",
          name: "Network integrity",
          description: "Network integrity is protected (e.g., network segregation, network segmentation)",
        },
      ],
    },
    {
      function: "Detect",
      id: "DE",
      name: "Anomalies and Events",
      description: "Anomalous activity is detected and the potential impact of events is understood.",
      subcategories: [
        {
          id: "DE.AE-1",
          name: "Baseline network operations",
          description:
            "A baseline of network operations and expected data flows for users and systems is established and managed",
        },
        {
          id: "DE.AE-2",
          name: "Analyze detected events",
          description: "Detected events are analyzed to understand attack targets and methods",
        },
        {
          id: "DE.AE-3",
          name: "Event data aggregation",
          description: "Event data are collected and correlated from multiple sources and sensors",
        },
      ],
    },
    {
      function: "Respond",
      id: "RS",
      name: "Response Planning",
      description:
        "Response processes and procedures are executed and maintained, to ensure response to detected cybersecurity incidents.",
      subcategories: [
        {
          id: "RS.RP-1",
          name: "Response plan execution",
          description: "Response plan is executed during or after an incident",
        },
        {
          id: "RS.CO-1",
          name: "Personnel know roles",
          description: "Personnel know their roles and order of operations when a response is needed",
        },
        {
          id: "RS.CO-2",
          name: "Incident reporting",
          description: "Incidents are reported consistent with established criteria",
        },
      ],
    },
    {
      function: "Recover",
      id: "RC",
      name: "Recovery Planning",
      description:
        "Recovery processes and procedures are executed and maintained to ensure restoration of systems or assets affected by cybersecurity incidents.",
      subcategories: [
        {
          id: "RC.RP-1",
          name: "Recovery plan execution",
          description: "Recovery plan is executed during or after a cybersecurity incident",
        },
        {
          id: "RC.IM-1",
          name: "Recovery planning improvements",
          description: "Recovery plans incorporate lessons learned",
        },
        {
          id: "RC.IM-2",
          name: "Recovery strategies updates",
          description: "Recovery strategies are updated",
        },
      ],
    },
  ]

  const getFunctionColor = (funcName: string) => {
    switch (funcName) {
      case "Identify":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "Protect":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      case "Detect":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "Respond":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30"
      case "Recover":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  return (
    <div ref={ref}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <ClipboardCheck className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-semibold">NIST Cybersecurity Framework (CSF)</h3>
        </div>
        <p className="text-muted-foreground">
          The NIST Cybersecurity Framework provides a policy framework of computer security guidance for organizations
          to assess and improve their ability to prevent, detect, and respond to cyber attacks. This framework is mapped
          to our incident response playbooks.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle>Core Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {["Identify", "Protect", "Detect", "Respond", "Recover"].map((func) => (
                <Card key={func} className="border-primary/10">
                  <CardContent className="p-4">
                    <Badge className={getFunctionColor(func)}>{func}</Badge>
                    <div className="mt-2 text-sm">
                      {
                        {
                          Identify: "Assets that need protection",
                          Protect: "Safeguards for critical assets",
                          Detect: "Identify cybersecurity events",
                          Respond: "Take action on detected events",
                          Recover: "Restore capabilities after incidents",
                        }[func]
                      }
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle>Framework Categories & Subcategories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {csfCategories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getFunctionColor(category.function)}>
                      {category.function} ({category.id})
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">{category.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[200px]">Subcategory</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.subcategories.map((sub) => (
                        <TableRow key={sub.id}>
                          <TableCell className="font-mono text-xs">{sub.id}</TableCell>
                          <TableCell>{sub.name}</TableCell>
                          <TableCell>{sub.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
