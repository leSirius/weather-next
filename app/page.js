'use client'
import {useEffect, useState} from "react";
import { fetchCityByLoc} from "@/app/lib/data";
import HeadBoard from "@/app/ui/homepage/head-board";
import LongBoard from "@/app/ui/homepage/long-board";
export default function Page (){
  let [[cityName, cityId], setCity] = useState([]);
  useEffect(() => {
    let ignore = false;

    const success = async (pos)=>{
      if (ignore) {
        console.log("home jumped over effect in dev!");
      } else {
        const [lat, lon] = [pos.coords.latitude.toFixed(2), pos.coords.longitude.toFixed(2)];
        if (lat === void 0) { throw Error("can't get location"); }
        const location = lon.toString() + ',' + lat.toString();

        const cityInfo = await fetchCityByLoc(location);
        setCity([cityInfo.name, cityInfo.id])
      }
    }
    const error = (e)=> {console.error(`failed to get location info: ${e.message}`);}
    navigator.geolocation.getCurrentPosition(success, error);
    return ()=>{ ignore = true; }
  }, []);
  /*
  if (!cityId) {
    return <div>Overall Loading</div>
  }
   */
  return (
    <div className='w-full md:w-10/12 text-center p-2'>
      {<HeadBoard cityName={cityName} cityId={cityId}></HeadBoard>}
      {<LongBoard id={cityId}></LongBoard>}
    </div>
  )
}

