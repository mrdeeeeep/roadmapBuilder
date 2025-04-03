import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Brain, Rocket, Lightbulb, Clock, Trash } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface RoadmapCardProps {
  roadmap: {
    id: string;
    name: string;
    description: string;
    items?: { id: string; title: string }[]; // Optional items array
  };
  index: number;
  onDelete: (id: string) => void; // Callback to update the roadmap list after deletion
}

const COLORS = ['#EF4444', '#3B82F6', '#F59E0B'];
const ICONS = [BookOpen, Code, Brain, Rocket, Lightbulb];
const LIGHT_COLORS = ['#FEE2E2', '#DBEAFE', '#FEF3C7']; // Lighter versions of the colors

export function RoadmapCard({ roadmap, index, onDelete }: RoadmapCardProps) {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('roadmaps').delete().eq('id', roadmap.id);
      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Deleted",
        description: `Roadmap "${roadmap.name}" has been deleted.`,
      });

      onDelete(roadmap.id); // Notify parent to update the roadmap list
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete roadmap.",
        variant: "destructive",
      });
    } finally {
      setShowConfirmDialog(false); // Close the confirmation dialog
    }
  };

  const colorIndex = index % COLORS.length;
  const IconComponent = ICONS[index % ICONS.length];

  return (
    <div className="relative">
      <Link to={`/roadmap/${roadmap.id}`}>
        <Card
          className="h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] group rounded-2xl" // Added rounded-2xl for rounded corners
          style={{ backgroundColor: LIGHT_COLORS[colorIndex] }} // Use lighter color for the tile background
        >
          <CardHeader className="relative pb-8">
            <div
              className="absolute left-4 top-4 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: COLORS[colorIndex] }}
            >
              <IconComponent size={32} className="text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 ml-20">
              {roadmap.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 line-clamp-2">{roadmap.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={16} style={{ color: COLORS[colorIndex] }} />
              <span className="font-medium">
                {roadmap.stepCount > 0 ? `${roadmap.stepCount} steps` : 'No steps available'}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
      <button
        onClick={() => setShowConfirmDialog(true)}
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:opacity-90 transition-colors"
        style={{ backgroundColor: COLORS[colorIndex] }} // Match delete button color to the tile's associated color
        title="Delete Roadmap"
      >
        <Trash size={16} />
      </button>

      {/* Styled Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the roadmap <span className="font-semibold">{roadmap.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: COLORS[colorIndex] }} // Match delete button color to the tile's associated color
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
