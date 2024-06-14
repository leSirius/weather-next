import Image from "next/image";
import {fetchNow} from "@/app/lib/data-search";
import dynamic from "next/dynamic";

const Clock = dynamic(()=>import("@/app/ui/home/head-board-widget/Clock"), {ssr:false})

export default async function HeadBoardServer({id}){
  const nowData = await fetchNow(id);

  return (
    <div className='w-full p-4 text-card '>
      <div className="flex justify-center py-3 relative">
        <BasicInfo obsTime={nowData.obsTime}></BasicInfo>
        <CentralInfo temp={nowData.temp} text={nowData.text} icon={nowData?.icon}></CentralInfo>
      </div>

      <FooterList nowData={nowData}></FooterList>
    </div>
  )
}

function BasicInfo ({obsTime}) {
  return (<>
    <div className="absolute right-0 top-0 text-2xl max-sm:text-lg "><Clock> </Clock></div>
    <p className="absolute right-0 top-7 text-sm opacity-40 text-right max-sm:top-6" style={{whiteSpace: 'pre-wrap'}}>
      {`Observed at\n${obsTime}`}
    </p>
  </>)
}

function CentralInfo({temp, text, icon}) {
  return (<>
    <Image width={60} height={60} src={`/icons/${icon}.svg`} alt="falied" priority={true}
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