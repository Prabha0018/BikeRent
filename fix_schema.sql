-- First, let's create the vehicles table if it doesn't exist
CREATE TABLE IF NOT EXISTS vehicles (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    type text,
    description text,
    image_url text,
    price_per_day decimal(10,2),
    is_available boolean DEFAULT true,
    created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Drop the existing reservations table to recreate it with proper relationships
DROP TABLE IF EXISTS reservations;

-- Create the reservations table with a foreign key to vehicles
CREATE TABLE reservations (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner uuid REFERENCES auth.users(id),
    vehicle_id uuid REFERENCES vehicles(id),
    firstname text,
    lastname text,
    age integer,
    phone text,
    email text,
    address text,
    city text,
    zipcode text,
    car_type text,
    pick_place text,
    drop_place text,
    pick_date date,
    drop_date date,
    pick_time time,
    drop_time time,
    bike_type text,
    created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on vehicles
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for vehicles
CREATE POLICY "Anyone can view vehicles"
ON vehicles FOR SELECT
TO authenticated
USING (true);

-- Create RLS policies for reservations
CREATE POLICY "Users can insert their own reservations"
ON reservations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner);

CREATE POLICY "Users can view their own reservations"
ON reservations FOR SELECT
TO authenticated
USING (auth.uid() = owner);

CREATE POLICY "Users can delete their own reservations"
ON reservations FOR DELETE
TO authenticated
USING (auth.uid() = owner);

-- Insert some sample vehicles if they don't exist
INSERT INTO vehicles (name, type, description, price_per_day, is_available)
SELECT * FROM (
    VALUES 
    ('Classic 350', 'Cruiser', 'A classic motorcycle with modern features', 50.00, true),
    ('Himalayan', 'Adventure', 'Perfect for adventure touring', 65.00, true),
    ('Duke', 'Sport', 'High-performance street bike', 75.00, true),
    ('BMW 310', 'Sport', 'Premium entry-level motorcycle', 80.00, true),
    ('X-Pulse', 'Adventure', 'Versatile on/off-road motorcycle', 60.00, true),
    ('Hunter', 'Classic', 'Modern classic with retro styling', 55.00, true)
) AS v(name, type, description, price_per_day, is_available)
WHERE NOT EXISTS (
    SELECT 1 FROM vehicles WHERE vehicles.name = v.name
);

-- Update existing reservations to set bike_type from vehicles table
UPDATE reservations 
SET bike_type = vehicles.name 
FROM vehicles 
WHERE reservations.vehicle_id = vehicles.id;

-- Add not null constraint after data is migrated
ALTER TABLE reservations ALTER COLUMN bike_type SET NOT NULL;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON clients;
DROP POLICY IF EXISTS "Users can update their own profile" ON clients;
DROP POLICY IF EXISTS "Users can insert their own profile" ON clients;

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create the clients table if it doesn't exist
CREATE TABLE IF NOT EXISTS clients (
    id uuid PRIMARY KEY REFERENCES auth.users(id),
    email text NOT NULL,
    created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on clients table
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies for clients table
CREATE POLICY "Enable insert for authenticated users only"
ON clients FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id"
ON clients FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id"
ON clients FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 