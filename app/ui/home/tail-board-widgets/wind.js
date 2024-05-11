import { CompassPointer, CompassPlate} from "@/app/lib/icons";
import {useNowById} from "@/app/lib/data";


export default function Wind({cityId}) {
  const  {nowData,error,isLoading} = useNowById(cityId);
  if (error) {console.error("error in tail-board", error.message);return <p>check console</p>}
  //if (isLoading){return <p>Loading in tailboard</p>}

  return (
    <div className=' text-card'>
      <div className=" flex justify-center relative opacity-65 w-full mb-1.5">
        <p className='absolute top-[10%] text-sm max-sm:top-[7.5%]'>N</p>
          <CompassPlate width='66.67%' ></CompassPlate>
        <div className={`absolute left-1/3 w-1/3 top-1/4`} style={{transition:`rotate 1.5s`,rotate: `${nowData?.wind360}deg`,animation:'shake 1.8s .2s ease-in infinite'}}>
          <CompassPointer width='100%' ></CompassPointer>
        </div>
      </div>
      {!isLoading&&<><p>{`Wind Scale: ${nowData.windScale}`}</p><p>{`Speed: ${nowData.windSpeed}`}</p></>}

    </div>

  )
}
