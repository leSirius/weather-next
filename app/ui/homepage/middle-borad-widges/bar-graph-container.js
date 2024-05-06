import {useState} from "react";
import ControlTools from "@/app/ui/homepage/middle-borad-widges/control-tools";
import {MapBattens} from "@/app/ui/homepage/middle-borad-widges/battens";
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

export default function  BarGraphContainer({dataMatrix, column, setDataType, typeInfoList}){
  const colorJson = sessionStorage.getItem("storedColorList")
  const userColorList = colorJson?JSON.parse(colorJson):null;
  const [colorList, setColorList] = useState(userColorList||defaultColorList);

  return (
    <div className=' flex h-48 w-8/12 p-1 pb-0.5 bg-blue-900 rounded-lg  relative text-card shadow-lg shadow-blue-900'>
      <ControlTools
        typeList={typeInfoList}
        dataType={column}
        setDataType={setDataType}
        colorList={colorList}
        setColorList={setColorList}
      ></ControlTools>

      <div className="flex scroll-smooth md:scroll-auto overflow-x-scroll scrollbar" >
        <MapBattens
          dataMatrix={dataMatrix}
          column={column}
          colors={colorList[typeInfoList.findIndex(ob => ob.type === column)]}
        ></MapBattens>
      </div>

    </div>
  )
}

/*






*/