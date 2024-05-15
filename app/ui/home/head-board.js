import Image from "next/image";
import {useNowById} from "@/app/lib/data";
import Clock from "@/app/ui/home/head-board-widget/Clock";
import {HeadLoading} from "@/app/ui/home/loading";
export default function HeadBoard({cityName, cityId}){
  const {nowData,error,isLoading} = useNowById(cityId);

  if (error) {console.error("error in head-board", error.message);return <HeadBoard>Got Issue</HeadBoard>}
  if (isLoading){return <HeadLoading></HeadLoading>}

  return (
    <div className='w-full p-4 bg-blue-600 rounded-lg text-card h-[168px]'>
      <div className="flex justify-center py-3 relative">
        <BasicInfo cityName={cityName} obsTime={nowData.obsTime}></BasicInfo>
        <CentralInfo temp={nowData.temp} text={nowData.text} icon={nowData?.icon}></CentralInfo>
      </div>

      <FooterList nowData={nowData}></FooterList>
    </div>
  )
}

function BasicInfo ({cityName, obsTime}) {
  return (<>
    <p className="absolute left-0 top-0 md:text-lg">{cityName}</p>
    <div className="absolute right-0 top-0 text-2xl max-sm:text-lg "><Clock ></Clock></div>
    <p className="absolute right-0 top-7 text-sm opacity-40 text-right max-sm:top-6" style={{whiteSpace: 'pre-wrap'}}>
      {`Observed at\n${obsTime}`}
    </p>
  </>)
}

function CentralInfo({temp, text, icon}) {
  return (<>
    <Image width={60} height={60} src={`/icons/${icon}.svg`} alt="falied"
           className='w-9 max-sm:pt-1.5 md:w-16'
    ></Image>
    <div className="md:px-3 max-sm:pt-4">
      <p className="md:text-3xl ">{temp}</p>
      <p className="px-1">{text}</p>
    </div>
  </>)
}

function FooterList ({nowData}) {
  return (
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