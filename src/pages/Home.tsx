
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dummyRoadmaps } from '@/data/roadmaps';

export default function Home() {
  const navigate = useNavigate();
  const featuredRoadmaps = dummyRoadmaps.slice(0, 3);
  
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <h1 className="text-4xl font-bold text-app-gray-900">Master New Skills with Personalized Learning Paths</h1>
        <p className="text-app-gray-600 max-w-2xl mx-auto text-lg">
          NextSkill helps you create structured learning roadmaps to achieve your goals faster and track your progress along the way.
        </p>
        
        <div className="flex justify-center gap-4 pt-4">
          <Button 
            onClick={() => navigate('/create')} 
            className="bg-app-blue hover:bg-app-blue/90"
          >
            Create Roadmap
          </Button>
          <Button 
            onClick={() => navigate('/roadmaps')} 
            className="bg-transparent border border-app-gray-300 text-app-gray-800 hover:bg-app-gray-100"
          >
            Browse Roadmaps
          </Button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-app-gray-900">Why NextSkill?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-app-gray-200 rounded-lg">
            <Sparkles className="h-10 w-10 text-app-blue mb-4" />
            <h3 className="text-lg font-medium text-app-gray-900 mb-2">AI-Powered Roadmaps</h3>
            <p className="text-app-gray-600">Generate personalized learning paths based on your goals and experience level.</p>
          </div>
          
          <div className="p-6 bg-white border border-app-gray-200 rounded-lg">
            <FileText className="h-10 w-10 text-app-blue mb-4" />
            <h3 className="text-lg font-medium text-app-gray-900 mb-2">Structured Learning</h3>
            <p className="text-app-gray-600">Follow step-by-step guides with curated resources to master any skill efficiently.</p>
          </div>
          
          <div className="p-6 bg-white border border-app-gray-200 rounded-lg">
            <ChevronRight className="h-10 w-10 text-app-blue mb-4" />
            <h3 className="text-lg font-medium text-app-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-app-gray-600">Monitor your achievements and stay motivated with visual progress indicators.</p>
          </div>
        </div>
      </div>
      
      {/* Featured Roadmaps */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-app-gray-900">Featured Roadmaps</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/roadmaps')}
            className="text-app-blue hover:bg-app-blue/10"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRoadmaps.map(roadmap => (
            <div 
              key={roadmap.id} 
              className="p-6 bg-white border border-app-gray-200 rounded-lg cursor-pointer hover:border-app-blue transition-colors"
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
            >
              <h3 className="text-lg font-medium text-app-gray-900 mb-2">{roadmap.name}</h3>
              <p className="text-app-gray-600 text-sm mb-4">{roadmap.description}</p>
              <div className="flex items-center text-app-blue text-sm">
                <span>View Roadmap</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
