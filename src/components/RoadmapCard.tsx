
import { Roadmap } from '@/types/roadmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoadmapCardProps {
  roadmap: Roadmap;
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const totalSteps = roadmap.items.length;
  
  return (
    <Link to={`/roadmap/${roadmap.id}`}>
      <Card className="h-full cursor-pointer hover:bg-nextskill-light-gray transition-colors border-nextskill-light-gray bg-nextskill-darker-gray animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <FileText size={20} className="text-nextskill-orange" />
            {roadmap.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-2">{roadmap.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{totalSteps} steps</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
