import { useState } from 'react';
import { dummyRoadmaps } from '@/data/roadmaps';
import { RoadmapCard } from '@/components/RoadmapCard';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

export default function Roadmaps() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRoadmaps = dummyRoadmaps.filter(roadmap => 
    roadmap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search roadmaps..."
            className="pl-10 bg-white border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={() => navigate('/create')}
          className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white font-medium px-6"
        >
          <Plus size={20} className="mr-2" />
          Create New Roadmap
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map((roadmap, index) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
        ))}
      </div>
      
      {filteredRoadmaps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No roadmaps found matching your search.</p>
        </div>
      )}
    </div>
  );
}
