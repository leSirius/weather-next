import Image from "next/image";

export function BattenForecast({time, value, height, color, iconPath}){
  const splitter = iconPath.indexOf('/')
  const [ind, icon] = [Number(iconPath.slice(0,splitter)), iconPath.slice(splitter+1)];
  // Image has Auto lazy loading, and ind can be used to close first several ones.
  return (
    <div className='flex flex-col-reverse w-1/12 shrink-0 items-center text-sm text-white h-44 mx-2 pb-1'>
      <p>{new Date(time).getHours()}<span className='max-sm:hidden'>:00</span></p>
      <Image  width={30} height={30} src={icon} alt={"Whoops"}></Image>
      <div
        style={{height:`${height}px`, backgroundColor: `${color}`}}
        className={`my-1 shrink-0 w-1.5 rounded   border-none`}
      >
      </div>
      <p>{value}</p>
    </div>
  )
}

export function BattenIndices({name, height, color, level, text}){
  return (
    <div title={text} className='flex flex-col-reverse w-2/12 shrink-0 items-center text-sm text-white h-44 mx-2 pb-1'>
      <p title={name} className='overflow-hidden h-5 mb-1'>{name}</p>
      <div
        style={{height:`${height}px`, backgroundColor: `${color}`}}
        className={`my-1 shrink-0 w-1.5 rounded   border-none`}
      >
      </div>
      <p>{level}</p>
    </div>
  )
}