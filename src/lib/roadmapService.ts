import { supabase } from './supabase';
import type { GeneratedRoadmap } from './openai';
import type { Database } from '@/types/supabase';

type Roadmap = Database['public']['Tables']['roadmaps']['Row'];
type RoadmapItem = Database['public']['Tables']['roadmap_items']['Row'];
type RoadmapResource = Database['public']['Tables']['roadmap_resources']['Row'];

export async function createRoadmap(roadmapData: GeneratedRoadmap, userId: string) {
  try {
    // First, create the roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert({
        name: roadmapData.name,
        description: roadmapData.description,
        user_id: userId,
      })
      .select()
      .single();

    if (roadmapError) throw roadmapError;
    if (!roadmap) throw new Error('Failed to create roadmap');

    // Then, create all roadmap items
    const roadmapItems = roadmapData.items.map((item) => ({
      roadmap_id: roadmap.id,
      title: item.title,
      description: item.description,
      time_estimate: item.timeEstimate,
      order: item.order,
    }));

    const { data: items, error: itemsError } = await supabase
      .from('roadmap_items')
      .insert(roadmapItems)
      .select();

    if (itemsError) throw itemsError;
    if (!items) throw new Error('Failed to create roadmap items');

    // Finally, create resources for each item
    const resources = items.flatMap((item, index) =>
      roadmapData.items[index].resources.map((resource) => ({
        roadmap_item_id: item.id,
        title: resource,
        url: resource, // In this case, we're using the resource string as both title and URL
      }))
    );

    if (resources.length > 0) {
      const { error: resourcesError } = await supabase
        .from('roadmap_resources')
        .insert(resources);

      if (resourcesError) throw resourcesError;
    }

    return roadmap.id;
  } catch (error) {
    console.error('Error creating roadmap:', error);
    throw error;
  }
}

export async function getRoadmaps(userId: string) {
  const { data, error } = await supabase
    .from('roadmaps')
    .select(`
      *,
      roadmap_items (
        *,
        roadmap_resources (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getRoadmap(id: string) {
  const { data, error } = await supabase
    .from('roadmaps')
    .select(`
      *,
      roadmap_items (
        *,
        roadmap_resources (*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateRoadmap(id: string, updates: Partial<Roadmap>) {
  const { data, error } = await supabase
    .from('roadmaps')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRoadmap(id: string) {
  const { error } = await supabase
    .from('roadmaps')
    .delete()
    .eq('id', id);

  if (error) throw error;
} 