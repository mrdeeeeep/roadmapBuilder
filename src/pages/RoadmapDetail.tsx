
import { useParams, useNavigate } from 'react-router-dom';
import { dummyRoadmaps } from '@/data/roadmaps';
import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export default function RoadmapDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const roadmap = dummyRoadmaps.find(r => r.id === id);
  
  if (!roadmap) {
    return (
      <div className="text-center py-12 max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold text-app-gray-900 mb-4">Roadmap not found</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/roadmaps')}
          className="border-app-blue text-app-blue hover:bg-app-blue/10"
        >
          Back to Roadmaps
        </Button>
      </div>
    );
  }
  
  const totalSteps = roadmap.items.length;
  const dateCreated = new Date(roadmap.createdAt).toLocaleDateString();
  
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Button 
        variant="ghost" 
        className="text-app-gray-600 hover:text-app-gray-900 hover:bg-app-gray-100 mb-4"
        onClick={() => navigate('/roadmaps')}
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Roadmaps
      </Button>
      
      <div className="bg-white border border-app-gray-200 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-app-gray-900 mb-2">{roadmap.name}</h1>
        <p className="text-app-gray-600 mb-4">{roadmap.description}</p>
        
        <div className="flex gap-4 text-sm text-app-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-app-blue" />
            <span>Created: {dateCreated}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-app-blue" />
            <span>{totalSteps} steps</span>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-app-gray-900 mb-6">Learning Path</h2>
          <RoadmapTimeline items={roadmap.items} />
        </div>
      </div>
    </div>
  );
}
