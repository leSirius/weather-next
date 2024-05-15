
'use client'
import { useState, useEffect } from 'react';

export default function Page() {
  const words = ['hell' ,'hello'];
  const [test,keyDown] = useState(false);

  let word = 'name'
  if (test) {word = true}
  console.log('new onw')
  useEffect(() => {
    console.log('updatedddddddddddddddd')
  }, [word]);

  return (<>
    <button className='w-10 bg-gray-700 h-10' onClick={()=>{keyDown(!test);word='value';console.log(word)}}></button>

  </>



  );
}
