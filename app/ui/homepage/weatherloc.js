'use client'
import {useEffect, useState} from "react";
import {addUnit, fetchDataByCor} from "@/app/lib/data";
import Image from "next/image";

export default function WeatherLoc (){
  const beijing = [39.9042, 116.4074];
  let [locData, setLocData] = useState(null);
  useEffect(() => {
    let ignore = false;
    navigator.geolocation.getCurrentPosition(async pos => {
      if (!ignore) {
        const [lat, lon] = [pos.coords.latitude, pos.coords.longitude]
        const data = await fetchDataByCor(lat, lon)
        await console.log(data);
        await addUnit(data);

        await setLocData(data);
      }
      else {
        console.log("skip effect once")
      }
    }, err => {
      console.error("failed to get location info")

    })
    return ()=>{ ignore = true; }
  }, []);
  return (
    <div className='w-full px-4 py-2 bg-blue-600 rounded-lg text-white'>
      {locData? <InfoSizeM locData={locData}></InfoSizeM> : <p>Loading Data</p>}
    </div>
  )
}

function InfoSizeM({locData}){
  const iconPath = `/icons/${locData.icon}.svg`;
  const littleList = [
    [locData.windDir, locData.windSpeed],
    ["humidity", locData.humidity],
    ["Precipitation", locData.precip],
    ["Feels like", locData.feelsLike],
    ["Visibility", locData.vis],
  ];
  return (
    <div>
      <div className="flex justify-center py-4 relative">
        <Image width={60} height={60} src={iconPath} alt="falied"></Image>
        <div className="px-3">
          <p className="text-3xl ">{locData.temp}</p>
          <p className="px-1">{locData.text}</p>
        </div>
        <p className="absolute right-0 top-0 text-sm opacity-30">{locData.obsTime}</p>
      </div>

      <div className="flex justify-between">
        {littleList.map(([att, value]) => {
          return (
            <div  key={`loc${att}`} className='flex-col text-center'>
              <p>{att}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* previous async get location and fetch data code
let promise1 = new Promise((resolve, reject)=>{
  navigator.geolocation.getCurrentPosition(pos=>{
    [lat,lon] = [pos.coords.latitude, pos.coords.longitude];
    resolve({lat,lon});
  }, err=>{reject(err);})
})
promise1.then(()=>{
  if (ignore) {
    return null;
  } else {
    return fetchDataByCor({lat, lon});
  }
}).then(data=>{
  console.log(data);
})





*/