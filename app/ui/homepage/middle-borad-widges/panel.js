import {useState} from "react";

export function Panel({setter, buttonList, iconList}) {
  function makeChoice(ind){
    setter(ind);
  }

  return (
    <div className='flex-grow flex justify-evenly h-48  bg-cyan-800 opacity-95 rounded-lg md:pt-10
      max-sm:flex-col max-sm:pl-4 max-sm:pb-6'
    >
      {buttonList.map((choice, ind) =>{
        const ButtonIcon = iconList[ind];
        return (
          <div className='md:w-1/4 h-12' key = {`panel${choice}`}>
            <button
              className='flex justify-center w-full h-12 pt-3 bg-teal-600 opacity-70 hover:opacity-95 rounded-2xl border-none overflow-hidden
                max-sm:rounded-lg max-sm:w-3/4 max-sm:h-8 max-sm:pt-1'
              onClick={()=>{makeChoice(ind)}}
              title = {choice}
            >
              <ButtonIcon width='25' ></ButtonIcon>
            </button>
          </div>
        )
      })}
    </div>
  )
}
