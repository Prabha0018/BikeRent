import React,{useEffect, useRef, useState} from 'react'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useNavigate } from 'react-router-dom';

export default function Form({reservationFormRef, toggleDiv, carType, setCarType, pickPlace, setPickPlace, dropPlace, setDropPlace, pickDate, setPickDate, dropDate, setDropDate}){
  
  const [checkFields, setCheckfields] = useState(false);
  const navigate = useNavigate();

  const isSearchDisabled = !carType || !pickPlace || !dropPlace || !pickDate || !dropDate || carType === 'Select Bike';

  const bikes = [
      'Select Bike',
      'Classic 350',
      'Himalayan',
      'Duke',
      'BMW 310',
      'X-Pulse',
      'Hunter'
  ];

  const places = [
      'Select Place','Kochi','Trivandrum','Chennai','Calicut','Alappy','Kasargod'
  ];

  const Search = (ev) => {
      ev.preventDefault();
      if (isSearchDisabled) {
          setCheckfields(true);
          setTimeout(() => {
            setCheckfields(false);
          }, 1000);
      } else {
          navigate('/model', { 
              state: { 
                  carType, 
                  pickPlace, 
                  dropPlace, 
                  pickDate, 
                  dropDate 
              } 
          });
      }
  }

  return(
      <>
          <form onSubmit={Search} ref={reservationFormRef}>
          <div className="container justify-center mx-auto mb-40">
              <div id="formbg" className="lg:mx-16 py-10 z-30 shadow-2xl">
              {checkFields && <h2 className="font-sans font-bold text-xl px-12 mb-8 text-orange">Please fill all the fields.</h2>}
              <h4 className="mt-6 font-sans font-bold text-xl px-12 mb-8">Book a bike</h4>
              <div className='grid lg:grid-cols-3 px-12 gap-4'>
              <div className="mb-8">
                  <label className="font-semibold text-lg"><span className="text-orange"><DirectionsCarOutlinedIcon/> </span> Select Your bike Type</label><br/>
                  <select value={carType} onChange={ev=>setCarType(ev.target.value)} id="cartype" className="mt-4 border border-[#ccd7e6] rounded text-[#ababab] text-xl py-2 w-full focus:outline-none">
                      {bikes.map((bike,index)=>(
                          <option key={index} value={bike}>{bike}</option>
                      ))}
                  </select>
              </div>
              <div className="mb-8">
                  <label className="font-semibold text-lg"><span className='text-orange'><LocationOnOutlinedIcon/> </span> Pick-up</label><br/>
                  <select value={pickPlace} onChange={ev=>setPickPlace(ev.target.value)} id="pickplace" className="mt-4 border border-[#ccd7e6] rounded text-[#ababab] text-xl py-2 w-full focus:outline-none">
                      {places.map((place,index)=>(
                          <option key={index} value={place}>{place}</option>
                      ))}
                  </select>
              </div>
              <div className="mb-8">
                  <label className="font-semibold text-lg"><span className='text-orange'><LocationOnOutlinedIcon/> </span> Drop-off</label><br/>
                  <select value={dropPlace} onChange={ev=>setDropPlace(ev.target.value)} id="dropplace" className="mt-4 border border-[#ccd7e6] rounded text-[#ababab] text-xl py-2 w-full focus:outline-none">
                      {places.map((place,index)=>(
                          <option key={index} value={place}>{place}</option>
                      ))}
                  </select>
              </div>
              </div>
              <div className='grid lg:grid-cols-2 px-12 gap-4'>
              <div className="mb-8">
                  <label className="font-semibold text-lg"><span className='text-orange'><CalendarMonthOutlinedIcon/> </span> Pick-up Date</label><br/>
                  <input type="date" value={pickDate} onChange={ev=>setPickDate(ev.target.value)} id="pickdate" className="mt-4 border border-[#ccd7e6] rounded text-[#ababab] text-xl py-2 w-full focus:outline-none"/>
              </div>
              <div className="mb-8">
                  <label className="font-semibold text-lg"><span className='text-orange'><CalendarMonthOutlinedIcon/> </span> Drop-off Date</label><br/>
                  <input type="date" value={dropDate} onChange={ev=>setDropDate(ev.target.value)} id="dropdate" className="mt-4 border border-[#ccd7e6] rounded text-[#ababab] text-xl py-2 w-full focus:outline-none"/>
              </div>
              </div>
              <div className='flex justify-center'>
                  <button type='submit' className="bg-orange text-white font-bold px-16 py-4 rounded">Search</button>
              </div>
              </div>
          </div>
          </form>
      </>
  )
}