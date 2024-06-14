'use client'
import {Suspense, useEffect, useState} from "react";
import { fetchCityByLoc} from "@/app/lib/data-home";
import HeadBoard from "@/app/ui/home/head-board";
import MiddleBoard from "@/app/ui/home/middle-board";
import TailBoard from "@/app/ui/home/tail-board";
import {Loading} from "@/app/ui/home/loading";
const beijing = ['Beijing', '101010100'];
export default function Page (){
  let [[cityName, cityId], setCity] = useState(['','']);

  useEffect(() => {
    try {
      if (cityId.length===0){
        let location = sessionStorage.getItem('location');
        if (!location) { navigator.geolocation.getCurrentPosition(success, error); }
        else {
          (async ()=>{
            const cityInfo = await fetchCityByLoc(location);
            setCity([cityInfo.name, cityInfo.id]);
          })();
        }
      }
    }
    catch (e) {
      console.error('getting location failed, use Beijing. Message:', e.message);
      setCity(beijing);
    }

    async function success (pos){
      const [lat, lon] = [pos.coords.latitude.toFixed(2), pos.coords.longitude.toFixed(2)];
      if (lat === void 0) { throw Error("can't get location"); }
      const location = lon.toString() + ',' + lat.toString();
      sessionStorage.setItem('location', location);
      const cityInfo = await fetchCityByLoc(location);
      setCity([cityInfo.name, cityInfo.id]);
    }
    function error(e) {throw Error(e);}

  }, []);

  if (cityId==='') {return <Loading></Loading>}
  return (
    <div className='w-full md:w-10/12 text-center p-2'>
      <HeadBoard cityName={cityName} cityId={cityId}></HeadBoard>
      <MiddleBoard id={cityId}></MiddleBoard>
      <TailBoard id={cityId}></TailBoard>
    </div>
  )
}

/*
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

    if (!cityId) {
    return <div>Overall Loading</div>
  }
*/