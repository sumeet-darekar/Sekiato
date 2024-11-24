"use client"

import { useEffect, useState } from "react"
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
import { ProjectList } from "@/components/project-list"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    }
    fetchProjects()
  }, [])

  if (!user) {
    return <div>Please log in to view projects.</div>
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
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <Button>Add Project</Button>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>
                View and manage your projects here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList projects={projects} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

