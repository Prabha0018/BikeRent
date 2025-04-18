import React, { useState, useContext } from 'react';
import logo from "../images/carlogo.png"
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/Clientcontext';

export default function Navbar(){
    const [isToggle, setIstoggle] = useState(false);
    const {user} = useContext(UserContext);
    
    const menus = [
        {name: 'Home', href:'/'},
        {name: 'About', href: "/about"},
        {name: 'Models', href: "/model"},
        {name: 'Testimaonials', href: "/testimonials"},
        {name: 'Team', href: "/team"},
        {name: 'Contact', href: "/contact"},
        {name: 'Login', href: "/login"},
        {name: 'Register', href: "/register"}
    ];

    const open = () => {
        setIstoggle(!isToggle)
    };

    return(
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 h-20">
                <div className="container mx-auto h-full px-4 lg:px-8">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <img className="h-10 w-auto object-contain" src={logo} alt="Logo"/>
                            </Link>
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                            {menus.slice(0, -2).map((menu, index) => (
                                <Link 
                                    key={index}
                                    to={menu.href}
                                    className="text-white hover:text-orange transition-colors duration-300 text-base lg:text-lg font-medium"
                                >
                                    {menu.name}
                                </Link>
                            ))}
                            <Link 
                                to="/login"
                                className="text-white hover:text-orange transition-colors duration-300 text-base lg:text-lg font-medium"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register"
                                className="bg-orange text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 text-base lg:text-lg font-medium"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={open} 
                            className="md:hidden focus:outline-none z-50"
                            aria-label="Toggle menu"
                        >
                            <div className="flex flex-col items-end space-y-1.5">
                                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isToggle ? 'rotate-45 translate-y-2' : ''}`}></div>
                                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isToggle ? 'opacity-0' : ''}`}></div>
                                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isToggle ? '-rotate-45 -translate-y-2' : ''}`}></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div 
                    className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 md:hidden ${
                        isToggle ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    onClick={open}
                />

                {/* Mobile Menu Panel */}
                <div 
                    className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform md:hidden ${
                        isToggle ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex flex-col p-6 pt-20 space-y-4">
                        {menus.map((menu, index) => (
                            <Link 
                                key={index} 
                                to={menu.href}
                                className="text-gray-800 hover:text-orange transition-colors duration-300 text-lg font-medium"
                                onClick={open}
                            >
                                {menu.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}