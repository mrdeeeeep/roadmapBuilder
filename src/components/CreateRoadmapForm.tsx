import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb, Wand2 } from 'lucide-react';
import { generateRoadmap } from '@/lib/openai';
import { supabase } from '@/lib/supabase'; // Ensure Supabase client is imported
import { reloadSidebarRoadmaps } from '@/components/Sidebar';
import styled from 'styled-components';

const ACCENT_COLOR = '#F59E0B';

const Loader = ({ text }: { text: string }) => {
  return (
    <StyledWrapper>
      <div className="loader" />
      <p className="loader-text">{text}</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;

  .loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
  }

  .loader:before {
    content: '';
    width: 48px;
    height: 5px;
    background: #f0808050;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }

  .loader:after {
    content: '';
    width: 100%;
    height: 100%;
    background: #f08080;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 3px;
    }

    25% {
      transform: translateY(9px) rotate(22.5deg);
    }

    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }

    75% {
      transform: translateY(9px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }

  .loader-text {
    margin-top: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: #333;
    animation: fadeText 1.5s infinite;
  }

  @keyframes fadeText {
     0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export function CreateRoadmapForm() {
  const [skillName, setSkillName] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Creating...');

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText((prev) => (prev === 'Creating...' ? 'Almost there...' : 'Creating...'));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skillName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a skill name',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get the authenticated user's session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("Error fetching session:", sessionError);
        throw new Error("Unable to fetch user session. Please log in again.");
      }
      const user = sessionData.session.user;

      // Ensure the user exists in the "users" table
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError && userError.code === 'PGRST116') {
        // User does not exist, insert the user
        const { error: insertUserError } = await supabase.from('users').insert({
          id: user.id,
          email: user.email,
        });

        if (insertUserError) {
          console.error("Error inserting user:", insertUserError);
          throw new Error("Failed to insert user into the database.");
        }
      } else if (userError) {
        console.error("Error fetching user:", userError);
        throw new Error("Failed to fetch user from the database.");
      }

      const roadmap = await generateRoadmap(skillName, additionalPrompt);

      console.log('Roadmap to save:', roadmap); // Debugging log
      
      // Save the roadmap to Supabase
      const { data: roadmapData, error: roadmapError } = await supabase.from('roadmaps').insert({
        id: roadmap.id,
        name: roadmap.name,
        description: roadmap.description,
        user_id: user.id, // Use the fetched user ID
        total_time: roadmap.totalTime, // Save total time
      }).select().single();

      if (roadmapError) {
        console.error("Error inserting roadmap:", roadmapError);
        throw new Error(roadmapError.message);
      }

      console.log('Saved roadmap data:', roadmapData); // Debugging log

      // Save roadmap items
      for (const item of roadmap.items) {
        const { data: itemData, error: itemError } = await supabase.from('roadmap_items').insert({
          id: item.id,
          roadmap_id: roadmapData.id,
          title: item.title,
          description: item.description,
          time_estimate: item.timeEstimate,
          step_order: item.order, // Updated to match the new column name
        }).select().single();

        if (itemError) {
          console.error("Error inserting roadmap item:", itemError);
          throw new Error(itemError.message);
        }

        console.log('Saved roadmap item:', itemData); // Debugging log

        // Save resources for each item
        for (const resource of item.resources) {
          const { error: resourceError } = await supabase.from('roadmap_resources').insert({
            roadmap_item_id: itemData.id,
            url: resource,
            title: resource, // Assuming the resource title is the same as the URL for now
          });

          if (resourceError) {
            console.error("Error inserting roadmap resource:", resourceError);
            throw new Error(resourceError.message);
          }
        }
      }

      toast({
        title: "Success!",
        description: "Your roadmap has been created and saved to the database.",
      });

      // Reload the sidebar roadmaps
      reloadSidebarRoadmaps();

      // Redirect to the new roadmap
      navigate(`/roadmap/${roadmap.id}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save roadmap",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      {isLoading && <Loader text={loadingText} />}
      <Card className={`border-2 bg-white overflow-hidden ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
        <CardHeader className="space-y-4 pb-6 relative">
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
                disabled={isLoading}
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
                disabled={isLoading}
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
