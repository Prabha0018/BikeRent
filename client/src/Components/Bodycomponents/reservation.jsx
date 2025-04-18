import React, { useState, useEffect } from 'react';
import audi from "../images/audi.jpg";
import toyota from "../images/toyota.jpg";
import bmw from "../images/bmw.jpg";
import passat from "../images/passat.jpg";
import benz from "../images/benz.jpg";
import golf from "../images/golf.jpg";
import BookingForm from './BookingForm';
import { supabase } from '../../config/supabaseClient';

export default function Reservationbox({ initialSearchParams }) {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        if (initialSearchParams && vehicles.length > 0) {
            const selectedVehicle = vehicles.find(v => v.name === initialSearchParams.carType);
            if (selectedVehicle) {
                setSelectedcar(selectedVehicle.name);
                setSelectedimage(selectedVehicle.image);
                setSelectedcardata(selectedVehicle.data);
            }
        }
    }, [initialSearchParams, vehicles]);

    const fetchVehicles = async () => {
        try {
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .order('name');
            
            if (error) throw error;
            
            const vehiclesWithImages = data.map(vehicle => ({
                id: vehicle.id,
                name: vehicle.name,
                image: getImageForVehicle(vehicle.name),
                data: {
                    model: vehicle.name,
                    mark: vehicle.type,
                    year: "2023",
                    doors: "150-200 kg",
                    transmission: "5-6 speed",
                    fuel: "Petrol"
                }
            }));
            
            setVehicles(vehiclesWithImages);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const getImageForVehicle = (name) => {
        // Map vehicle names to imported images
        const imageMap = {
            'Classic 350': audi,
            'Himalayan': golf,
            'Duke': toyota,
            'BMW 310': bmw,
            'X-Pulse': benz,
            'Hunter': passat
        };
        return imageMap[name] || audi; // Default to audi if no match found
    };

    const [selectedCar, setSelectedcar] = useState('');
    const [selectedImage, setSelectedimage] = useState('');
    const [selectedCardata, setSelectedcardata] = useState({});

    useEffect(() => {
        if (vehicles.length > 0 && !selectedCar) {
            const firstVehicle = vehicles[0];
            setSelectedcar(firstVehicle.name);
            setSelectedimage(firstVehicle.image);
            setSelectedcardata(firstVehicle.data);
        }
    }, [vehicles]);

    const addClass = (carname) => {
        let classes = "bg-[#e9e9e9] font-[Poppins,sans-serif] ml-16 text-center text-xl font-semibold py-3 px-4 w-3/5 hover:bg-orange hover:text-white";
        if(selectedCar === carname){
            classes = "bg-orange text-white font-[Poppins,sans-serif] ml-16 text-center text-xl font-semibold py-3 px-4 w-3/5 hover:bg-orange hover:text-white"
        }
        return classes;
    }

    const handleBookRideClick = () => {
        setShowBookingForm(true);
    };

    if (loading) {
        return <div>Loading vehicles...</div>;
    }

    return(
        <>
            <div className="container mx-auto flex justify-center mb-10">
                <div className="text-center w-2/5 ">
                    <h2 className="font-bold text-2xl mb-5">Vehicle Models</h2>
                    <h1 className="font-bold text-5xl mb-5">Our rental fleet</h1>
                    <p className="text-base text-[#706f7b] mb-5">Choose from a variety of our amazing 
                    vehicles to rent for your next adventure or business trip</p>
                </div>
            </div>
            <div className="container mx-auto flex justify-center mb-48">
            <div className="grid lg:grid-cols-3 items-center"> 
                <div className="justify-center"> 
                <div className="grid grid-cols-1 gap-4 justify-center items-center">
                    {vehicles.map((vehicle) => ( 
                        <div 
                            onClick={() => {
                                setSelectedcar(vehicle.name);
                                setSelectedimage(vehicle.image);
                                setSelectedcardata(vehicle.data);
                            }} 
                            key={vehicle.id} 
                            style={{cursor:"pointer"}} 
                            id="carmodels" 
                            className={addClass(vehicle.name)}
                        > 
                            {vehicle.name} 
                        </div> 
                    ))} 
                </div>
                </div> 
                <div className="flex flex-col items-center mt-4"> 
                    <h2 className="text-2xl font-bold mb-4">{selectedCar}</h2>
                    <img src={selectedImage} alt={selectedCar} className="max-w-full"/>
                </div> 
                <div className=""> 
                    <div style={{cursor:"pointer"}} className="bg-orange py-4 px-2 text-center text-white font-sans font-bold text-2xl">
                        ${selectedCardata.price_per_day || '50'} / rent per day
                    </div>
                    <table style={{cursor:"pointer"}} className="">
                        <thead>
                            <tr className="">
                                <td className="py-2 text-center font-bold">Model</td>
                                <td className="py-2 text-center font-bold">{selectedCardata.model}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td className="py-2 text-center font-bold">Type</td>
                                <td className="py-2 text-center font-bold">{selectedCardata.mark}</td>
                            </tr>
                            <tr className="">
                                <td className="py-2 text-center font-bold">Year</td>
                                <td className="py-3 text-center font-bold">{selectedCardata.year}</td>
                            </tr>
                            <tr className="">
                                <td className="py-2 text-center font-bold">Weight</td>
                                <td className="py-2 text-center font-bold">{selectedCardata.doors}</td>
                            </tr>
                            <tr className="">
                                <td className="py-2 text-center font-bold">Transmission</td>
                                <td className="py-2 text-center font-bold">{selectedCardata.transmission}</td>
                            </tr>
                            <tr className="">
                                <td className="py-2 text-center font-bold">Fuel</td>
                                <td className="py-2 text-center font-bold">{selectedCardata.fuel}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div onClick={handleBookRideClick} style={{cursor:"pointer"}} className="hover:shadow-2xl opacity-95 hover:opacity-100 py-2 px-2 bg-orange text-white font-sans font-bold text-center text-2xl w-3/5 ml-20">
                        Reserve Now
                    </div>
                </div> 
            </div>
            </div>
            {showBookingForm && (
                <BookingForm
                    selectedCar={{
                        name: selectedCar,
                        id: vehicles.find(v => v.name === selectedCar)?.id,
                        image: selectedImage,
                        ...selectedCardata
                    }}
                    onClose={() => setShowBookingForm(false)}
                    initialSearchParams={initialSearchParams}
                />
            )}
        </>
    )
}