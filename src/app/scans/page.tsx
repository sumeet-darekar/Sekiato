"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import TeamSwitcher from "@/components/team-switcher"
import { UserNav } from "@/components/user-nav"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme-toggle"

const mockScans = [
  { id: 1, project: "Project A", date: "2023-06-20", vulnerabilities: 5, status: "Completed" },
  { id: 2, project: "Project B", date: "2023-06-19", vulnerabilities: 2, status: "In Progress" },
  
{ id: 3, project: "Project C", date: "2023-06-18", vulnerabilities: 0, status: "Completed" },
  { id: 4, project: "Project D", date: "2023-06-17", vulnerabilities: 8, status: "Completed" },
]

export default function ScansPage() {
  const { user } = useAuth()
  const [scans] = useState(mockScans)

  if (!user) {
    return <div>Please log in to view scans.</div>
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Scans</h2>
          <Button>New Scan</Button>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>
                View and manage your recent vulnerability scans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Scan ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Vulnerabilities</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell className="font-medium">{scan.id}</TableCell>
                      <TableCell>{scan.project}</TableCell>
                      <TableCell>{scan.date}</TableCell>
                      <TableCell>{scan.vulnerabilities}</TableCell>
                      <TableCell>{scan.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

