import {useEffect, useState} from "react";
import clsx from "clsx";

// hints on little boxes, try store
// An issue in line 38 (hopefully still here), noted by !!!.
// Shallow copy can be used to update state, but risky, not knowing why.
// pattern and onInvalid doesn't work well with input tags, not knowing why

export default function ColorSetter({colorList, setColorList, column, setColumn, typeInfoList, closeMyself}){
  const index = calIndex(column)
  const [inputColors, setInputColors] = useState(colorList[index]);
  const tempList = ['', '', '', ''];

  const [prevColumn, setPrevColumn] = useState(column);
  if (column !== prevColumn){
    setPrevColumn(column);
    setInputColors(colorList[index]);
  }

  /* using key for all states update,
  using above method(another state) for partial states should be better
  useEffect(() => {
    //const ind = calIndex(column);
    setInputColors(colorList[index]);
  }, [column]);
  */

  function calIndex(target){
    return typeInfoList.findIndex(ob => ob.type === target);
  }

  function selectType(e){
    const newType = e.target.value;
    const newIndex = calIndex(newType);
    setInputColors(colorList[newIndex]);
    setColumn(newType);
  }

  function inputtingColor(e, ind){
    const str = e.target.value;
    const newColors = [...inputColors];
    newColors[ind] = str;
    setInputColors(newColors);
  }

  function submitInputs(e) {
    e.preventDefault();
    if (inputColors.every(c=>isValidColor(c)) &&
      inputColors.some((c,ind)=>c!==colorList[index][ind])
    ){
      const newColorList = [...colorList];
      newColorList[index] = inputColors;
      setColorList(newColorList);
      sessionStorage.setItem('storedColorList', JSON.stringify(newColorList));
    }
  }

  return (
    <div className=' w-40 h-44  text-sm rounded-lg bg-cyan-800 opacity-90 shadow-lg shadow-blue-900 p-1'>
      <form onSubmit={submitInputs}>
        <div className='text-left'>
          <label >
            <select name="type" value={column} onChange={selectType} className='rounded bg-cyan-700 w-7/12 overflow-hidden hover:scale-105'>
              {typeInfoList.map(ob=> <option
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
                  maxLength='7'
                  value={`${inputColors[ind]}`}
                  className={clsx('w-1/2 rounded bg-cyan-700 pl-0.5')}
                  onChange={ (e)=>{inputtingColor(e,ind)}}                  //debounce(setInputColor, ind)}
                  required
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


function isValidColor(str){
  const reg = /^#[0-9A-F]{6}|[0-9A-F]{3}$/i;
  return reg.test(str);
}

/*
function debounce(callback, ind, timeNumber=400) {
  let timer;
  return function (e){
    clearTimeout(timer);
    timer = setTimeout(()=> {callback(e, ind)}, timeNumber);
  }
}

  function delegation(e) {
    const target = e.target;
    const ind = Number(target.name);
    const inputting = e.target.value;
    const newColors = [...inputColors];
    newColors[ind] = inputting;
    setInputColors(newColors);
  }

  const submitInputColors = function (formData){
    const type = formData.get('type');
    const index = calIndex(type);
    if (
      inputColors.some((c,ind)=>c!==colorList[index][ind]) &&
      inputColors.every((c)=>isValidColor(c))
    ){
      const newColorList = [...colorList];
      newColorList[index] = inputColors;
      setColorList(newColorList);
      sessionStorage.setItem('storedColorList', JSON.stringify(newColorList));
      //closeMyself();
    }
  }
 */