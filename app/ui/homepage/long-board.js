import {useState} from "react";
import {fetchForecastById} from "@/app/lib/data";
import Image from "next/image";
import {ArrowPathIcon} from  '@heroicons/react/24/outline';

export default function LongBoard({id}){
  const [forecast, setForecast] = useState([]);
  if (forecast.length===0 && id){
    (async ()=>{
      const data = await fetchForecastById(id);
      setForecast(data);
    })();
  }
  //console.log(forecast);
  if (forecast.length===0) {return <p>Loading in longBoard</p>}

  const temperature = forecast.map(o=>Number(o.temp));
  const range = Math.max(...temperature)-Math.min(...temperature);

  return (
    <div className='w-1/2 p-1 pb-0.5 bg-blue-900 rounded-lg mt-4 relative text-white'>
      <select
        name='type'
        className='absolute top-1 left-1 rounded border-none text-sm bg-cyan-700 opacity-30 hover:opacity-70'
      >
        <option value='temperature'>Temperature</option>
        <option value='humidity'>Humidity</option>
      </select>

      <div className='flex justify-center items-center w-6 h-6 rounded-2xl bg-cyan-700 opacity-30 hover:opacity-70 absolute right-1 top-1 '>
        <button>
          <ArrowPathIcon className='w-5 '></ArrowPathIcon>
        </button>
      </div>
      <div className="flex scroll-smooth md:scroll-auto overflow-x-scroll scrollbar" >
        {forecast.map(hour =>
          <Batten
            hour={hour}
            revenue={[Math.min(...temperature), range]}
            key={`${hour.fxTime}forecast`}>
          </Batten>)
        }
      </div>
    </div>
  );
}

function Batten({hour, revenue}){
  const colors = [
    '#fff49a',
    '#ffba54',
    '#ff9d44',
    '#ff6600'
  ]
  const temp = Number(hour.temp);
  const select = Math.floor(((temp-revenue[0])/revenue[1]/3 + 0.33)*10)-3;
  const height = Math.sqrt((4+temp-revenue[0])/revenue[1])*60; //(temp-revenue[0])/revenue[1]*60+5
  const iconPath = `/icons/${hour.icon}.svg`;




  return (
    <div className='flex flex-col-reverse w-1/6 shrink-0 items-center text-sm text-white h-40 mx-2 '>
      <p>{new Date(hour.fxTime).getHours()+':00'}</p>
      <Image width={30} height={30} src={iconPath} alt={"Whoops"}></Image>
      <div
        style={{height:`${height}px`, backgroundColor: `${colors[select]}`}}
        className={`my-1 shrink-0 w-1.5 rounded   border-none`}
      >
      </div>
      <p>{`${temp}°`}</p>

    </div>

  )
}
/*

 */