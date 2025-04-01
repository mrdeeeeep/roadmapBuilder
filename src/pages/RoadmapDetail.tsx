import { useParams } from 'react-router-dom';
import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { dummyRoadmaps } from '@/data/roadmaps';
import { Roadmap } from '@/types/roadmap';
import { useEffect, useState } from 'react';

export default function RoadmapDetail() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  
  useEffect(() => {
    // First check dummy roadmaps
    const dummyRoadmap = dummyRoadmaps.find(r => r.id === id);
    if (dummyRoadmap) {
      setRoadmap(dummyRoadmap);
      return;
    }
    
    // Then check localStorage for generated roadmaps
    const storedRoadmaps = JSON.parse(localStorage.getItem('roadmaps') || '[]');
    const generatedRoadmap = storedRoadmaps.find((r: Roadmap) => r.id === id);
    if (generatedRoadmap) {
      setRoadmap(generatedRoadmap);
    }
  }, [id]);
  
  if (!roadmap) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">Roadmap not found</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{roadmap.name}</h1>
        <p className="text-gray-600">{roadmap.description}</p>
      </div>
      
      <RoadmapTimeline items={roadmap.items} />
    </div>
  );
}
