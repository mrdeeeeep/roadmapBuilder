
import { CreateRoadmapForm } from '@/components/CreateRoadmapForm';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function Create() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-app-gray-900 mb-2 inline-flex items-center gap-3">
          <Sparkles className="text-app-blue h-5 w-5" />
          <span>Create Your Skill Roadmap</span>
        </h1>
        <p className="text-app-gray-600 max-w-2xl mx-auto">
          Enter a skill you want to master and our AI will generate a personalized learning roadmap with specific steps, resources, and timelines.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <div className="flex items-center gap-2 bg-app-gray-100 px-4 py-1.5 rounded-full">
            <ChevronRight size={14} className="text-app-blue" />
            <span className="text-sm text-app-gray-700">Step-by-step guide</span>
          </div>
          <div className="flex items-center gap-2 bg-app-gray-100 px-4 py-1.5 rounded-full">
            <ChevronRight size={14} className="text-app-blue" />
            <span className="text-sm text-app-gray-700">Custom timelines</span>
          </div>
          <div className="flex items-center gap-2 bg-app-gray-100 px-4 py-1.5 rounded-full">
            <ChevronRight size={14} className="text-app-blue" />
            <span className="text-sm text-app-gray-700">Learning resources</span>
          </div>
        </div>
      </div>
      
      <div className="app-card p-6">
        <CreateRoadmapForm />
      </div>
    </div>
  );
}
