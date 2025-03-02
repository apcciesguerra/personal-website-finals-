-- Create suggestions table if it doesn't exist
CREATE TABLE IF NOT EXISTS suggestions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  important BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY insert_policy ON suggestions 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all suggestions
CREATE POLICY read_policy ON suggestions 
  FOR SELECT 
  TO authenticated 
  USING (true); 