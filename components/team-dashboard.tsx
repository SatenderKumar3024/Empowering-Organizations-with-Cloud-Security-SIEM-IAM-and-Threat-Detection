"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, UserPlus } from "lucide-react"

export function TeamDashboard() {
  const [activeTab, setActiveTab] = useState("members")

  const teamMembers = [
    {
      id: "TM001",
      name: "Alex Johnson",
      role: "Security Analyst",
      department: "SOC",
      status: "Active",
      avatar: "/abstract-aj.png",
    },
    {
      id: "TM002",
      name: "Jamie Smith",
      role: "Threat Intelligence Specialist",
      department: "Threat Intel",
      status: "Active",
      avatar: "/javascript-code-abstract.png",
    },
    {
      id: "TM003",
      name: "Morgan Lee",
      role: "Security Engineer",
      department: "Engineering",
      status: "Active",
      avatar: "/machine-learning-concept.png",
    },
    {
      id: "TM004",
      name: "Taylor Wilson",
      role: "CISO",
      department: "Executive",
      status: "Active",
      avatar: "/Abstract Geometric Shapes.png",
    },
    {
      id: "TM005",
      name: "Jordan Rivera",
      role: "Incident Responder",
      department: "SOC",
      status: "On Leave",
      avatar: "/abstract-jr.png",
    },
    {
      id: "TM006",
      name: "Satender Kumar",
      role: "Security Team Leader",
      department: "Executive",
      status: "Active",
      avatar: "/abstract-geometric-shapes.png",
    },
  ]

  const teams = [
    {
      id: "SOC",
      name: "Security Operations Center",
      description: "24/7 monitoring and response to security incidents",
      lead: "Alex Johnson",
      members: 8,
    },
    {
      id: "TI",
      name: "Threat Intelligence",
      description: "Research and analysis of emerging threats and vulnerabilities",
      lead: "Jamie Smith",
      members: 5,
    },
    {
      id: "SE",
      name: "Security Engineering",
      description: "Design and implementation of security controls and infrastructure",
      lead: "Morgan Lee",
      members: 6,
    },
    {
      id: "GRC",
      name: "Governance, Risk, and Compliance",
      description: "Management of security policies, standards, and regulatory compliance",
      lead: "Casey Brown",
      members: 4,
    },
  ]

  const roles = [
    {
      name: "Administrator",
      description: "Full access to all system features and settings",
      members: 2,
    },
    {
      name: "Analyst",
      description: "Access to threat intelligence data and analysis tools",
      members: 5,
    },
    {
      name: "Engineer",
      description: "Access to security infrastructure and configuration",
      members: 4,
    },
    {
      name: "Manager",
      description: "Access to team management and reporting features",
      members: 3,
    },
    {
      name: "Read-Only",
      description: "View-only access to dashboards and reports",
      members: 6,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">Manage your security team members and access permissions.</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold">Team Members</h3>
              <p className="text-sm text-muted-foreground">View and manage security team members</p>
            </div>
            <div className="border-t">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Name</th>
                    <th className="py-3 px-4 text-left font-medium">Role</th>
                    <th className="py-3 px-4 text-left font-medium">Department</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                            <img
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{member.role}</td>
                      <td className="py-3 px-4">{member.department}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            member.status === "Active"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }
                        >
                          {member.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold">Teams</h3>
              <p className="text-sm text-muted-foreground">View and manage security teams and departments</p>
            </div>
            <div className="grid grid-cols-2 gap-6 p-6">
              {teams.map((team) => (
                <div key={team.id} className="rounded-lg border bg-card p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">{team.name}</h4>
                      <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary/20">
                        {team.id}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{team.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Lead:</span> {team.lead}
                    </div>
                    <div className="text-sm ml-auto">
                      <span className="text-muted-foreground">{team.members} members</span>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    View Team
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold">Roles & Permissions</h3>
              <p className="text-sm text-muted-foreground">Manage security roles and access permissions</p>
            </div>
            <div className="border-t">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Role</th>
                    <th className="py-3 px-4 text-left font-medium">Description</th>
                    <th className="py-3 px-4 text-left font-medium">Members</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.name} className="border-b">
                      <td className="py-3 px-4 font-medium">{role.name}</td>
                      <td className="py-3 px-4">{role.description}</td>
                      <td className="py-3 px-4">{role.members}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Edit Role
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
