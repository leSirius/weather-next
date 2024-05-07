import {useRef, useState} from "react";
import clsx from "clsx";
import ColorSetter from "@/app/ui/homepage/middle-borad-widges/color-setter";
import {ArrowPathIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {hidden} from "next/dist/lib/picocolors";

export default function ControlTools({typeInfoList, column, setColumn, colorList, setColorList}){
  const selector = useRef();
  const [showColorSetter, setShowColorSetter] = useState(false);
  const index = typeInfoList.findIndex(ob => ob.type === column);
  const unit = typeInfoList[index].unit;

  function clickToColorSetter() {
    //const colorPanel = document.getElementById('edit-color');
    //colorPanel.hidden = !colorPanel.hidden;
    console.log(showColorSetter)
    setShowColorSetter(!showColorSetter);
  }

  function selectHandler(e) {
    const value = e.target.value;
    if (value!==column){
      setColumn(value);
    }
  }

  function clickToNext() {
    const opList = selector.current.options;
    opList.selectedIndex = (opList.selectedIndex+1)%opList.length;
    selectHandler({'target':selector.current});
  }

  return (<>
    <select
      ref={selector}
      onChange={selectHandler}
      value={column}
      className='absolute top-1.5 left-1.5 w-1/5 rounded border-none text-sm bg-cyan-700 opacity-30 hover:opacity-60 '
    >
      {typeInfoList.map(({type, text}) => <option key={`select${type}`} value={type}>{text} </option>)}
    </select>

    <p className='absolute top-7 left-2 md:top-1 md:left-1/4 opacity-50'>{`Unit: ${unit}`}</p>

    <div className={clsx('absolute top-1.5 right-1.5',{hidden: showColorSetter})} /*id='edit-color'*/ >
      <ColorSetter
        colorList={colorList}
        setColorList={setColorList}
        column={column}
        setColumn={setColumn}
        typeInfoList={typeInfoList}
        //closeMyself={clickToColorSetter}
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

