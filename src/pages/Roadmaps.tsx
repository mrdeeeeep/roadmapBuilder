
import { useState } from 'react';
import { dummyRoadmaps } from '@/data/roadmaps';
import { RoadmapList } from '@/components/RoadmapList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Roadmaps() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-semibold text-app-gray-900">My Roadmaps</h1>
        
        <Button 
          onClick={() => navigate('/create')}
          className="bg-app-blue hover:bg-app-blue/90"
        >
          <Plus size={18} className="mr-1" />
          Create
        </Button>
      </div>
      
      <div className="app-card p-6">
        <RoadmapList roadmaps={dummyRoadmaps} />
      </div>
    </div>
  );
}
