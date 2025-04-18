-- Enable RLS on all tables
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Reservations policies
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

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Vehicles policies
CREATE POLICY "Anyone can view vehicles"
ON vehicles FOR SELECT
TO authenticated
USING (true); 