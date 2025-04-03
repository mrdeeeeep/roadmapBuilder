import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { useToast } from '@/components/ui/use-toast';

export default function RoadmapDetail() {
  const { id } = useParams<{ id: string }>();
  interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    timeEstimate: number;
    order: number;
    resources: string[];
  }

  interface Roadmap {
    id: string;
    name: string;
    description: string;
    items: RoadmapItem[];
  }

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { data, error } = await supabase
          .from('roadmaps')
          .select(`
            id, 
            name, 
            description, 
            roadmap_items (
              id, 
              title, 
              description, 
              time_estimate, 
              step_order,
              roadmap_resources (url, title)
            )
          `)
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        // Transform the data to match the expected structure for RoadmapTimeline
        interface RoadmapItemRaw {
          id: string;
          title: string;
          description: string;
          time_estimate: number;
          step_order: number;
          roadmap_resources: { url: string; title: string }[];
        }

        const transformedItems = data.roadmap_items.map((item: RoadmapItemRaw) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          timeEstimate: item.time_estimate.toString(), // Convert to string
          order: item.step_order, // Updated to use "step_order"
          resources: item.roadmap_resources.map((resource) => resource.url),
        }));

        setRoadmap({
          id: data.id,
          name: data.name,
          description: data.description,
          items: transformedItems,
        });
      } catch (error) {
        console.error("Error fetching roadmap details:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch roadmap details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading roadmap...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Roadmap not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">{roadmap.name}</h1>
      <p className="text-gray-600">{roadmap.description}</p>
      <RoadmapTimeline items={roadmap.items} />
    </div>
  );
}
