import React from 'react';
import bike from "../images/car.png"; // Using existing image for now

export default function Banner(){
    return(
        <>
            <div className="w-full bg-[#2d2d2d]">
                <div className="container mx-auto py-12 justify-center text-center">
                    <h2 className="text-white font-bold font-sans text-6xl py-3">Save big with our affordable bike rentals!</h2>
                    <h3 className="text-white font-semibold font-sans text-3xl py-3">Premium Bikes. Expert Maintenance. <span className="text-orange">24/7</span> Support.</h3>
                </div>
            </div>
            <div className="flex justify-center mt-24">
                <img className="z-50 max-w-xl object-contain" src={bike} alt="Featured Bike"/>
            </div>
        </>
    )
}