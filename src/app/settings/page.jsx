'use client'

import React, { useState } from 'react';
import { Bell, Home, Layout, Package, Settings as SettingsIcon, Shield } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const navigation = [
  { title: 'Dashboard', icon: Home, href: '/dashboard' },
  { title: 'Projects', icon: Package, href: '/projects' },
  { title: 'Integrations', icon: Layout, href: '/integrations' },
  { title: 'Members', icon: 'Users', href: '/members' },
  { title: 'Settings', icon: SettingsIcon, href: '/settings', isActive: true },
];

const SettingsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSave = () => {
    // Implement save functionality (e.g., send data to the backend)
    console.log('Settings saved:', { email, password, theme, notificationsEnabled });
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
            <h1 className="text-3xl font-semibold">Settings</h1>
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
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="password" className="block text-sm font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="text-sm font-semibold">Select Theme</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <input
                      type="radio"
                      id="light-theme"
                      name="theme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={handleThemeChange}
                      className="mr-2"
                    />
                    <label htmlFor="light-theme" className="text-sm">Light</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="dark-theme"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={handleThemeChange}
                      className="mr-2"
                    />
                    <label htmlFor="dark-theme" className="text-sm">Dark</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Label className="mr-4">Enable Notifications</Label>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="px-6 py-2">Save Settings</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;

