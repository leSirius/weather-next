'use client'
import {createContext, useRef, useState} from "react";

export const WitchFetchContext = createContext('');
export const SetWitchFetchContext = createContext(null);

export default function WitchContext({children}) {
 const [witchFetch,setWitchFetch] = useState('hourly')
 return (
   <WitchFetchContext.Provider value ={witchFetch}>
    <SetWitchFetchContext.Provider value={setWitchFetch}>
      {children}
    </SetWitchFetchContext.Provider>
   </WitchFetchContext.Provider>
 )
}