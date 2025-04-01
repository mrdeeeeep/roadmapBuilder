import { Roadmap } from '@/types/roadmap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Brain, Rocket, Lightbulb, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoadmapCardProps {
  roadmap: Roadmap;
  index: number;
}

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B'];
const ICONS = [BookOpen, Code, Brain, Rocket, Lightbulb];

export function RoadmapCard({ roadmap, index }: RoadmapCardProps) {
  const totalSteps = roadmap.items.length;
  const colorIndex = index % COLORS.length;
  const IconComponent = ICONS[index % ICONS.length];
  
  return (
    <Link to={`/roadmap/${roadmap.id}`}>
      <Card className="h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white border-2 group">
        <CardHeader className="relative pb-8">
          <div 
            className="absolute right-6 top-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: COLORS[colorIndex] }}
          >
            <IconComponent size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {roadmap.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4 line-clamp-2">{roadmap.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock size={16} style={{ color: COLORS[colorIndex] }} />
            <span className="font-medium">{totalSteps} steps</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
