import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine the page title based on the current route
  let pageTitle = 'Home';
  let pageColor = '#EF4444'; // Default color
  
  if (path === '/roadmaps') {
    pageTitle = 'Roadmaps';
    pageColor = '#3B82F6';
  } else if (path === '/create') {
    pageTitle = 'Create Roadmap';
    pageColor = '#F59E0B';
  } else if (path === '/settings') {
    pageTitle = 'Settings';
    pageColor = '#3B82F6';
  } else if (path.includes('/roadmap/')) {
    pageTitle = 'Roadmap Details';
    pageColor = '#F59E0B';
  }
  
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-100">
          <Menu size={24} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            {pageTitle}
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: pageColor }}
            />
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 rounded-full hover:bg-gray-100"
        >
          <Bell size={20} className="text-gray-600" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 rounded-full hover:bg-gray-100"
        >
          <User size={20} className="text-gray-600" />
        </Button>
      </div>
    </header>
  );
}
