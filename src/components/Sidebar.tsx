
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  FileText, 
  Home, 
  Plus, 
  Settings,
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarMenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  color?: string;
}

const SidebarMenuItem = ({ to, icon, label, count, color }: SidebarMenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "sidebar-menu-item",
        isActive && "active"
      )}
    >
      {color && <span className="list-color" style={{ backgroundColor: color }}></span>}
      {icon}
      <span>{label}</span>
      {count !== undefined && <span className="count-badge">{count}</span>}
    </Link>
  );
};

export function Sidebar() {
  return (
    <div className="w-[270px] bg-app-sidebar h-screen border-r border-app-gray-200 flex flex-col">
      <div className="p-3 border-b border-app-gray-200">
        <h1 className="text-xl font-semibold px-3 py-2">NextSkill</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="sidebar-section">
          <h2 className="sidebar-heading">Menu</h2>
          <div className="space-y-1">
            <SidebarMenuItem 
              to="/" 
              icon={<Home size={16} />} 
              label="Home"
            />
            <SidebarMenuItem 
              to="/roadmaps" 
              icon={<FileText size={16} />} 
              label="Roadmaps" 
            />
          </div>
        </div>
        
        <div className="sidebar-section">
          <h2 className="sidebar-heading">Roadmaps</h2>
          <div className="space-y-1">
            <SidebarMenuItem 
              to="/roadmap/1" 
              icon={<span></span>} 
              label="Web Development" 
              color="#ef4444"
            />
            <SidebarMenuItem 
              to="/roadmap/2" 
              icon={<span></span>} 
              label="Data Science" 
              color="#3b82f6"
            />
            <SidebarMenuItem 
              to="/roadmap/3" 
              icon={<span></span>} 
              label="Mobile Development" 
              color="#f59e0b"
            />
            <Link to="/create" className="sidebar-menu-item">
              <Plus size={16} />
              <span>Create New Roadmap</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-app-gray-200">
        <div className="space-y-1">
          <Link to="/settings" className="sidebar-menu-item">
            <Settings size={16} />
            <span>Settings</span>
          </Link>
          <button className="sidebar-menu-item">
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
        <div className="mt-4 text-xs text-app-gray-500 px-4">
          © 2023 NextSkill™
        </div>
      </div>
    </div>
  );
}
