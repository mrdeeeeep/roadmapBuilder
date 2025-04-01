
import { RoadmapCard } from '@/components/RoadmapCard';
import { Roadmap } from '@/types/roadmap';

interface RoadmapListProps {
  roadmaps: Roadmap[];
}

export function RoadmapList({ roadmaps }: RoadmapListProps) {
  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No roadmaps found. Create your first roadmap!</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
