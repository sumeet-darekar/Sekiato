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
  { title: 'Dashboard', icon: Home, href: '#', isActive: true },
  { title: 'Projects', icon: Package, href: '/projects' },
  { title: 'Integrations', icon: Layout, href: '/integration' },
  { title: 'Members', icon: Users, href: '/members' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

const pendingTasks = [
  { id: 1, project: 'frontend-app', issues: { critical: 0, high: 1, medium: 0, low: 0 } },
  { id: 2, project: 'backend-api', issues: { critical: 1, high: 2, medium: 3, low: 1 } },
  { id: 3, project: 'mobile-app', issues: { critical: 0, high: 0, medium: 2, low: 4 } },
];

const vulnerableProjects = [
  { id: 1, project: 'backend-api', tested: '15 hours ago', issues: { critical: 0, high: 5, medium: 0, low: 6 } },
  { id: 2, project: 'mobile-app', tested: '4 days ago', issues: { critical: 0, high: 3, medium: 0, low: 4 } },
  { id: 3, project: 'database-service', tested: 'a day ago', issues: { critical: 0, high: 1, medium: 0, low: 0 } },
  { id: 4, project: 'auth-service', tested: '2 days ago', issues: { critical: 1, high: 2, medium: 3, low: 1 } },
];

const SecurityDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

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
            <h1 className="text-3xl font-semibold">Security Dashboard</h1>
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">-1 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">+5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">+22 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Project</TableHead>
                      <TableHead>Fixable Issues</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.project}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-red-100 px-1.5 font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
                                {task.issues.critical}C
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-orange-100 px-1.5 font-medium text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                                {task.issues.high}H
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-yellow-100 px-1.5 font-medium text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                                {task.issues.medium}M
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-5 rounded bg-green-100 px-1.5 font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                {task.issues.low}L
                              </span>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            Fix Issues
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Vulnerable Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Project</TableHead>
                      <TableHead>Last Tested</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vulnerableProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.project}</TableCell>
                        <TableCell>{project.tested}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecurityDashboard;

