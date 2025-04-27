"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface LinkStatus {
  url: string
  description: string
  status: "success" | "error" | "pending"
}

export default function LinkVerifier() {
  const [links, setLinks] = useState<LinkStatus[]>([
    { url: "/dashboard", description: "Dashboard Home", status: "pending" },
    { url: "/dashboard/incidents", description: "Incidents Tab", status: "pending" },
    { url: "/dashboard/vulnerabilities", description: "Vulnerabilities Tab", status: "pending" },
    { url: "/dashboard/compliance", description: "Compliance Tab", status: "pending" },
    { url: "/dashboard/reports", description: "Reports Tab", status: "pending" },
    { url: "/dashboard/test", description: "System Test", status: "pending" },
    { url: "/", description: "Main Site", status: "pending" },
    { url: "/auth/login", description: "Login Page", status: "pending" },
    { url: "/auth/register", description: "Register Page", status: "pending" },
  ])
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyLinks = () => {
    setIsVerifying(true)

    // Reset all links to pending
    setLinks(links.map((link) => ({ ...link, status: "pending" })))

    // Simulate link verification - in a real app, you'd check if the routes exist
    links.forEach((link, index) => {
      setTimeout(
        () => {
          setLinks((currentLinks) => {
            const newLinks = [...currentLinks]
            // For demo purposes, we'll randomly succeed or fail links
            // In a real app, you'd have actual verification logic
            newLinks[index] = {
              ...newLinks[index],
              status: Math.random() > 0.1 ? "success" : "error",
            }
            return newLinks
          })

          if (index === links.length - 1) {
            setIsVerifying(false)
          }
        },
        500 * (index + 1),
      )
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Link Verifier</CardTitle>
        <CardDescription>Verify all hyperlinks in the application</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono">{link.url}</TableCell>
                <TableCell>{link.description}</TableCell>
                <TableCell>
                  {link.status === "success" && <CheckCircle className="text-green-500" />}
                  {link.status === "error" && <XCircle className="text-red-500" />}
                  {link.status === "pending" && <ExternalLink className="text-yellow-500" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button onClick={verifyLinks} disabled={isVerifying} className="w-full">
          {isVerifying ? "Verifying Links..." : "Verify All Links"}
        </Button>
      </CardFooter>
    </Card>
  )
}
