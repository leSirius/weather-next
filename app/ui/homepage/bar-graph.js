import {ArrowPathIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useRef, useState} from "react";
import ColorSetter from "@/app/ui/homepage/color-setter";
import clsx from "clsx";

// try to make it easier to add a new data type,
// only need to change typeList, unit, colors.
export default function  BarGraph({forecast}){
  const typeList = [
    {type: "temp", text: 'Temperature', unit: '°C'},
    {type: "windSpeed", text: 'WindSpeed', unit: 'km/h'},
    {type: "humidity", text: "Humidity", unit: "%"},
    {type: "pop", text: 'ProbOfPrecip', unit: "%"},
    {type: "precip", text: "Precipitation", unit: "mm"},
    {type: "pressure", text: "Pressure", unit: "hPa"},
    {type: "cloud", text: "Cloud", unit:"%"},
    {type: "dew", text: "DewPoint", unit:"°C"}
  ]

  const [colorList, setColorList] = useState([
    ['#fff49a', '#ffba54', '#ff9d44', '#ff6600'],
    ['#91f4ff', '#54baff', '#449dff', '#0066ff'],
    ['#01ffff', '#00ecfa', '#00cef1', '#00b8ea'],
    ['#bef264', '#84cc16', '#65a30d', '#4d7c0f'],
    ['#c4b5fd', '#a78bfa', '#8b5cf6', '#5b21b6'],
    ['#fca5a5', '#f87171', '#ef4444', '#b91c1c'],
    ['#e4e4e7', '#a1a1aa', '#71717a', '#52525b'],
    ['#fef08a', '#facc15', '#ca8a04', '#a15207'],
  ]);

  const [dataType, setDataType] = useState(typeList[0].type);
  const [colorSetter, setColorSetter] = useState(false);
  const selector = useRef(null);
  const inputForm = useRef(null);

  function selectHandler(e) {
    const value = e.target.value;
    if (value!==dataType){
      setDataType(value);
    }
  }

  function clickToNext() {
    const opList = selector.current.options;
    opList.selectedIndex = (opList.selectedIndex+1)%opList.length;
    selectHandler({'target':selector.current});
  }

  function clickToColorSetter() {
    setColorSetter(!colorSetter);
  }

  function ControlTools(){
    return (<>
      <select
        ref={selector}
        onChange={selectHandler}
        value={dataType}
        className='absolute top-1.5 left-1.5 rounded border-none text-sm bg-cyan-700 opacity-30 hover:opacity-60 '
      >
        {typeList.map(({type, text}) => <option key={`select${type}`} value={type}>{text} </option>)}
      </select>
      <p className='absolute top-1 left-28 opacity-50'>{`Unit: ${unit}`}</p>

      <div className={clsx('absolute top-1.5 right-1.5', {hidden:!colorSetter})} >
        <ColorSetter
          initialIndex={index}
          setDataType={setDataType}
          typeList={typeList}
          setColorList={setColorList}
          colorList={colorList}
          closeHandler={clickToColorSetter}
        >

        </ColorSetter>
      </div>

      <button
        className="flex absolute right-10 top-1.5 w-6 h-6 justify-center items-center rounded-2xl bg-cyan-700 opacity-30 hover:scale-105 hover:rotate-90 hover:opacity-60 "
        onClick={clickToNext}
      >
        <ArrowPathIcon className='w-5 '></ArrowPathIcon>
      </button>

      <button
        className='flex absolute right-1.5 top-1.5 justify-center items-center w-6 h-6 rounded-2xl bg-cyan-700 opacity-30 hover:scale-105 hover:opacity-60 '
        onClick={clickToColorSetter}
      >
        <PencilSquareIcon className='w-5'></PencilSquareIcon>
      </button>

    </>)
  }

  const index = typeList.findIndex(ob => ob.type === dataType);
  const colors = colorList[index];
  const unit = typeList[index].unit//unitList[index];
  const values = forecast.map(o=>Number(o[`${dataType}`]));
  const lowest = Math.min(...values);
  const range = Math.max(...values)-lowest;

  return (
    <div className=' flex h-48 w-7/12 p-1 pb-0.5 mt-4 bg-blue-900 rounded-lg  relative text-card shadow-lg shadow-blue-900'>
      <ControlTools></ControlTools>

      <div className="flex scroll-smooth md:scroll-auto overflow-x-scroll scrollbar" >
        {
          forecast.map(hour =>{
            const value = hour[`${dataType}`];
            const height = Math.sqrt(0.2+(value-lowest)/range)*50;               //(temp-lowest)/range*60+5
            const color = colors[Math.floor(((value-lowest)/range/3 + 0.33)*10)-3];
            return (<Batten
              time={hour.fxTime}
              value={`${value}`}  // with unit
              h={height}
              c={color}
              iconPath={`/icons/${hour.icon}.svg`}
              key={`${hour.fxTime}forecast`}>
            </Batten>)
          })
        }
      </div>
    </div>
  )
}

function Batten({time, value, h, c, iconPath}){
  return (
    <div className='flex flex-col-reverse w-1/12 shrink-0 items-center text-sm text-white h-44 mx-2 pb-1'>
      <p>{new Date(time).getHours()+':00'}</p>
      <Image width={30} height={30} src={iconPath} alt={"Whoops"}></Image>
      <div
        style={{height:`${h}px`, backgroundColor: `${c}`}}
        className={`my-1 shrink-0 w-1.5 rounded   border-none`}
      >
      </div>
      <p>{value}</p>
    </div>
  )
}
