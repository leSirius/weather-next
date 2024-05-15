import {moonIcons} from "@/app/lib/icons";
import {useEffect, useRef, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import clsx from "clsx";

// The point of carousel is to make viewport move between 2 positions.

// slideOn=true ->(render) viewport from 1 to 2 with animation(300ms) -> 350ms  ->
// itemList left shifts, slideOn=false ->(render) viewport from 2 to 1 without animation->
// 1500ms -> slideOn=true...

// toLeft=true, slideOn=true ->(render)  viewport from 1 to 0 with animation(300ms) -> 350ms->
// itemList right shifts, toLeft set false, slideOn=false ->(render) viewport 0 to 1 no animation->
// 1500ms -> slidOn=true -> ...

// Pac-man has a slightly different control process, so it has its own state.
// mouseOnImage=true stops the alternation of slideOn, while mouseOnImage=false restarts it.

// ! Declaring a function in useEffect, whose dependency is [], might make a closure.
// As codes in useEffect only run in the first render, the function is actually declared only once,
// and context will never change. Be careful about how many times a function is declared,
// and when the called function is declared.

const viewNormal = 1, viewLeft = viewNormal-1, viewRight = viewNormal+1;
const clickInterval = 510;              // time to shift an image is 400, animation of pac-man is 250*2
export default function MoonInfoCarousel({data, today}) {
  const indList = getIndList(0, 4);
  const [slideOn, setSlideOn] = useState(false);
  const [itemList, setItemList] = useState(rightShift(indList.map(ind=>data.moonPhase[ind])));
  const [dotList, ] = useState((indList.map(ind=>data.moonPhase[ind].fxTime)))
  const [mouseOnImage, setMouseOnImage] = useState(false);
  const [toLeft, setToLeft] = useState(false);
  const timerRef = useRef(void 0);

  useEffect(() => {
    if (!mouseOnImage)  {
      timerRef.current = setAlternation();
    }
    return ()=> { clearTimeout(timerRef.current); }
  }, [slideOn, mouseOnImage]);

  function handleMouseEnter (){
    //console.log('enter')
    if (slideOn) {
      !toLeft? setItemList(leftShift(itemList)): setItemList(rightShift(itemList));
      //console.log('rare condition')
    }
    setToLeft(false);
    setSlideOn(false);

    setMouseOnImage(true);
  }

  function handleMouseLeave() {
    setMouseOnImage(false);
  }

  function setAlternation () {
    return setTimeout(()=>{
      if (slideOn) {!toLeft? setItemList(leftShift(itemList)): setItemList(rightShift(itemList));}
      setToLeft(false);
      setSlideOn(!slideOn);
    }, slideOn? clickInterval:1500);
  }

  return (
    <div className='relative h-full w-full '>
      <div className='flex justify-between px-1 '>
        <p className=''>{`${today.getMonth()+1}月${today.getDate()}日`}</p>
        <p>{toTimeString(new Date(itemList[!slideOn?viewNormal:!toLeft?viewRight:viewLeft].fxTime))}</p>
      </div>

      <Carousel
        itemList={itemList}
        slideOn={slideOn}
        toLeft={toLeft}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      ></Carousel>

      <p className='text-sm opacity-70 '>
        {`Illumination: ${itemList[!slideOn ? viewNormal : !toLeft ? viewRight : viewLeft].illumination}%`}
      </p>

      <ToolKits
        toLeft={toLeft}
        setToLeft={setToLeft}
        setSlideOn={setSlideOn}
        slideOn={slideOn}
        dotList={dotList}
        itemList={itemList}
        setItemList={setItemList}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      ></ToolKits>
    </div>
  )
}

function Carousel({itemList, slideOn, toLeft, handleMouseEnter, handleMouseLeave}) {
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
        style={{transform: `translateX(${!slideOn?'-100%': !toLeft?'-200%':'0%'})`}}
        className={clsx('flex transition-transform ease-in-out',
          {'duration-[400ms]':slideOn,'duration-0':!slideOn})}                                //Duration
      >
        {itemList.map((item)=> { return (
          <div key={item.fxTime} className='shrink-0  w-full '>
            <div className='my-0 mx-auto w-7/12 rounded-full shadow-[0px_0px_36px_3px_rgba(200,200,200,1)]'
              style={{opacity: `${20+(Number(item.illumination)-lowest)/range*80}%`}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
function ToolKits({toLeft, setToLeft, setSlideOn, slideOn, dotList, itemList, setItemList, handleMouseEnter, handleMouseLeave}) {
  const [clickedOnDot, setClickedOnDot] = useState(0);
  // 0: no click; 1: click at left; 2: click at right.
  const goEat = slideOn||clickedOnDot!==0;
  const eatLeft = slideOn? toLeft: clickedOnDot===1;
  const eatRight = !eatLeft;
  const tempImgTime = !slideOn? itemList[viewNormal].fxTime :
    eatLeft? itemList[viewLeft].fxTime : itemList[viewRight].fxTime;

  useEffect(()=>{
    let timerId;
    if (clickedOnDot!==0) {
      timerId = setTimeout(()=>{setClickedOnDot(0)},clickInterval);
    }
    return ()=>{clearTimeout(timerId)}
  }, [clickedOnDot])

  function clickToImage(e) {
    if (e.target.value===void 0) {return ;}
    const tempInd = dotList.findIndex(ft=>ft===tempImgTime);
    const targetInd = dotList.findIndex(ft=>ft===e.target.value);
    const newItemList = targetInd<tempInd?
      rShitUtilFt1Is(itemList, dotList[targetInd]):
      lShitTillFt1Is(itemList, dotList[targetInd]);
    //setSlideOn(false);
    setItemList(newItemList);
    setClickedOnDot(targetInd<tempInd? 1:2);
  }

  return (<>
    <div className='absolute flex justify-evenly  w-3/4 left-[12.5%] top-[91.5%] bg-sky-800 rounded-lg' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {dotList.map((fxTime)=> { return (
        <PacManDot
          key={fxTime}
          fxTime={fxTime}
          tempImgTime={tempImgTime}
          goEat={goEat}
          eatLeft={eatLeft}
          eatRight={eatRight}
          clickToImage={clickToImage}
        ></PacManDot>
      )})}
    </div>

    <div className='absolute left-0 top-[83%] max-sm:top-[85%] text-card hover:opacity-30 hover:scale-125'>
      <button onClick={()=>{setToLeft(true);setSlideOn(true);}} className='border-none'>
        <ChevronLeftIcon width={24}></ChevronLeftIcon>
      </button>
    </div>

    <div className='absolute right-0 top-[83%] max-sm:top-[85%] text-card hover:opacity-30 hover:scale-125'>
      <button onClick={()=>{setSlideOn(true)}} className='border-none'>
        <ChevronRightIcon width={24}></ChevronRightIcon>
      </button>
    </div>

  </>)
}

function PacManDot({fxTime, tempImgTime, clickToImage, goEat, eatLeft, eatRight}) {
  return (<>
      <button value={fxTime} onClick={clickToImage} className={clsx('hover:opacity-50',{'w-2 h-2 mx-1 mt-1 bg-cyan-600 rounded': tempImgTime!==fxTime})}>
        <div className={clsx('w-4 rounded-t-lg bg-cyan-500', {
          'h-2 ': tempImgTime === fxTime,
          'animate-rotate-counterclockwise': eatRight&&goEat&&tempImgTime === fxTime,
          'animate-rotate-clockwise': eatLeft&&goEat&&tempImgTime === fxTime
        })}></div>

        <div className={clsx('w-4 rounded-b-lg bg-cyan-500',{
          'h-2': tempImgTime === fxTime,
          'animate-rotate-clockwise': eatRight&&goEat&&tempImgTime === fxTime,
          'animate-rotate-counterclockwise': eatLeft&&goEat&&tempImgTime === fxTime
        })}></div>
      </button>
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

