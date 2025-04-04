import { useState, useEffect } from 'react';
import { RoadmapCard } from '@/components/RoadmapCard';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { reloadSidebarRoadmaps } from '@/components/Sidebar';

export default function Roadmaps() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData.session) {
          throw new Error("Unable to fetch user session. Please log in again.");
        }
        const userId = sessionData.session.user.id;

        const { data, error } = await supabase
          .from('roadmaps')
          .select(`
            id,
            name,
            description,
            roadmap_items (id)
          `)
          .eq('user_id', userId);

        if (error) {
          throw new Error(error.message);
        }

        // Count the number of steps for each roadmap
        const roadmapsWithStepCount = data.map((roadmap) => ({
          ...roadmap,
          stepCount: roadmap.roadmap_items?.length || 0, // Count the steps
        }));

        console.log('Fetched roadmaps with step counts:', roadmapsWithStepCount); // Debugging log
        setRoadmaps(roadmapsWithStepCount || []);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch roadmaps",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [toast]);

  const handleDelete = (id: string) => {
    setRoadmaps((prevRoadmaps) => prevRoadmaps.filter((roadmap) => roadmap.id !== id));
    // Reload the sidebar roadmaps
    reloadSidebarRoadmaps();
  };

  const filteredRoadmaps = roadmaps.filter(roadmap =>
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
          className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white font-medium px-6 rounded-full"
        >
          <Plus size={20} className="mr-2" />
          Create New Roadmap
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading roadmaps...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap, index) => (
            <RoadmapCard
              key={roadmap.id}
              roadmap={{ ...roadmap, stepCount: roadmap.stepCount }} // Pass step count to the card
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && filteredRoadmaps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No roadmaps found matching your search.</p>
        </div>
      )}
    </div>
  );
}
