import useSWR from "swr";

const airAttList = [
  ['AQI', 'aqi'],
  ['Primary', 'primary'],
  ['PM10', 'pm10'],
  ['PM2.5', 'pm2p5'],
  ['NO2', 'no2'],
  ['SO2', 'so2'],
  ['CO', 'co'],
  ['O3', 'o3']
]
const airColors = ['#00e400', '#ffff00', '#fffd00', '#ff0000', '#99004c', '#fd0023'];
export function AirNow({id}){
  const url = `/api/air/now?location=${id}`;
  const fetcher = (url)=>fetch(url).then(res=> res.json());
  const {data, error, isLoading} = useSWR(url, fetcher);

  if (error) {return <p>failed</p>}
  if (isLoading) {return <p>Loading</p>}
  const aqi = Number(data.aqi);
  const colorInd = aqi<=200? Math.floor(Math.max(0, aqi-1)/50):(aqi<=300? 4:5);
  const color = airColors[colorInd];

  return (
    <div className='px-2 ' >
      <div className='relative'>
        <p className='text-2xl text-left opacity-85' style={{color:color}}>{data.category}</p>
        <p className='absolute top-1 right-0.5 text-sm opacity-30'>At {new Date(data.pubTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12:false})}</p>
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


/*
  const primary = data.primary;
  const ind = airAttList.findIndex(tuple=>tuple[1]===primary);
  const reSortedList = [...airAttList.slice(0, 2), airAttList[ind], ...airAttList.slice(2, ind), ...airAttList.slice(ind+1)];
  console.log(reSortedList,ind, primary)


 */