
'use client'
import { useState, useEffect } from 'react';


export default function Page() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    function handleMove(e) {
        //console.log("moved", e.clientX, e.clientY)
      setPosition({ x: e.clientX, y: e.clientY });
    }
    function printCounter (){
      console.log(c);
    }
    const c = counter;
    //window.addEventListener('pointermove', handleMove);
    window.addEventListener('mousemove', printCounter)
    return () => {
      window.removeEventListener('mousemove', printCounter)
      //window.removeEventListener('pointermove', handleMove);
    };
  }, [counter]);

  return (<>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      >
      </div>
      <p onClick={()=>{setCounter(counter+1);console.log(counter)}}>adddd!</p>
  </>



  );
}
