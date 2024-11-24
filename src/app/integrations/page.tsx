"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Github } from "lucide-react"
import { toast } from "sonner"  
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
}

interface Integration {
  id: string
  provider: string
  name: string
  status: "connected" | "disconnected"
  lastSync: string | null
  accessToken?: string
  repos?: GitHubRepo[]
}

export default function IntegrationsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      provider: "github",
      name: "GitHub",
      status: "disconnected",
      lastSync: null,
    }
  ])

  useEffect(() => {
    // Check for existing GitHub token
    const token = localStorage.getItem("github_token")
    if (token) {
      updateIntegrationStatus("github", "connected", token)
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const state = urlParams.get("state")
    const savedState = localStorage.getItem("github_oauth_state")

    if (code) {
      if (state !== savedState) {
        toast.error("Invalid OAuth state")
        return
      }
      
      // Clear saved state
      localStorage.removeItem("github_oauth_state")
      
      handleGitHubCallback(code)
    }
  }, [])

  const updateIntegrationStatus = (
    id: string, 
    status: "connected" | "disconnected", 
    token?: string
  ) => {
    setIntegrations(prev =>
      prev.map(int =>
        int.id === id
          ? {
              ...int,
              status,
              accessToken: token,
              lastSync: status === "connected" ? new Date().toISOString() : null
            }
          : int
      )
    )
  }

  const handleGitHubAuth = () => {
    const clientId = "Ov23liccsAzHqQBf1vJl"
    
    if (!clientId) {
      console.error("GitHub Client ID not configured")
      toast.error("GitHub integration is not properly configured")
      return
    }

    const redirectUri = `${window.location.origin}/integrations`
    const scope = "repo"
    const state = crypto.randomUUID() // Add CSRF protection

    // Store state for verification
    localStorage.setItem("github_oauth_state", state)

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope,
      state,
    })

    window.location.href = `https://github.com/login/oauth/authorize?${params}`
  }

  const handleGitHubCallback = async (code: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/integrations/github/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to exchange code for token")
      }

      const data = await response.json()
      
      if (!data.access_token) {
        throw new Error("No access token received")
      }

      // Store token and update integration status
      localStorage.setItem("github_token", data.access_token)
      updateIntegrationStatus("github", "connected", data.access_token)
      
      // Clean up URL
      window.history.replaceState({}, "", "/integrations")
      toast.success("Successfully connected to GitHub!")
    } catch (error) {
      console.error("Failed to exchange code for token:", error)
      toast.error(error instanceof Error ? error.message : "Failed to connect to GitHub")
    } finally {
      setLoading(false)
    }
  }

  const fetchRepositories = async (integration: Integration) => {
    if (!integration.accessToken) return

    try {
      setLoading(true)
      const response = await fetch("/api/integrations/github/repos", {
        headers: {
          Authorization: `Bearer ${integration.accessToken}`
        }
      })

      if (!response.ok) throw new Error("Failed to fetch repositories")

      const repos = await response.json()
      setIntegrations(prev =>
        prev.map(int =>
          int.id === integration.id
            ? { ...int, repos, lastSync: new Date().toISOString() }
            : int
        )
      )
      toast.success("Successfully fetched repositories!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch repositories")
    } finally {
      setLoading(false)
    }
  }

  const importRepository = async (repo: GitHubRepo) => {
    try {
      setLoading(true)
      const integration = integrations.find(i => i.id === "github")
      if (!integration?.accessToken) {
        throw new Error("No access token found")
      }

      const response = await fetch("/api/integrations/github/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${integration.accessToken}`
        },
        body: JSON.stringify({
          repoFullName: repo.full_name,
          repoUrl: repo.html_url,
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to import repository")
      }

      toast.success(`Successfully imported ${repo.name}`)
      router.push(`/projects/${repo.full_name}`)
    } catch (error) {
      console.error("Import error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to import repository")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
      </div>
      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="projects"
            onClick={() => router.push("/projects")}
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="scans"
            onClick={() => router.push("/scans")}
          >
            Scans
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            onClick={() => router.push("/integrations")}
          >
            Integrations
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Github className="h-6 w-6" />
                <CardTitle>{integration.name}</CardTitle>
              </div>
              {integration.lastSync && (
                <CardDescription>
                  Last synced: {new Date(integration.lastSync).toLocaleDateString()}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                    {integration.status}
                  </Badge>
                  {integration.status === "connected" ? (
                    <Button
                      variant="outline"
                      onClick={() => fetchRepositories(integration)}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading
                        </>
                      ) : (
                        "Fetch Repos"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleGitHubAuth}
                      disabled={loading}
                    >
                      Connect
                    </Button>
                  )}
                </div>

                {integration.repos && integration.repos.length > 0 && (
                  <div className="max-h-[300px] overflow-y-auto border rounded-lg">
                    {integration.repos.map((repo) => (
                      <div
                        key={repo.id}
                        className="flex justify-between items-center p-3 border-b last:border-b-0"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{repo.name}</span>
                          <span className="text-sm text-gray-500">
                            {repo.full_name}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => importRepository(repo)}
                          disabled={loading}
                        >
                          Import
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

