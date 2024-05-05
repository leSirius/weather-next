import {ArrowPathIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import ColorSetter from "@/app/ui/homepage/color-setter";
import clsx from "clsx";
import {BattenForecast, BattenIndices} from "@/app/ui/homepage/battens";

const defaultColorList = [
  ['#fff49a', '#ffba54', '#ff9d44', '#ff6600'],
  ['#91f4ff', '#54baff', '#449dff', '#0066ff'],
  ['#01ffff', '#00ecfa', '#00cef1', '#00b8ea'],
  ['#bef264', '#84cc16', '#65a30d', '#4d7c0f'],
  ['#c4b5fd', '#a78bfa', '#8b5cf6', '#5b21b6'],
  ['#fca5a5', '#f87171', '#ef4444', '#b91c1c'],
  ['#e4e4e7', '#a1a1aa', '#71717a', '#52525b'],
  ['#fef08a', '#facc15', '#ca8a04', '#a15207'],
]

// try to make it easier to add a new data type,
// only need to change typeList, unit, colors.
// also easier to inject data from another fetch.

export default function  BarGraph({dataList, dataType, setDataType, typeList, witchToShow}){
  const colorJson = sessionStorage.getItem("storedColorList")
  const userColorList = colorJson?JSON.parse(colorJson):null;

  const [colorList, setColorList] = useState(userColorList||defaultColorList);
  const [colorSetter, setColorSetter] = useState(false);
  const selector = useRef();

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
        className='absolute top-1.5 left-1.5 w-1/5 rounded border-none text-sm bg-cyan-700 opacity-30 hover:opacity-60 '
      >
        {typeList.map(({type, text}) => <option key={`select${type}`} value={type}>{text} </option>)}
      </select>

      <p className='absolute top-7 left-2 md:top-1 md:left-1/4 opacity-50'>{`Unit: ${unit}`}</p>

      <div className={clsx('absolute top-1.5 right-1.5', {hidden:!colorSetter})} >
        <ColorSetter
          initialIndex={index}
          setDataType={setDataType}
          typeList={typeList}
          setColorList={setColorList}
          colorList={colorList}
          closeMyself={clickToColorSetter}
        >
        </ColorSetter>
      </div>

      <button
        className="flex absolute right-10 top-1.5 w-6 h-6 justify-center items-center rounded-2xl bg-cyan-700 opacity-30 hover:scale-105 hover:rotate-90 hover:opacity-60 "
        onClick={clickToNext}
        title='next'
      >
        <ArrowPathIcon className='w-5 '></ArrowPathIcon>
      </button>

      <button
        className='flex absolute right-1.5 top-1.5 justify-center items-center w-6 h-6 rounded-2xl bg-cyan-700 opacity-30 hover:scale-105 hover:opacity-60 '
        onClick={clickToColorSetter}
        title='edit color'
      >
        <PencilSquareIcon className='w-5'></PencilSquareIcon>
      </button>
    </>)
  }

  const index = typeList.findIndex(ob => ob.type === dataType);
  const updating = index===-1;
    const colors = colorList[index];
    const unit = typeList[index]?.unit
    const values = dataList.map(o=>Number(o[`${dataType}`]));
    const lowest = Math.min(...values);
    const range = Math.max(...values)-lowest;
//
//
  return (
    <div className=' flex h-48 w-8/12 p-1 pb-0.5 bg-blue-900 rounded-lg  relative text-card shadow-lg shadow-blue-900'>
      {updating? <></>:<>
      <ControlTools></ControlTools>
      <div className="flex scroll-smooth md:scroll-auto overflow-x-scroll scrollbar" >
        <ChooseBatten
          updating={updating}
          dataList={dataList}
          values={values}
          lowest={lowest}
          range={range}
          colors={colors}
          witchToShow={witchToShow}
        ></ChooseBatten>
      </div>
      </>}
    </div>
  )
}

function ChooseBatten({dataList, values, lowest, range, colors, witchToShow, updating}){
  switch (witchToShow) {
    case 0: {
      return (<>{
        dataList.map((hour, hourInd) => {
          const value = values[hourInd];
          const height = calHeight(value, lowest, range);              //(temp-lowest)/range*60+5
          const color = colors[calColorInd(value, lowest, range)];
          return (<BattenForecast
            time={hour.fxTime}
            value={`${value}`}
            height={height}
            color={color}
            iconPath={`${hourInd}/icons/${hour.icon}.svg`}
            key={`${hour.fxTime}bar-graph`}>
          </BattenForecast>)
        })
      }</>)
    }
    case 1: {
      return (<>{
        dataList.map((item, ind) => {
          const value = values[ind];
          const height = calHeight(value, lowest, range);
          const color = colors[calColorInd(value, lowest, range)];
          return (
            <BattenIndices
              name={item.name}
              level={value}
              height={height}
              color={color}
              text={item['text']}
              key={`${witchToShow}bar-graph${item.name}`}
            >
            </BattenIndices>
          )
        })
      }</>)
    }
  }
}

function calColorInd(value, lowest, range) {
  return Math.floor(((value-lowest)/range/3 + 0.33)*10)-3;
}
function calHeight(value, lowest, range) {
  return Math.sqrt(0.2+(value-lowest)/range)*50;
}


/*






*/