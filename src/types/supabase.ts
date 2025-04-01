export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      roadmaps: {
        Row: {
          id: string;
          name: string;
          description: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      roadmap_items: {
        Row: {
          id: string;
          roadmap_id: string;
          title: string;
          description: string;
          time_estimate: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          roadmap_id: string;
          title: string;
          description: string;
          time_estimate: string;
          order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          roadmap_id?: string;
          title?: string;
          description?: string;
          time_estimate?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      roadmap_resources: {
        Row: {
          id: string;
          roadmap_item_id: string;
          url: string;
          title: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          roadmap_item_id: string;
          url: string;
          title: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          roadmap_item_id?: string;
          url?: string;
          title?: string;
          created_at?: string;
        };
      };
    };
  };
} 