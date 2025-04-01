import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb, Wand2 } from 'lucide-react';

const ACCENT_COLOR = '#F59E0B';

export function CreateRoadmapForm() {
  const [skillName, setSkillName] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!skillName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a skill name",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call the AI API to generate a roadmap
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Success!",
        description: "Your roadmap has been created",
      });
      
      // Redirect to roadmaps page
      navigate('/roadmaps');
    }, 2000);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-2 bg-white overflow-hidden">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              <Lightbulb className="text-white" size={24} />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Create a New Skill Roadmap
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Let AI help you create a personalized learning path
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="skill-name" className="text-sm font-medium text-gray-700">
                What skill would you like to learn?
              </label>
              <Input
                id="skill-name"
                placeholder="e.g., Machine Learning, Web Development, UX Design"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="bg-white border-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#F59E0B]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="additional-prompt" className="text-sm font-medium text-gray-700">
                Any specific requirements or focus areas? (Optional)
              </label>
              <Textarea
                id="additional-prompt"
                placeholder="Add details about your current level, goals, or specific areas you want to focus on..."
                value={additionalPrompt}
                onChange={(e) => setAdditionalPrompt(e.target.value)}
                className="bg-white border-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#F59E0B] min-h-[150px]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full text-white font-medium h-12 transition-all duration-300"
              style={{ backgroundColor: ACCENT_COLOR }}
              disabled={isLoading}
            >
              <Wand2 size={20} className="mr-2" />
              {isLoading ? "Generating Your Roadmap..." : "Generate My Learning Path"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
