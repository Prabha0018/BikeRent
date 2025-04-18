-- Drop existing table if it exists
DROP TABLE IF EXISTS reservations;

-- Create reservations table with correct column names
CREATE TABLE reservations (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner uuid REFERENCES auth.users(id),
    firstname text,
    lastname text,
    age integer,
    phone text,
    email text,
    address text,
    city text,
    zipcode text,
    car_type text,  -- Changed from carType to car_type (SQL convention)
    pick_place text, -- Changed from pickPlace
    drop_place text, -- Changed from dropPlace
    pick_date date,  -- Changed from pickDate
    drop_date date,  -- Changed from dropDate
    pick_time time,  -- Changed from pickTime
    drop_time time,  -- Changed from dropTime
    created_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Recreate policies
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