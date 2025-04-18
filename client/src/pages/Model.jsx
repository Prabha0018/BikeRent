import React, { useContext, useEffect, useState } from 'react';
import Carmodel from '../Components/Bodycomponents/carmodels';
import Banner from "../Components/Bodycomponents/Banner";
import Footer from "../Components/Bodycomponents/Footer";
import Navbar from '../Components/Navbarcomponents/Navbar';
import { UserContext } from '../Context/Clientcontext';
import Accountbar from '../Components/Navbarcomponents/Accountbar';
import LinearColor from '../Components/Bodycomponents/linearprogress';
import Reservationbox from '../Components/Bodycomponents/reservation';
import { useLocation } from 'react-router-dom';

export default function Model() {
    const {user} = useContext(UserContext);
    const [checkUser, setCheckUser] = useState(false);
    const location = useLocation();
    const searchParams = location.state;

    useEffect(()=>{
        const timer = setTimeout(() => {
            setCheckUser(true)
        }, 1000);

        return () => {
            clearTimeout(timer);
          };
    },[user])

    return(
        <>
        {!checkUser && <LinearColor/>}
        {checkUser && 
            <div className="">
                {!user ? <Navbar/> : <Accountbar/>}
                <div className="mt-32">
                    <Reservationbox initialSearchParams={searchParams} />
                </div>
                {/* <Carmodel/> */}
                <Banner/>
                <Footer/>
            </div>}
        </>
    )
}