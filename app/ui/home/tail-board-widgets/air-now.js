import {useAirById} from "@/app/lib/data";
import {compileNonPath} from "next/dist/shared/lib/router/utils/prepare-destination";
const airAttList = [
  ['AQI', 'aqi'],
  ['Primary', 'primary'],
  ['PM10', 'pm10'],
  ['PM2.5', 'pm2p5'],
  ['NO2', 'no2'],
  ['SO2', 'so2'],
  ['CO', 'co'],
  ['O3', 'o3']
];

function getAirColors(aqiStr) {
  const airColors = ['#00e400', '#ffff00', '#fffd00', '#ff0000', '#99004c', '#fd0023'];
  const aqi = Number(aqiStr);
  const colorInd = aqi<=200? Math.floor(Math.max(0, aqi-1)/50):(aqi<=300? 4:5);
  return airColors[colorInd];
}
export default function AirNow({id}){
  const {data, error, isLoading} = useAirById(id);

  if (error) { return <p>failed</p>}
  if (isLoading) {return <></>}
  const color = getAirColors(data.aqi);

  return (
    <div className='px-4 ' >
      <div className='relative'>
        <p className='text-xl text-left opacity-85 max-sm:text-lg' style={{color:color}}>{data.category.slice(0,2)}</p>
        <p className='absolute top-1 right-0 text-sm opacity-30'>At {new Date(data.pubTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12:false})}</p>
      </div>
      <div className='flex'>
        <div className='w-1/2 text-left opacity-75'>
          {airAttList.map(tuple=> <p key={tuple[1]}>{tuple[0]}</p>)}
        </div>
        <div className='w-1/2 text-right opacity-50'>
          {airAttList.map(tuple=><p key={tuple[0]}>{data[tuple[1]]}</p>)}
        </div>
      </div>
    </div>
  )
}
