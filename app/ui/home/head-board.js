import Image from "next/image";
import {useNowById} from "@/app/lib/data";
import Clock from "@/app/ui/home/head-board-widget/Clock";
export default function HeadBoard({cityName, cityId}){
  const {nowData,error,isLoading} = useNowById(cityId);
  console.log('rend head from head of head board', cityId)
  if (error) {console.error("error in head-board", error.message);return <p>check console</p>}
  //if (isLoading){return <p>Loading in headboard</p>}

  return (
    <div className='w-full p-4 bg-blue-600 rounded-lg text-card h-[168px]'>
      {isLoading? <></>:(<>
      <div className="flex justify-center py-3 relative">
        <p className="absolute left-0 top-0 md:text-lg">{cityName}</p>
        <div className="absolute right-0 top-0 text-2xl max-sm:text-lg"><Clock ></Clock></div>
        <p className="absolute right-0 top-7 text-sm opacity-40 text-right max-sm:top-6" style={{whiteSpace: 'pre-wrap'}}>
          {`Observed at\n${nowData.obsTime}`}
        </p>

        <Image width={60} height={60} src={`/icons/${nowData?.icon}.svg`} className='w-9 max-sm:pt-1.5 md:w-16' alt="falied"></Image>
        <div className="md:px-3 max-sm:pt-4">
          <p className="md:text-3xl ">{nowData.temp}</p>
          <p className="px-1">{nowData.text}</p>
        </div>
      </div>

      <div className="flex justify-between">
        {[
          ["Feels", nowData?.feelsLike],
          ["humidity", nowData?.humidity],
          ["Precip", nowData?.precip],
          ['Pressure', nowData?.pressure],
          ["Visibility", nowData?.vis],
        ].map(([att, value]) => {
          return (
            <div  key={`${att}now`} className='flex-col text-center max-sm: max-sm:text-sm max-sm:w-10 max-sm:flex-wrap'>
              <p>{att}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </div>
        </>)}
    </div>
  )
}


function addUnit(ob){
  if (ob===void 0||ob===null){return ob;}
  for (const key of Object.keys(ob)){
    switch (key) {
      case "temp":{
        ob[key] = `${ob[key]}°C`;
        break;
      }
      case "humidity":{
        ob[key] = `${ob[key]}%`;
        break;
      }
      case "vis":{
        ob[key] = `${ob[key]}km`;
        break;
      }
      case "feelsLike":{
        ob[key] = `${ob[key]}°C`;
        break;
      }
      case "precip":{
        ob[key] = `${ob[key]}mm`;
        break;
      }
      case "windSpeed":{
        ob[key] = `${ob[key]}Km/h`;
        break;
      }
      case "pressure":{
        ob[key] = `${ob[key]}hPa`;
        break;
      }
      case "obsTime":{
        const date = new Date(ob[key]);
        ob[key] = date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit',hour12:false});
        break;
      }
    }
  }
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