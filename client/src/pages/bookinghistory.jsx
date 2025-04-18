import { useEffect, useState } from 'react'
import Accountbar from '../Components/Navbarcomponents/Accountbar'
import Footer from "../Components/Bodycomponents/Footer"
import LinearColor from '../Components/Bodycomponents/linearprogress';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { supabaseService } from '../services/supabaseService';

// Import bike images
import audi from "../Components/images/audi.jpg";
import toyota from "../Components/images/toyota.jpg";
import bmw from "../Components/images/bmw.jpg";
import passat from "../Components/images/passat.jpg";
import benz from "../Components/images/benz.jpg";
import golf from "../Components/images/golf.jpg";

export default function Booking(){
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const getImageForVehicle = (name) => {
        const imageMap = {
            'Classic 350': audi,
            'Himalayan': golf,
            'Duke': toyota,
            'BMW 310': bmw,
            'X-Pulse': benz,
            'Hunter': passat
        };
        return imageMap[name] || audi;
    };

    useEffect(() => {
        checkUser();
        fetchBookings();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/login');
        }
        setLoading(false);
    };

    const fetchBookings = async () => {
        try {
            const data = await supabaseService.getMyReservations();
            console.log('Fetched bookings:', data); // Debug log
            setBookings(data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
            alert('Error fetching bookings. Please try again later.');
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            await supabaseService.cancelReservation(bookingId);
            fetchBookings();
            alert('Booking cancelled successfully');
        } catch (error) {
            console.error('Error cancelling booking:', error.message);
            alert('Error cancelling booking. Please try again later.');
        }
    };

    return(
        <>
        {loading && <LinearColor/>}
        {!loading && 
            <div className="">
            <Accountbar/>
            <div className="container mx-auto py-4 flex justify-center md:justify-start">
                <h2 className="text-xl font-semibold italic">Booking History</h2>
            </div>
            <div className="flex flex-col min-h-screen">
            <div className="flex-grow container mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
                {bookings?.map((booking) => {
                    const vehicleImage = booking.vehicles ? getImageForVehicle(booking.vehicles.name) : audi;
                    return (
                    <div key={booking.id} className="text-center z-30 shadow-xl py-4 px-4 rounded-lg">
                        <div className="mb-4">
                            <img 
                                src={vehicleImage}
                                alt={booking.vehicles?.name || 'Vehicle'} 
                                className="w-full h-48 object-contain rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold italic text-xl text-orange">
                                {booking.car_type || booking.vehicles?.name || 'Vehicle Not Found'}
                            </h3>
                            <p className="font-semibold italic text-base text-gray-600">
                                Type: {booking.vehicles?.type || 'N/A'}
                            </p>
                            <p className="font-semibold italic text-base text-gray-600">
                                Price: ${booking.vehicles?.price_per_day || '0'}/day
                            </p>
                        </div>
                        <div className="border-t border-b py-4 my-4">
                            <p className="font-semibold italic text-base">
                                {booking.firstname} {booking.lastname}
                            </p>
                            <p className="font-semibold italic text-base">
                                {booking.email}
                            </p>
                            <p className="font-semibold italic text-base">
                                {booking.phone}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-semibold italic text-base">
                                <span className="text-gray-600">Dates:</span> {booking.pick_date} - {booking.drop_date}
                            </p>
                            <p className="font-semibold italic text-base">
                                <span className="text-gray-600">Times:</span> {booking.pick_time} - {booking.drop_time}
                            </p>
                            <p className="font-semibold italic text-base">
                                <span className="text-gray-600">Location:</span> {booking.pick_place} - {booking.drop_place}
                            </p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="bg-orange rounded opacity-90 hover:opacity-100 px-6 py-2 text-white text-base font-bold transition-all duration-300"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                    );
                })}
            </div>
            </div>
            <Footer/>
            </div>
            </div>}
        </>
    )
}