import {useSumById} from "@/app/lib/data";
import {useEffect, useRef} from "react";
import { FiSunrise, FiSunset  } from "react-icons/fi";
import Canvas from "@/app/ui/home/tail-board-widgets/canvas";
export default function Sun({id}) {
  const {data, error, isLoading} = useSumById(id, new Date());


  if (error) {return <p>error</p>}
  if (isLoading) {return <p></p>}

  const riseOb = new Date(data.sunrise);
  const setOb = new Date(data.sunset);
  const riseStr = riseOb.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12:false});
  const setStr = setOb.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12:false});

  return (
    <div className='flex'>
      <div className='w-full rounded-lg overflow-hidden relative'>
        <div className='absolute px-4 flex justify-between w-full max-sm:px-1'>
          <div className='opacity-70 pt-1'>
            <FiSunrise className='inline-block mt-0.5 align-top text-orange-300'></FiSunrise>
            <p className='inline-block align-top whitespace-pre-wrap text-sm' >{` Sunrise`}</p>
          </div>
          <p className='text-lg opacity-95 '>{riseStr}</p>
        </div>

        <Canvas
          riseOb={riseOb}
          setOb={setOb}
        ></Canvas>

        <div className='absolute top-2/3 max-sm:top-[60%] w-full flex-col items-center'>
          <FiSunset  className='inline-block mt-0.5 align-top text-orange-300 opacity-80'></FiSunset >
          <p className='inline-block align-top whitespace-pre-wrap text-sm opacity-80' >{` Sunset`}</p>
          <p className='text-lg opacity-95 '>{setStr}</p>
        </div>
      </div>
    </div>

  )
}



