import Image from "next/image";

export default function MapBattens({dataMatrix, column, colors, witchFetch}){
  const values = dataMatrix.map(o=>Number(o[`${column}`]));
  const lowest = Math.min(...values);
  let range = (Math.max(...values)-lowest);

  let key = 0;
  return (<>{
    dataMatrix.map((item) => {
      const value = item[column];
      const height = calHeight(value, lowest, range);
      const color = colors[calColorInd(value, lowest, range)];
      return (
        <div
          style={{width:'11%'}}
          className='flex flex-col-reverse shrink-0 items-center text-sm text-white h-44 mx-2 pb-1'
          key = {key++}
        >
          <CustomisedPart item={item} witchFetch={witchFetch}></CustomisedPart>
          <ColoredBatten value={value} height={height} color={color}></ColoredBatten>
        </div>
      )
    })
  }</>)
}

function CustomisedPart({item, witchFetch}){
  switch (witchFetch) {
    case 0: {
      const time = new Date(item.fxTime);
      const iconPath = `/icons/${item.icon}.svg`
      return (
        < >
          <p>{time.getHours()}<span className='max-sm:hidden'>:00</span></p>
          <Image width={30} height={30} src={iconPath} alt={"Whoops"}></Image>
        </>
      )
    }
    case 1: {
      return (
        <>
          <p title={item.text} className='overflow-hidden h-5 mb-1'>{item.name}</p>
        </>
      )
    }
    case 2: {
      const time = new Date(item.fxDate);
      const iconPath = `/icons/${item.iconDay}.svg`;
      return (
        < >
          <p>{`${time.getMonth()+1}.${time.getDate()}`}</p>
          <Image width={30} height={30} src={iconPath} alt={"Whoops"}></Image>
        </>
      )
    }
  }
}

function ColoredBatten({height, color, value}){
  return (<>
    <div
      style={{height:`${height}px`, backgroundColor: `${color}`}}
      className={`my-1 shrink-0 w-1.5 rounded   border-none`}
    ></div>
    <p>{value}</p>
  </>)
}

function calColorInd(value, lowest, range) {
  if (range===0) {range+=1;}
  return Math.floor(((value-lowest)/range/3 + 0.33)*10)-3;
}
function calHeight(value, lowest, range) {
  if (range===0) {range+=1;}
  return Math.sqrt(0.2+(value-lowest)/range)*50;
}

/*
export function BattenForecast({time, value, height, color, iconPath}){
  const splitter = iconPath.indexOf('/')
  const [ind, icon] = [Number(iconPath.slice(0,splitter)), iconPath.slice(splitter+1)];
  // Image has Auto lazy loading, and ind can be used to close first several ones.
  return (
    <div className='flex flex-col-reverse w-1/12 shrink-0 items-center text-sm text-white h-44 mx-2 pb-1'>
      <p>{new Date(time).getHours()}<span className='max-sm:hidden'>:00</span></p>
      <Image  width={30} height={30} src={icon} alt={"Whoops"}></Image>
      <ColoredBatten height={height} color={color} value={value}></ColoredBatten>
    </div>
  )
}

export function BattenIndices({name, height, color, value, text}){
  return (
    <div title={text} className='flex flex-col-reverse w-2/12 shrink-0 items-center text-sm text-white h-44 mx-2 pb-1'>
      <p title={name} className='overflow-hidden h-5 mb-1'>{name}</p>
      <ColoredBatten height={height} color={color} value={value}></ColoredBatten>
    </div>
  )
}


 */