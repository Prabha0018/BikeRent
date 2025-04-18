import React, { useState, useContext, useEffect } from 'react';
import { supabaseService } from '../../services/supabaseService';
import { UserContext } from '../../Context/Clientcontext';
import { useNavigate } from 'react-router-dom';

export default function BookingForm({ selectedCar, onClose, initialSearchParams }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        zipcode: '',
        bike_type: selectedCar.name,
        vehicle_id: selectedCar.id,
        pick_place: initialSearchParams?.pickPlace || '',
        drop_place: initialSearchParams?.dropPlace || '',
        pick_date: initialSearchParams?.pickDate || '',
        drop_date: initialSearchParams?.dropDate || '',
        pick_time: '',
        drop_time: ''
    });

    useEffect(() => {
        if (user) {
            // Pre-fill email if user is logged in
            setFormData(prev => ({
                ...prev,
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                alert('Please log in to make a reservation');
                navigate('/login');
                return;
            }

            // Convert date and time strings to proper format
            const formattedData = {
                ...formData,
                age: parseInt(formData.age),
                vehicle_id: selectedCar.id,
                bike_type: selectedCar.name
            };

            await supabaseService.createReservation(formattedData);
            alert('Bike reservation created successfully!');
            onClose();
            navigate('/account/bookings');
        } catch (error) {
            console.error('Reservation error:', error);
            alert('Error creating reservation: ' + error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Book {selectedCar.name} Bike</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                
                <div className="mb-6">
                    <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-48 object-contain"/>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="18"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
                            <input
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pick-up Place</label>
                            <input
                                type="text"
                                name="pick_place"
                                value={formData.pick_place}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Drop-off Place</label>
                            <input
                                type="text"
                                name="drop_place"
                                value={formData.drop_place}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                            <input
                                type="date"
                                name="pick_date"
                                value={formData.pick_date}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Drop-off Date</label>
                            <input
                                type="date"
                                name="drop_date"
                                value={formData.drop_date}
                                onChange={handleChange}
                                required
                                min={formData.pick_date}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pick-up Time</label>
                            <input
                                type="time"
                                name="pick_time"
                                value={formData.pick_time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Drop-off Time</label>
                            <input
                                type="time"
                                name="drop_time"
                                value={formData.drop_time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange focus:ring-orange"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange text-white rounded-md hover:bg-orange-dark"
                        >
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 