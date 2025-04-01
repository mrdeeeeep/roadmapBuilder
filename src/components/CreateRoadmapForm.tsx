
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb } from 'lucide-react';

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
    <Card className="border-nextskill-light-gray bg-nextskill-darker-gray w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Lightbulb className="text-nextskill-orange" size={20} />
          Create a New Skill Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="skill-name" className="text-white font-medium">
              Skill Name
            </label>
            <Input
              id="skill-name"
              placeholder="e.g., Machine Learning, Web Development, UX Design"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="bg-nextskill-light-gray border-nextskill-light-gray focus:border-nextskill-orange"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="additional-prompt" className="text-white font-medium">
              Additional Details (Optional)
            </label>
            <Textarea
              id="additional-prompt"
              placeholder="Add any specific requirements or focus areas for your roadmap..."
              value={additionalPrompt}
              onChange={(e) => setAdditionalPrompt(e.target.value)}
              className="bg-nextskill-light-gray border-nextskill-light-gray focus:border-nextskill-orange min-h-[150px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-nextskill-orange hover:bg-nextskill-orange/90"
            disabled={isLoading}
          >
            {isLoading ? "Generating Roadmap..." : "Generate Roadmap"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
