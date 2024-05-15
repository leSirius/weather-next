import {moonIcons} from "@/app/lib/icons";
import {useEffect, useRef, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import clsx from "clsx";

// The point of carousel is to make viewport move between 2 positions.

// slideOn=true -> viewport from 1 to 2 with animation(300ms) -> 350ms  ->
// itemList left shifts, slideOn=false -> viewport from 2 to 1 without animation->
// 1500ms -> slideOn=true...

// toLeft=true, slideOn=true -> viewport from 1 to 0 with animation(300ms) ->350ms->
//  itemList right shifts, toLeft set false, slideOn=false -> viewport 0 to 1 no animation->
// 350ms -> slidOn=true -> ...

// Pac-man has a slightly different control process, so it has its own state.
// mouseOnImage=true stops the alternation of slideOn, while mouseOnImage=false restarts it.

// ! Declaring a function in useEffect, whose dependency is [], might make a closure.
// As codes in useEffect only run in the first render, the function is actually declared only once,
// and context will never change. Be careful about how many times a function is declared,
// and when the called function is declared.

const viewNormal = 1, viewLeft = viewNormal-1, viewRight = viewNormal+1;
const clickInterval = 350;              // time to shift an image is 350, animation of pac-man is 175*2
export default function MoonInfoCarousel({data, today}) {
  const indList = getIndList(0, 4);
  const [slideOn, setSlideOn] = useState(false);
  const [itemList, setItemList] = useState(rightShift(indList.map(ind=>data.moonPhase[ind])));
  const [dotList, ] = useState((indList.map(ind=>data.moonPhase[ind].fxTime)))
  const [mouseOnImage, setMouseOnImage] = useState(false);
  const toLeft = useRef(false);

  useEffect(() => {
    let timerId;
    if (!mouseOnImage) {timerId = setAlternation();}
    return ()=> {clearTimeout(timerId);}

    function setAlternation () {
      return setTimeout(()=>{
        if (slideOn) {!toLeft.current? setItemList(leftShift(itemList)): setItemList(rightShift(itemList));}
        toLeft.current = false;
        setSlideOn(!slideOn);
      }, slideOn? clickInterval:1500);
    }
  }, [slideOn, mouseOnImage]);

  return (
    <div className='relative h-full w-full '>
      <div className='flex justify-between px-1 '>
        <p className=''>{`${today.getMonth()+1}月${today.getDate()}日`}</p>
        <p>{toTimeString(new Date(itemList[!slideOn?viewNormal:!toLeft.current?viewRight:viewLeft].fxTime))}</p>
      </div>

      <Carousel
        itemList={itemList}
        slideOn={slideOn}
        toLeft={toLeft}
        setMouseOnImage={setMouseOnImage}
      ></Carousel>

      <p className='text-sm opacity-70 '>
        {`Illumination: ${itemList[!slideOn ? viewNormal : !toLeft.current ? viewRight : viewLeft].illumination}%`}
      </p>

      <ToolKits
        toLeft={toLeft}
        setSlideOn={setSlideOn}
        slideOn={slideOn}
        dotList={dotList}
        itemList={itemList}
        setItemList={setItemList}
        setMouseOnImage={setMouseOnImage}
      ></ToolKits>
    </div>
  )
}

function Carousel({itemList, slideOn, toLeft, setMouseOnImage}) {
  const lowest = itemList.reduce((acc, item)=>{
    const val = Number(item.illumination)
    return val<acc? val:acc;
  }, Infinity);
  const range = itemList.reduce((record, item) =>{
    const val = Number(item.illumination)
    return val-lowest>record? val-lowest:record;
  }, 0);

  return (
    <div className='overflow-x-hidden w-full '>
      <div
        style={{transform: `translateX(${!slideOn?'-100%': !toLeft.current?'-200%':'0%'})`}}
        className={clsx('flex transition-transform ease-in-out',
          {'duration-300':slideOn,'duration-0':!slideOn})}                                //Duration
      >
        {itemList.map((item)=> { return (
          <div key={item.fxTime} className='shrink-0  w-full '>
            <div className='my-0 mx-auto w-7/12 rounded-full shadow-[0px_0px_36px_3px_rgba(200,200,200,1)]'
              style={{opacity: `${20+(Number(item.illumination)-lowest)/range*80}%`}}
              onMouseEnter={()=> {setMouseOnImage(true);}}
              onMouseLeave={()=> {setMouseOnImage(false);}}
            >
              {moonIcons(item.icon, '100%', 'white', )}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

// When controlled by pac-man, carouse animation won't show up, but pac-man should still eat,
// which means it will set slideOn false, shift itemList, but just use its own animation.
// Moreover, when pac-man move to a left image, it sets toLeft true and slideOn false at exactly same time,
// not an issue, if carousel is controlled by timer next time, but if click right arrow, the viewport will move left,
// as toLeft is set true, but not clean up yet.
function ToolKits({toLeft, setSlideOn, slideOn, dotList, itemList, setItemList, setMouseOnImage}) {
  const [clickedOnDot, setClickedOnDot] = useState(0);
  // 0: no click; 1: click at left; 2: click at right.
  const goEat = clickedOnDot!==0||slideOn
  const eatLeft = toLeft.current||clickedOnDot===1;
  const eatRight = !eatLeft;
  const tempImgTime = !slideOn? itemList[viewNormal].fxTime :
    eatLeft? itemList[viewLeft].fxTime : itemList[viewRight].fxTime;

  useEffect(()=>{
    const timerId = clickedOnDot!==0?
      setTimeout(()=>{setClickedOnDot(0)}, clickInterval): void 0;
    return ()=>{clearTimeout(timerId)}
  }, [clickedOnDot])

  function clickToImage(e) {
    const tempInd = dotList.findIndex(ft=>ft===tempImgTime);
    const targetInd = dotList.findIndex(ft=>ft===e.target.value);
    if (targetInd===tempInd) {return ;}
    const newItemList = targetInd<tempInd?
      rShitUtilFt1Is(itemList, dotList[targetInd]):
      lShitTillFt1Is(itemList, dotList[targetInd]);
    setSlideOn(false);
    setItemList(newItemList);
    setClickedOnDot(targetInd<tempInd? 1:2);
  }

  return (<>
    <div className='absolute left-0 top-[83%] max-sm:top-[85%] text-card hover:opacity-30 hover:scale-125'>
      <button onClick={()=>{toLeft.current=true;setSlideOn(true);}} className='border-none'><ChevronLeftIcon width={24}></ChevronLeftIcon></button>
    </div>
    <div className='absolute right-0 top-[83%] max-sm:top-[85%] text-card hover:opacity-30 hover:scale-125'>
      <button onClick={()=>{setSlideOn(true)}} className='border-none'><ChevronRightIcon width={24}></ChevronRightIcon></button>
    </div>

    <div className='absolute flex justify-evenly  w-3/4 left-[12.5%] top-[91.5%] '>
      {dotList.map((fxTime)=> { return (
        <button
          key={fxTime}
          value={fxTime}
          onMouseEnter={()=> {setMouseOnImage(true);}}
          onMouseLeave={()=> {setMouseOnImage(false);}}
          onClick={clickToImage}
          className={clsx(
            'hover:opacity-50',
            {'w-2 h-2 mx-1 mt-1 bg-cyan-600 rounded': tempImgTime!==fxTime}
          )}
        >
          <PacManDot
            fxTime={fxTime}
            tempImgTime={tempImgTime}
            goEat={goEat}
            eatLeft={eatLeft}
            eatRight={eatRight}
          ></PacManDot>
        </button>
      )})}
    </div>
  </>)
}

function PacManDot({fxTime, tempImgTime, goEat, eatLeft, eatRight}) {
  return (
    <>
      <div className={clsx(
        'w-4 rounded-t-lg bg-cyan-500',
        {
          'h-2 ': tempImgTime===fxTime,
          'animate-rotate-counterclockwise': goEat&&eatRight,
          'animate-rotate-clockwise': goEat&&eatLeft
        }
      )}></div>
      <div className={clsx(
        'w-4 rounded-b-lg bg-cyan-500',
        {
          'h-2': tempImgTime===fxTime,
          'animate-rotate-clockwise': goEat&&eatRight,
          'animate-rotate-counterclockwise': goEat&&eatLeft
        }
      )}></div>
    </>
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

function lShitTillFt1Is(list, ft) {
  return list[1].fxTime===ft? list: lShitTillFt1Is(leftShift(list), ft);
}

function rightShift(list) {
  const len = list.length;
  return [list[len-1], ...list.slice(0,len-1)];
}

function rShitUtilFt1Is(list, ft) {
  return list[1].fxTime===ft? list: rShitUtilFt1Is(rightShift(list), ft);
}

