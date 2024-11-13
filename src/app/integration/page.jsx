'use client'

import React, { useState, useEffect } from 'react';
import { Bell, Home, Layout, Package, Settings, Shield, Users } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const navigation = [
  { title: 'Dashboard', icon: Home, href: '/dashboard' },
  { title: 'Projects', icon: Package, href: '/projects' },
  { title: 'Integrations', icon: Layout, href: '/integrations', isActive: true },
  { title: 'Members', icon: Users, href: '/members' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

// Mock data fetching functions
const fetchGitHubProjects = async () => {
  // Replace with real API call
  return [
    { id: 1, name: 'GitHub Project 1', lastUpdated: '3 days ago' },
    { id: 2, name: 'GitHub Project 2', lastUpdated: '1 day ago' },
  ];
};

const fetchGitLabProjects = async () => {
  // Replace with real API call
  return [
    { id: 1, name: 'GitLab Project 1', lastUpdated: '5 days ago' },
    { id: 2, name: 'GitLab Project 2', lastUpdated: '2 days ago' },
  ];
};

const IntegrationsPage = () => {
  const [githubProjects, setGithubProjects] = useState([]);
  const [gitlabProjects, setGitlabProjects] = useState([]);
  const [manualProjects, setManualProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    // Fetch projects from GitHub
    const fetchProjects = async () => {
      const githubData = await fetchGitHubProjects();
      const gitlabData = await fetchGitLabProjects();
      setGithubProjects(githubData);
      setGitlabProjects(gitlabData);
    };

    fetchProjects();
  }, []);

  const addManualProject = () => {
    if (newProjectName.trim()) {
      setManualProjects([...manualProjects, { id: Date.now(), name: newProjectName, lastUpdated: 'Just now' }]);
      setNewProjectName('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className={`w-64 bg-gray-900 text-white`}>
        <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-4">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-semibold">SekiAto</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                item.isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Integrations</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>GitHub Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {githubProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>GitLab Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gitlabProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manual Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Input
                  placeholder="Enter project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <Button onClick={addManualProject} className="ml-2">
                  Add Project
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manualProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default IntegrationsPage;

