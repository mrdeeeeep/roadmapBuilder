
import { RoadmapItem } from '@/types/roadmap';
import { Clock, BookOpen } from 'lucide-react';

interface RoadmapTimelineProps {
  items: RoadmapItem[];
}

export function RoadmapTimeline({ items }: RoadmapTimelineProps) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  
  return (
    <div className="space-y-8 ml-8 relative">
      {sortedItems.map((item, index) => (
        <div key={item.id} className="roadmap-item pl-14 pb-8 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
          <div className="roadmap-connector" />
          <div className="absolute left-0 top-0 w-[40px] h-[40px] rounded-full bg-app-blue text-white flex items-center justify-center text-lg font-medium z-10">
            {item.order}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-app-gray-900">{item.title}</h3>
            <p className="text-app-gray-600">{item.description}</p>
            
            <div className="flex items-center gap-2 text-sm text-app-gray-500">
              <Clock size={16} className="text-app-blue" />
              <span>Estimated time: {item.timeEstimate}</span>
            </div>
            
            {item.resources && item.resources.length > 0 && (
              <div className="space-y-1 mt-2">
                <h4 className="text-sm font-medium text-app-gray-800 flex items-center gap-2">
                  <BookOpen size={16} className="text-app-blue" />
                  Resources
                </h4>
                <ul className="space-y-1 pl-5 list-disc text-app-gray-600 text-sm">
                  {item.resources.map((resource, i) => (
                    <li key={i}>{resource}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
