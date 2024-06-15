import clsx from "clsx";

export default function PanelServer({buttonList, iconList, typeInfoList, column, setColumn, witchFetch, sWitch}) {
  function handleWheel(e){
    const  tempInd = typeInfoList.findIndex(ob => ob.type === column);
    const  newInd = e.deltaY>0?
        Math.min(typeInfoList.length-1, tempInd+1):
        Math.max(0, tempInd-1);
    if (tempInd!==newInd){
      setColumn(typeInfoList[newInd].type)
    }
  }

  function selectHandler(e) {
    const value = e.target.value;
    if (value!==column){
      setColumn(value);
    }
  }
  console.log(witchFetch)
  return (
    <div className='col-span-1 bg-cyan-800 opacity-95 rounded-lg shadow-lg shadow-cyan-900' onWheel={handleWheel}>
      <div className='flex-grow flex justify-evenly h-24 md:pt-4
      max-sm:flex-col max-sm:pt-4 max-sm:pl-4 max-sm:h-36'
      >
        {buttonList.map((choice, ind) =>{
          const ButtonIcon = iconList[ind];
          console.log(ind===witchFetch)
          return (
            <div className='md:w-1/4 h-12 text-white' key = {`panel${choice}`}>
              <button
                className={
                  clsx('flex justify-center w-full outline-none outline-1 h-12 pt-3 bg-teal-600 hover:opacity-75 rounded-2xl border-none overflow-hidden max-sm:rounded-lg max-sm:w-3/4 max-sm:h-8 max-sm:pt-1',
                  {'opacity-55': ind===witchFetch})
                }
                onClick={()=>{sWitch(ind);}}
                title = {choice}
              >
                <ButtonIcon width='25' ></ButtonIcon>
              </button>
            </div>
          )
        })}
      </div>
      <div className='max-sm:pt-0.5'>
        <select
          //ref={selector}
          onChange={selectHandler}
          value={column}
          className='w-1/2 h-5 block mx-auto rounded border-none text-sm bg-cyan-600 opacity-70 hover:opacity-95 max-sm:w-3/4'
        >
          {typeInfoList.map(({type, text}) => <option key={`select${type}`} value={type}>{text} </option>)}
        </select>
      </div>

    </div>

  )
}
