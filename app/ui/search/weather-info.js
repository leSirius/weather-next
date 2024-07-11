import {Suspense} from "react";
import HeadBoardServer from "@/app/ui/search/weather-info/head-board-Server";
import MiddleDataLayer from "@/app/ui/search/weather-info/middle-data-layer";
import TailBoardServer from "@/app/ui/search/weather-info/tail-board-server";
import {MiddleLoadingServer, TailLoadingServer} from "@/app/ui/search/loading";
export default function WeatherInfo({id, witch}) {
  return (
    <div className='h-full grid grid-cols-3 grid-rows-3 gap-4'>
      <div className='col-span-3 rounded-xl bg-blue-600'>
        <Suspense fallback={<></>}>
          {id!==""&&<HeadBoardServer id={id}></HeadBoardServer>}
        </Suspense>
      </div>

      <div className='col-span-3'>
        <Suspense fallback={<MiddleLoadingServer></MiddleLoadingServer>}>
          {id!==""?<MiddleDataLayer id={id} witch={witch}></MiddleDataLayer>:<MiddleLoadingServer></MiddleLoadingServer>}
        </Suspense>
      </div>

      <div className='col-span-3 '>
        <Suspense fallback={<TailLoadingServer></TailLoadingServer>}>
          {
            id!==""?<TailBoardServer id={id}></TailBoardServer>:<TailLoadingServer></TailLoadingServer>
          }
        </Suspense>
      </div>
    </div>
  )
}