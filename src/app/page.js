'use client'

import React from 'react';
import { Home, User, Settings as SettingsIcon, Package, Shield, PlayCircle } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const navigation = [
  { title: 'Dashboard', icon: Home, href: '/dashboard' },
  { title: 'Projects', icon: Package, href: '/projects' },
  { title: 'Integrations', icon: 'GitHub', href: '/integration' },
  { title: 'Members', icon: User, href: '/members' },
  { title: 'Settings', icon: SettingsIcon, href: '/settings' },
];

const MainPage = () => {
  const user = {
    name: 'Sumeet',
    avatarUrl: '/placeholder.svg?height=32&width=32',
    stats: {
      projects: 5,
      activeTasks: 12,
      completedTasks: 32,
    },
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
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
                item.title === 'Dashboard'
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

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Welcome to SekiAto</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <PlayCircle className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Welcome back, {user.name}!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                We are happy to have you here. Here's what's new:
              </div>
            </CardContent>
          </Card>

          {/* Key Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">{user.stats.projects}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total projects</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">{user.stats.activeTasks}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Tasks you're currently working on</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">{user.stats.completedTasks}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Tasks you've completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Started with New Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="primary" size="lg" className="w-full">
                  Create New Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Explore Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="lg" className="w-full">
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
    </div>
  );
};

export default MainPage;

