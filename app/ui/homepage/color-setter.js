import { useState} from "react";

// hints on little boxes, try store
export default function ColorSetter({initialIndex, setDataType, typeList, setColorList,closeHandler, colorList}){
  const [inputColors, setInputColors] = useState(colorList[initialIndex]);
  const tempList = ['', '', '', ''];

  function selectType(e){
    const type = e.target.value;
    const index = typeList.findIndex((ob)=>{return ob.type===type;});
    if (inputColors.every((c, ind)=>c===colorList[ind][ind])) {
      setInputColors(colorList[index]);
    }
    setDataType(type);
  }

  function setInputColor(e, ind){
    const str = e.target.value;
    if (isColorStr(str)){
      const newColors = [...inputColors];
      newColors[ind] = str;
      setInputColors(newColors);
    }
  }

  function debounce(callback, ind, timeNumber= 800) {
    let timer;
    return function (e){
      clearTimeout(timer);
      timer = setTimeout(()=> {callback(e, ind)}, timeNumber);
    }
  }

  const submitInputColors = function (formData){
    const type = formData.get('type');
    const index = typeList.findIndex((ob)=>{return ob.type===type;});
    const newColorList = colorList;
    newColorList[index] = inputColors;
    setColorList(newColorList)
    closeHandler();
  }

  // not good about action, just try form and FormData
  return (
    <div className=' w-40 h-44  text-sm rounded-lg bg-cyan-800 opacity-90 shadow-lg shadow-blue-900 p-1'>
      <form action={submitInputColors}>
        <div className='text-left'>
          <label >
            <select name="type" value={typeList[initialIndex].type} onChange={selectType} className='rounded bg-cyan-700 w-7/12 overflow-hidden hover:scale-105'>
              {typeList.map(ob=> <option
                key={`${ob.text}colorSetter`}
                className='bg-cyan-700'
                value={ob.type}>{ob.text}
              </option>)}
            </select>
          </label>
        </div>

        <div >
          {tempList.map((str, ind)=> { return (
            <div className='flex mt-2' key={`${ind}setColorInput`}>
              <label >{`color ${ind}: `}
                <input
                  type="text"
                  name={ind.toString()}
                  defaultValue={inputColors[ind]}
                  className='w-1/2 rounded bg-cyan-700 pl-0.5'
                  onChange={debounce(setInputColor, ind)}
                />
              </label>
              <div className='shrink-0 w-3 h-3 mt-1 border-none  bg-card' title={inputColors[ind]} style={{backgroundColor:inputColors[ind]}}></div>
            </div>
          )})}
          <button type='submit' className='w-1/3 mt-2.5 rounded bg-blue-500 hover:scale-105'>Set</button>
        </div>
      </form>
    </div>
  )
}

function isColorStr(str){
  const reg = /^#[0-9A-F]{6}$/i;
  return reg.test(str);
}