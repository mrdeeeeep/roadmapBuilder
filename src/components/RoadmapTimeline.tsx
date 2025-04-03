import { RoadmapItem } from '@/types/roadmap';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface RoadmapTimelineProps {
  items: RoadmapItem[];
}

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B']; // Base colors
const LIGHT_COLORS = ['#FEE2E2', '#DBEAFE', '#FEF3C7']; // Lighter versions of the colors

export function RoadmapTimeline({ items }: RoadmapTimelineProps) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-12 relative px-8 py-8">
      <div className="absolute left-[47px] top-[72px] bottom-8 w-0.5 bg-gray-200" />
      
      {sortedItems.map((item, index) => {
        const colorIndex = index % COLORS.length;

        return (
          <div 
            key={item.id} 
            className="relative pl-16 transition-all duration-300 hover:translate-x-2"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div 
              className="absolute left-0 top-0 w-[40px] h-[40px] rounded-full flex items-center justify-center text-lg font-medium z-10 transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: COLORS[colorIndex] }}
            >
              <span className="text-white">{item.order}</span>
            </div>
            
            <div 
              className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300" // Added rounded-2xl for rounded corners
              style={{
                backgroundColor: LIGHT_COLORS[colorIndex], // Use lighter color for the tile background
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                <ArrowRight size={20} className="text-gray-400" />
              </div>
              
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} style={{ color: COLORS[colorIndex] }} />
                <span className="font-medium">Estimated time: {item.timeEstimate}</span>
              </div>

              {item.subtasks && item.subtasks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-2">
                    Subtasks
                  </h4>
                  <ul className="space-y-2">
                    {item.subtasks.map((subtask, i) => (
                      <li key={i} className="text-gray-600 text-sm">
                        - {subtask.title} ({subtask.timeEstimate})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.resources && item.resources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <BookOpen size={16} style={{ color: COLORS[colorIndex] }} />
                    Learning Resources
                  </h4>
                  <ul className="space-y-2">
                    {item.resources.map((resource, i) => (
                      <li 
                        key={i}
                        className="text-gray-600 text-sm flex items-center gap-2 hover:text-gray-700 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[colorIndex] }} />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}