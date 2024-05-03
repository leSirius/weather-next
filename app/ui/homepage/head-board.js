import Image from "next/image";
import {useEffect, useState} from "react";
import {fetchNowById} from "@/app/lib/data";

export default function HeadBoard({cityName, cityId}){
  const [nowData, setNowData] = useState(null);

  if (!nowData&&cityId){
    (async ()=>{
      const data = await fetchNowById(cityId);
      setNowData(data);
    })();
  }

  if (!nowData){return <p>Loading in headboard</p>}

  const iconPath = `/icons/${nowData.icon}.svg`;
  const littleList = [
    [nowData.windDir, nowData.windSpeed],
    ["humidity", nowData.humidity],
    ["Precipitation", nowData.precip],
    ["Feels like", nowData.feelsLike],
    ["Visibility", nowData.vis],
  ];

  return (
    <div className='w-full p-4 bg-blue-600 rounded-lg text-white'>
      <div className="flex justify-center py-3 relative">
        <p className="absolute left-0 top-0 text-lg">{cityName}</p>
        <p className="absolute right-0 top-0 text-sm opacity-40">{nowData.obsTime}</p>

        <Image width={60} height={60} src={iconPath} alt="falied"></Image>
        <div className="px-3">
          <p className="text-3xl ">{nowData.temp}</p>
          <p className="px-1">{nowData.text}</p>
        </div>
      </div>

      <div className="flex justify-between">
        {littleList.map(([att, value]) => {
          return (
            <div  key={`${att}now`} className='flex-col text-center'>
              <p>{att}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

/*
useEffect(()=>{
  if (cityId !== void 0){
    (async ()=>{
      const data = await fetchNowById(cityId);
      setNowData(data);
    })();
  }
}, [cityId]);
*/