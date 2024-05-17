import { CompassPointer, CompassPlate} from "@/app/lib/icons";

export default function WindServer({nowData}) {
  return (
    <div className=' text-card px-2 pt-2 text-center'>

      <div className=" flex justify-center relative opacity-65 w-full mb-1.5">
        <p className='absolute top-[10%] text-sm max-sm:top-[7.5%]'>N</p>
        <CompassPlate width='66.67%' ></CompassPlate>
        <div className={`absolute  left-1/3 w-1/3 top-1/4 border-none`} style={{transition:`rotate 1.8s`, rotate: `${nowData?.wind360}deg`, animation:'shake 1.8s .2s linear infinite'}}>
          <CompassPointer width='100% ' ></CompassPointer>
        </div>
      </div>

      <p>{`Wind Scale: ${nowData.windScale}`}</p><p>{`Speed: ${nowData.windSpeed}`}</p>

    </div>

  )
}