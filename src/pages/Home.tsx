import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dummyRoadmaps } from '@/data/roadmaps';

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B']; // App colors

export default function Home() {
  const navigate = useNavigate();
  const featuredRoadmaps = dummyRoadmaps.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-r from-[#EF4444] via-[#3B82F6] to-[#F59E0B] text-white rounded-2xl shadow-lg">
        <h1 className="text-5xl font-extrabold">Master New Skills with Personalized Learning Paths</h1>
        <p className="max-w-3xl mx-auto text-lg font-medium">
          NextSkill helps you create structured learning roadmaps to achieve your goals faster and track your progress along the way.
        </p>
        <div className="flex justify-center gap-6 pt-6">
          <Button
            onClick={() => navigate('/create')}
            className="bg-white text-[#3B82F6] font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
          >
            Create Roadmap
          </Button>
          <Button
            onClick={() => navigate('/roadmaps')}
            className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#3B82F6]"
          >
            Browse Roadmaps
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Why NextSkill?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#FEE2E2] rounded-2xl shadow-md text-center">
            <Sparkles className="h-16 w-16 text-[#EF4444] mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">AI-Powered Roadmaps</h3>
            <p className="text-gray-600">Generate personalized learning paths based on your goals and experience level.</p>
          </div>
          <div className="p-8 bg-[#DBEAFE] rounded-2xl shadow-md text-center">
            <FileText className="h-16 w-16 text-[#3B82F6] mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Structured Learning</h3>
            <p className="text-gray-600">Follow step-by-step guides with curated resources to master any skill efficiently.</p>
          </div>
          <div className="p-8 bg-[#FEF3C7] rounded-2xl shadow-md text-center">
            <ChevronRight className="h-16 w-16 text-[#F59E0B] mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your achievements and stay motivated with visual progress indicators.</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}
