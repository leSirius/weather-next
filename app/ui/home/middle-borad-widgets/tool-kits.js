import {useRef, useState} from "react";
import clsx from "clsx";
import ColorSetter from "@/app/ui/home/middle-borad-widgets/color-setter";
import {ArrowPathIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import Clock from "@/app/ui/home/head-board-widget/Clock";

export default function ToolKits({typeInfoList, column, setColumn, colorList, setColorList}){
  //const selector = useRef();
  const [showColorSetter, setShowColorSetter] = useState(false);
  const index = typeInfoList.findIndex(ob => ob.type === column);
  const unit = typeInfoList[index].unit;

  function clickToColorSetter() {
    //const colorPanel = document.getElementById('edit-color');
    //colorPanel.hidden = !colorPanel.hidden;
    setShowColorSetter(!showColorSetter);
  }

  function clickToNext() {
    const  tempInd = typeInfoList.findIndex(ob => ob.type === column);
    const newInd = (tempInd+1)%typeInfoList.length;
    if (tempInd!==newInd){
      setColumn(typeInfoList[newInd].type)
    }

    //const opList = selector.current.options;
    //opList.selectedIndex = (opList.selectedIndex+1)%opList.length;
    //selectHandler({'target':selector.current});
  }

  return (<>
    <p className='absolute top-2 left-3 opacity-50'>{`Unit: ${unit}`}</p>

    <div className={clsx('absolute top-1.5 right-1.5',{hidden: !showColorSetter})} /*id='edit-color'*/ >
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

