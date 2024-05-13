import {useAstroInfoById} from "@/app/lib/data";
import {moonIcons} from "@/app/lib/icons";
import {useEffect, useRef, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import clsx from "clsx";

// ! Declaring a function in useEffect, when it's dependency is [], might make a closure.
// As codes in useEffect only run in the first render, the function is declared only once,
// and context will never change. Be careful about how many times a function is declared.
// change refToList to a state
export default function MoonInfoCarousel({data, today}) {
  const [slideOn, setSlideOn] = useState(false);
  const [mouseOnImage, setMouseOnImage] = useState(false);
  const refToList = useRef(null);
  const toLeft = useRef(false);
  const indList = getIndList(0, 4);

  useEffect(() => {
    let timerId;
    if (!mouseOnImage){
      if (!slideOn){ timerId = setTimeout(()=>{setSlideOn(true);}, 1500); }
      else {
        timerId = setTimeout(()=>{
          if (!toLeft.current) { refToList.current = leftShift(refToList.current); }
          else { refToList.current = rightShift(refToList.current); toLeft.current = false; }
          setSlideOn(false);
        }, 350);
      }
    }
    return ()=>{ clearTimeout(timerId); }
  }, [slideOn, mouseOnImage]);

  if (!refToList.current) { refToList.current = rightShift(indList.map(ind=>data.moonPhase[ind])); }
  const itemList = [...refToList.current];

  function clickToLeft() {
    setSlideOn(true);
    toLeft.current = true;
  }

  return (
    <div className='relative'>
      <div className='flex justify-between px-1 '>
        <p className=''>{`${today.getMonth()+1}月${today.getDate()}日`}</p>
        <p>{toTimeString(new Date(itemList[!slideOn?1:!toLeft.current?2:0].fxTime))}</p>
      </div>

      <div className='overflow-hidden w-full'>
        <div
          style={{transform: `translateX(${!slideOn?'-100%':!toLeft.current?'-200%':'0%'})`}}
          className={clsx('flex transition-transform ease-in-out ',
            {'duration-300':slideOn,'duration-0':!slideOn})}
        >
          {itemList.map((item)=>{
            return (
              <div key={item.fxTime} className='shrink-0 bg-sky-700 w-full text-center'>
                <div className='my-0 mx-auto w-7/12'
                     onMouseEnter={()=> {setMouseOnImage(true);}}
                     onMouseLeave={()=> {setMouseOnImage(false);}}
                >
                  {moonIcons(item.icon, '100%', 'white')}
                </div>
                <p className='text-sm opacity-70'>{`Illumination: ${item.illumination}%`}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className='absolute right-6 top-[95%] text-card '>
        <button onClick={clickToLeft}><ChevronLeftIcon width={24}></ChevronLeftIcon></button>
      </div>
      <div className='absolute right-0 top-[95%] text-card'>
        <button onClick={()=>{setSlideOn(true)}}><ChevronRightIcon width={24}></ChevronRightIcon></button>
      </div>
    </div>
  )
}

function getIndList(temp=0, pace=4) {
  if (temp>=24) {return [];}
  return [temp, ...getIndList(temp+pace, pace)];
}

function toTimeString(date) {
  return date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit',hour12:false});
}

function leftShift(list) {
  return [...list.slice(1), list[0]];
}

function rightShift(list) {
  const len = list.length;
  return [list[len-1], ...list.slice(0,len-1)];
}