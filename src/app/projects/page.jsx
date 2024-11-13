'use client'

import React, { useState } from 'react';
import { Bell, ChevronDown, Home, Layout, Package, Search, Settings, Shield, Users } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const navigation = [
  { title: 'Dashboard', icon: Home, href: '/dashboard' },
  { title: 'Projects', icon: Package, href: '/projects', isActive: true },
  { title: 'Integrations', icon: Layout, href: '/integration' },
  { title: 'Members', icon: Users, href: '/members' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

const projectData = [
  {
    id: 1,
    name: 'frontend-app',
    lastTested: '2 days ago',
    issues: { critical: 1, high: 3, medium: 2, low: 4 },
  },
  {
    id: 2,
    name: 'backend-api',
    lastTested: '1 day ago',
    issues: { critical: 0, high: 1, medium: 1, low: 5 },
  },
  {
    id: 3,
    name: 'database-service',
    lastTested: '3 days ago',
    issues: { critical: 2, high: 2, medium: 0, low: 1 },
  },
];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search projects..."
                className="w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Projects</h1>
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Project Name</TableHead>
                    <TableHead>Last Tested</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.lastTested}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-red-100 px-1.5 font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
                                {project.issues.critical}C
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-orange-100 px-1.5 font-medium text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                                {project.issues.high}H
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-yellow-100 px-1.5 font-medium text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                {project.issues.medium}M
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-green-100 px-1.5 font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                {project.issues.low}L
                              </span>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No projects found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;

