
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  order: number;
  resources?: string[];
}

export interface Roadmap {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  items: RoadmapItem[];
}
