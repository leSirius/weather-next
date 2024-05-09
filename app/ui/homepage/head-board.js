import Image from "next/image";
import {useEffect, useState} from "react";
import {fetchNowById} from "@/app/lib/data";
import Clock from "@/app/ui/Clock";
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
    ["Precip", nowData.precip],
    ["Feels", nowData.feelsLike],
    ["Visibility", nowData.vis],
  ];

  return (
    <div className='w-full p-4 bg-blue-600 rounded-lg text-white'>
      <div className="flex justify-center py-3 relative">
        <p className="absolute left-0 top-0 md:text-lg">{cityName}</p>
        <div className="absolute right-0 top-0 text-2xl max-sm:text-lg"><Clock ></Clock></div>
        <p className="absolute right-0 top-7 text-sm opacity-40 text-right max-sm:top-6"   style={{whiteSpace: 'pre-wrap'}}>
          {`Updated at\n${nowData.obsTime}`}
        </p>

        <Image priority={true} width={60} height={60} src={iconPath}  className='w-9 max-sm:pt-1.5 md:w-16' alt="falied"></Image>
        <div className="md:px-3 max-sm:pt-4">
          <p className="md:text-3xl ">{nowData.temp}</p>
          <p className="px-1">{nowData.text}</p>
        </div>
      </div>

      <div className="flex justify-between">
        {littleList.map(([att, value]) => {
          return (
            <div  key={`${att}now`} className='flex-col text-center max-sm: max-sm:text-sm max-sm:w-10 max-sm:flex-wrap'>
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