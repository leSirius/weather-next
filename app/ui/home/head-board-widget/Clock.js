'use client'
import {useEffect, useState} from "react";
import {fetchCityByLoc} from "@/app/lib/data-home";

export default function Clock(){
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(()=>{setNow(new Date())}, 1000);
    return ()=> {clearInterval(id)}
  }, []);

  useEffect(()=>{
    let location = sessionStorage.getItem('location');
    if (!location)  { navigator.geolocation.getCurrentPosition(success, e=>{console.log(`err ${e}`)}); }

    function success (pos){
      const [lat, lon] = [pos.coords.latitude.toFixed(2), pos.coords.longitude.toFixed(2)];
      const location = lon.toString() + ',' + lat.toString();
      sessionStorage.setItem('location', location);
    }
  }, [])

  return (<>
    {now.toLocaleTimeString([],{ hourCycle: 'h23',})}
  </>)
}