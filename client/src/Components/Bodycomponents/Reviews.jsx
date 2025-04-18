import React from 'react';
import potter from "../images/potter.jpg";
import weisley from "../images/weisley.jpg";





export default function Reviews(){
    return(
        <>
            <div className=" bg-[#f8f8f8] w-full z-10  mt-4">
                <div className="container mx-auto p-6  text-center my-4">
                        <h2 className='font-sans text-3xl font-semibold mb-2'>Cyclist Reviews</h2>
                        <h1 className="font-sans text-5xl font-bold mb-4">Client's Testimonials</h1>
                        <div className='flex justify-center mb-4'>
                            <p className="font-sans text-base font-semibold text-[#706f7b]  w-2/4">
                            See what our cycling community has to say about their rental experiences. 
                            From casual riders to cycling enthusiasts, our clients love the quality of our bikes 
                            and the convenience of our service.
                            </p>
                        </div> 
                </div>
                <div className="container mx-auto justify-between w-3/4 pb-16">
                    <div className="grid lg:grid-cols-2 gap-8 ">
                            <div className="bg-white font-sans p-16 text-center z-30 shadow-xl">
                                <h2 className="text-2xl font-semibold mb-10">"The bikes were in pristine condition and perfect for exploring the city. 
                                The staff was knowledgeable about cycling routes and provided excellent service. Would definitely rent again!"</h2>
                                <div className="flex items-center">
                                    <img src={potter} alt="Your Image" className="w-16 h-16 rounded-full"/>
                                    <span className="ml-4 font-bold text-xl">Spartan Karthi</span>
                                    <span className="ms-auto text-6xl font-mono text-orange">"</span>
                                </div>
                            </div>
                            <div className="bg-white font-sans p-16 text-center z-30 shadow-xl">
                                <h2 className="text-2xl font-semibold mb-10">"As an avid cyclist, I appreciate the quality of bikes they offer. 
                                The maintenance is top-notch, and the booking process was seamless. A fantastic experience overall!"</h2>
                                <div className="flex items-center">
                                    <img src={weisley} alt="Your Image" className="w-16 h-16 rounded-full"/>
                                    <span className="ml-4 font-bold text-xl">Kavin Murugasan</span>
                                    <span className="ms-auto text-6xl font-mono text-orange">"</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}