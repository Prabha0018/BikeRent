import { supabase } from '../config/supabaseClient'

export const supabaseService = {
    // Auth functions
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) throw error
        return data
    },

    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        if (error) throw error
        return data
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        return user
    },

    // Profile functions
    async getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
        if (error) throw error
        return data
    },

    async updateProfile(userId, updates) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
        if (error) throw error
        return data
    },

    async createProfile(userId, profileData) {
        const { data, error } = await supabase
            .from('profiles')
            .insert([{ id: userId, ...profileData }])
        if (error) throw error
        return data
    },

    // Reservation functions
    async createReservation(reservationData) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        // First get the vehicle details
        const { data: vehicleData, error: vehicleError } = await supabase
            .from('vehicles')
            .select('*')
            .eq('name', reservationData.bike_type)
            .single()

        if (vehicleError) throw new Error('Vehicle not found')

        const { data, error } = await supabase
            .from('reservations')
            .insert([{
                owner: user.id,
                vehicle_id: vehicleData.id,
                bike_type: reservationData.bike_type,
                firstname: reservationData.first_name,
                lastname: reservationData.last_name,
                phone: reservationData.phone,
                email: reservationData.email,
                age: reservationData.age,
                address: reservationData.address,
                city: reservationData.city,
                zipcode: reservationData.zipcode,
                pick_place: reservationData.pick_place,
                drop_place: reservationData.drop_place,
                pick_date: reservationData.pick_date,
                drop_date: reservationData.drop_date,
                pick_time: reservationData.pick_time,
                drop_time: reservationData.drop_time,
                created_at: new Date().toISOString()
            }])
            .select()
        if (error) throw error
        return data[0]
    },

    async getMyReservations() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        const { data, error } = await supabase
            .from('reservations')
            .select(`
                *,
                vehicles (
                    id,
                    name,
                    type,
                    price_per_day
                )
            `)
            .eq('owner', user.id)
            .order('created_at', { ascending: false })

        if (error) throw error

        // Map the vehicle images
        const mappedData = data.map(booking => ({
            ...booking,
            vehicles: booking.vehicles ? {
                ...booking.vehicles,
                image_url: this.getImageForVehicle(booking.vehicles.name)
            } : null
        }));

        return mappedData
    },

    // Helper function to map vehicle names to images
    getImageForVehicle(name) {
        const imageMap = {
            'Classic 350': '/src/Components/images/audi.jpg',
            'Himalayan': '/src/Components/images/golf.jpg',
            'Duke': '/src/Components/images/toyota.jpg',
            'BMW 310': '/src/Components/images/bmw.jpg',
            'X-Pulse': '/src/Components/images/benz.jpg',
            'Hunter': '/src/Components/images/passat.jpg'
        };
        return imageMap[name] || '/src/Components/images/audi.jpg';
    },

    async cancelReservation(reservationId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        const { error } = await supabase
            .from('reservations')
            .delete()
            .eq('id', reservationId)
            .eq('owner', user.id)
        if (error) throw error
    },

    // Vehicle functions
    async getVehicles() {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
        if (error) throw error
        return data
    },

    async getVehicleById(id) {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    }
} 