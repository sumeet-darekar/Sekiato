// components/MainLayout.js
import React from 'react';
import Link from 'next/link';
import { Home, Package, Layout, Users, Settings, Shield } from 'lucide-react';

const navigation = [
  { title: 'Dashboard', icon: Home, href: '/' },
  { title: 'Projects', icon: Package, href: '/projects' },
  { title: 'Integrations', icon: Layout, href: '/integrations' },
  { title: 'Members', icon: Users, href: '/members' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

const MainLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
    <div className="w-64 bg-gray-900 text-white">
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-4">
        <Shield className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-semibold">SekiAto</span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => (
          <Link key={item.title} href={item.href} passHref>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-800">
              <item.icon className="h-5 w-5" />
              {item.title}
            </a>
          </Link>
        ))}
      </nav>
    </div>
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
);

export default MainLayout;

