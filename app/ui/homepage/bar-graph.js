import {ArrowPathIcon, PlusIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useRef, useState} from "react";

// try to make it easier to add a new data type,
// only need to change typeList, unit, colors.
export default function  BarGraph({forecast}){
  const typeList = [
    {type:'temp',text:'Temperature'},
    {type:'humidity', text:'Humidity'},
    {type:'windSpeed', text:"WindSpeed"}
  ]
  const colorList = [
    ['#fff49a', '#ffba54', '#ff9d44', '#ff6600'],
    ['#91f4ff', '#54baff', '#449dff', '#0066ff'],
    ['#01ffff', '#00ecfa', '#00cef1', '#00b8ea']
  ];
  const unitList = ['°', '%', ''];

  const [dataType, setDataType] = useState(typeList[0].type);
  const selector = useRef(null);

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

  function addShowData() {

  }

  function ControlTools(){
    return (<>
      <button
        className="flex justify-center items-center w-6 h-6 rounded-2xl bg-cyan-700 opacity-30 hover:opacity-70 absolute right-8 top-1"
        onClick={clickToNext}
      >
        <ArrowPathIcon className='w-5 '></ArrowPathIcon>
      </button>

      <button
        className='flex justify-center items-center w-6 h-6 rounded-2xl bg-cyan-700 opacity-30 hover:opacity-70 absolute right-1 top-1'
        onClick={addShowData}
      >
        <PlusIcon className='w-5'></PlusIcon>
      </button>

      <select
        ref={selector}
        onChange={selectHandler}
        value={dataType}
        className='absolute top-1 left-1 rounded border-none text-sm bg-cyan-700 opacity-30 hover:opacity-70'
      >
        {typeList.map(({type, text}) => <option key={`select${type}`} value={type}>{text}</option>)}
      </select>
    </>)
  }

  const index = typeList.findIndex(ob => ob.type === dataType);
  const colors = colorList[index];
  const unit = unitList[index];
  const values = forecast.map(o=>Number(o[`${dataType}`]));
  const lowest = Math.min(...values);
  const range = Math.max(...values)-lowest;

  return (
    <div className='w-9/12 p-1 pb-0.5 bg-blue-900 rounded-lg mt-4 relative text-white'>
      <ControlTools></ControlTools>

      <div className="flex scroll-smooth md:scroll-auto overflow-x-scroll scrollbar" >
        {
          forecast.map(hour =>{
            const value = hour[`${dataType}`];
            const height = Math.sqrt(0.2+(value-lowest)/range)*50;               //(temp-lowest)/range*60+5
            const color = colors[Math.floor(((value-lowest)/range/3 + 0.33)*10)-3];
            return (<Batten
              time={hour.fxTime}
              value={`${value}${unit}`}  // with unit
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

/*
const typeList = [
  {type:'temp',text:'Temperature'},
  {type:'humidity', text:'Humidity'},
  {type:'windSpeed', text:"WindSpeed"}
]
const colorList = [
  ['#fff49a', '#ffba54', '#ff9d44', '#ff6600'],
  ['#91f4ff', '#54baff', '#449dff', '#0066ff'],
  ['#01ffff', '#00ecfa', '#00cef1', '#00b8ea']
];
const unitList = ['°', '%', ''];
  const [typeList, setTypeList] = useState([
    {type:'temp',text:'Temperature'},
    {type:'humidity', text:'Humidity'},
    {type:'windSpeed', text:"WindSpeed"}
  ])
  const [colorList, setColorList] = useState([
    ['#fff49a', '#ffba54', '#ff9d44', '#ff6600'],
    ['#91f4ff', '#54baff', '#449dff', '#0066ff'],
    ['#01ffff', '#00ecfa', '#00cef1', '#00b8ea']
  ]);
  const [unitList, setUnitList] = useState(['°', '%', '']);
*/