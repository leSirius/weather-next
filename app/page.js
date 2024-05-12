'use client'
import {Suspense, useEffect, useState} from "react";
import { fetchCityByLoc} from "@/app/lib/data";
import HeadBoard from "@/app/ui/home/head-board";
import MiddleBoard from "@/app/ui/home/middle-board";
import TailBoard from "@/app/ui/home/tail-board";
import MiddleLoading from "@/app/ui/home/middle-borad-widgets/middle-loading";
const beijing = ['Beijing', '101010100'];
export default function Page (){
  let [[cityName, cityId], setCity] = useState(['','']);

  useEffect(() => {
    const success = async (pos)=>{
      const [lat, lon] = [pos.coords.latitude.toFixed(2), pos.coords.longitude.toFixed(2)];
      if (lat === void 0) { throw Error("can't get location"); }
      const location = lon.toString() + ',' + lat.toString();
      const cityInfo = await fetchCityByLoc(location);
      setCity([cityInfo.name, cityInfo.id]);
    }
    const error = (e)=> {throw Error(e);}

    try {
      if (cityId.length===0){
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
    catch (e) {
      console.error('getting location failed, use Beijing. Message:', e.message);
      setCity(beijing);
    }
  }, []);
  //if (cityId==='') {return <p>loading overall</p>}
  return (
    <div className='w-full md:w-10/12 text-center p-2'>
      <Suspense fallback={<p>fallback</p>}>
        <HeadBoard cityName={cityName} cityId={cityId}></HeadBoard>
      </Suspense>
      <div className='h-52'>
        <Suspense fallback={MiddleLoading}>
          {cityId.length===0?<MiddleLoading></MiddleLoading>:<MiddleBoard id={cityId}></MiddleBoard>}
        </Suspense>
      </div>
      <Suspense fallback={<p>fallback</p>}>
        <TailBoard id={cityId}></TailBoard>
      </Suspense>
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