import React, { useContext, useState } from 'react';
import logo from "../images/carlogo.png"
import Dropdown from './accountdropdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Clientcontext';



export default function Accountbar(){

    const [isToggle, setIstoggle] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const menus = [
        {name: 'Home', href: "/account"},
        {name: 'About', href: "/about"},
        {name: 'Models', href: "/model"},
        {name: 'Testimaonials', href: "/testimonials"},
        {name: 'Team', href: "/team"},
        {name: 'Contact', href: "/contact"},
        {name: 'bookings', href: "/account/bookings"},
        {name: 'logout', href: "/model"},
    ]



    

    const open =()=>{
        setIstoggle(!isToggle)
    }

    const handleOptionClick = async () => {
        await axios.post('/logout').then(()=>{
          setUser(null);
          navigate('/');
        })
      }

    return(
        <>
            <nav className="relative container mx-auto p-6 bg-transparent">
                <div className="flex items-center justify-around space-x-20">
                    <div className="pt-2">
                        <img style={{cursor:"pointer"}} className="w-40 h-15" src={logo} alt="c"/>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        {menus.map((menu,index)=>(
                            index != menus.length -1 && 
                            <a className="font-bold text-lg font-sans hover:text-orange" key={index} href={menu.href}>{menu.name}</a>
                        ))}
                    </div>
                    <div className="hidden md:flex space-x-4">
                            <Dropdown/>
                    </div>
                    <button 
                        onClick={open} 
                        className={`md:hidden focus:outline-none transition-all duration-300 ease-in-out z-50 relative ${isToggle ? 'transform rotate-90' : ''}`}
                    >
                        <div className="w-8 h-1 bg-orange mb-1.5 rounded-full transition-all duration-300 ease-in-out"></div>
                        <div className={`w-8 h-1 bg-orange mb-1.5 rounded-full transition-all duration-300 ease-in-out ${isToggle ? 'opacity-0' : ''}`}></div>
                        <div className="w-8 h-1 bg-orange rounded-full transition-all duration-300 ease-in-out"></div>
                    </button>
                </div>
                {/* Overlay Background */}
                <div 
                    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
                        isToggle ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={open}
                />
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <div 
                        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${
                            isToggle 
                            ? 'translate-x-0' 
                            : 'translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col items-start p-6 space-y-4">
                            {menus.map((menu,index)=>(
                                <a 
                                    key={index} 
                                    href={menu.href}
                                    className="text-gray-800 hover:text-orange transition-colors duration-300 text-lg font-semibold"
                                >
                                    {menu.name}
                                </a>
                            ))}
                            <button 
                                onClick={handleOptionClick}
                                className="text-orange hover:text-red-600 transition-colors duration-300 text-lg font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}