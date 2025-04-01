
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine the page title based on the current route
  let pageTitle = 'Home';
  
  if (path === '/roadmaps') {
    pageTitle = 'Roadmaps';
  } else if (path === '/create') {
    pageTitle = 'Create Roadmap';
  } else if (path === '/settings') {
    pageTitle = 'Settings';
  } else if (path.includes('/roadmap/')) {
    pageTitle = 'Roadmap Details';
  }
  
  return (
    <header className="h-16 flex items-center justify-between border-b border-app-gray-200 px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
        <h1 className="text-3xl font-semibold">{pageTitle}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-app-gray-600 hover:bg-app-gray-100 rounded-full">
          <Bell size={20} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-app-gray-600 hover:bg-app-gray-100 rounded-full">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
}
