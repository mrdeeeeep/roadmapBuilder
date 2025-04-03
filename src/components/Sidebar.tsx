import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

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
        "flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100/80 transition-colors",
        isActive && "bg-gray-100 text-gray-800 font-medium"
      )}
    >
      {color ? (
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      ) : (
        icon
      )}
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-auto bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B']; // Define the three app colors

let fetchRoadmaps: () => Promise<void>; // Declare fetchRoadmaps for external use

export function Sidebar() {
  const [roadmaps, setRoadmaps] = useState([]);
  const { signOut } = useAuth();
  const { toast } = useToast();

  fetchRoadmaps = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error("Unable to fetch user session. Please log in again.");
      }
      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from('roadmaps')
        .select('id, name')
        .eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      setRoadmaps(data || []);
    } catch (error) {
      console.error("Error fetching roadmaps for sidebar:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch roadmaps",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRoadmaps();

    // Subscribe to real-time updates for the roadmaps table
    const subscription = supabase
      .channel('roadmaps')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'roadmaps' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setRoadmaps((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'DELETE') {
            setRoadmaps((prev) => prev.filter((roadmap) => roadmap.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setRoadmaps((prev) =>
              prev.map((roadmap) =>
                roadmap.id === payload.new.id ? { ...roadmap, ...payload.new } : roadmap
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign out",
      });
    }
  };

  return (
    <aside className="w-[280px] bg-white h-full border-r border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-800">NextSkill</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-6">
          <div className="space-y-1 px-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
              Menu
            </h2>
            <SidebarMenuItem 
              to="/" 
              icon={<Home size={18} className="text-gray-500" />} 
              label="Home"
            />
            <SidebarMenuItem 
              to="/roadmaps" 
              icon={<FileText size={18} className="text-gray-500" />} 
              label="Roadmaps" 
            />
          </div>
          
          <div className="space-y-1 px-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
              My Roadmaps
            </h2>
            {roadmaps.map((roadmap, index) => (
              <SidebarMenuItem 
                key={roadmap.id}
                to={`/roadmap/${roadmap.id}`}
                label={roadmap.name}
                color={COLORS[index % COLORS.length]} // Alternate colors
                icon={<ChevronRight size={18} />}
              />
            ))}
            <Link 
              to="/create" 
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100/80 transition-colors mt-2"
            >
              <Plus size={18} className="text-gray-500" />
              <span>Create New Roadmap</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="space-y-1">
          <Link 
            to="/settings" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100/80 transition-colors"
          >
            <Settings size={18} className="text-gray-500" />
            <span>Settings</span>
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100/80 transition-colors"
          >
            <LogOut size={18} className="text-gray-500" />
            <span>Sign out</span>
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-500 px-4">
          © 2024 NextSkill™
        </div>
      </div>
    </aside>
  );
}

// Export fetchRoadmaps for external use
export { fetchRoadmaps as reloadSidebarRoadmaps };
