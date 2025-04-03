-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create the roadmap_items table
CREATE TABLE IF NOT EXISTS roadmap_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  time_estimate TEXT NOT NULL,
  step_order INT NOT NULL, -- Renamed from "order" to "step_order"
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create the roadmap_resources table
CREATE TABLE IF NOT EXISTS roadmap_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_item_id UUID REFERENCES roadmap_items(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Delete all data from the tables
DELETE FROM roadmap_resources;
DELETE FROM roadmap_items;
DELETE FROM roadmaps;
DELETE FROM users;

-- Optional: Drop all tables if you want a clean slate
-- DROP TABLE IF EXISTS roadmap_resources;
-- DROP TABLE IF EXISTS roadmap_items;
-- DROP TABLE IF EXISTS roadmaps;
-- DROP TABLE IF EXISTS users;