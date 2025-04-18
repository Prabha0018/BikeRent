import React from 'react';
import { Link } from 'react-router-dom';
import bikeHero from "../images/car.png";

const Hero = () => {
    return (
        <div className="relative min-h-[85vh]">
            <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-b from-gray-900/90 to-gray-900/70">
                    <div className="flex justify-center items-center h-full">
                        <img
                            src={bikeHero}
                            alt="Bike rental hero"
                            className="w-full h-full object-cover absolute inset-0 -z-10"
                        />
                    </div>
                </div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-end h-full text-white text-center pb-32">
                <div className="px-6">
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  
        
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl">
                        Experience the Thrill of Two Wheels
                    </h1>
                    <p className="text-lg md:text-xl mb-1 max-w-4xl opacity-90">
                        Your adventure awaits! Get ready to explore with our top-quality bikes.
                        From city cruisers to mountain bikes, find your perfect ride today.
                    </p>
                    <Link
                        to="/model"
                        className="bg-orange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 hover:shadow-lg inline-block animate-pulse"
                    >
                        Start Your Adventure Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;