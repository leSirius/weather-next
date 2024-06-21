import {useEffect, useRef, useState, useContext } from "react";
import {fetchMiddleClient} from "@/app/lib/data-search";
import {SetWitchFetchContext} from "@/app/lib/witch-context";
import {calWitchFetch, witchList, calColumn} from "@/app/lib/middleInfo";

const cached = new Map();

export default function useSWRFetch(id, data) {
  const [showData, setShowData] = useState(data.info);
  const witchFetch = calWitchFetch(showData);
  const [column, setColumn] = useState(calColumn(witchFetch));
  const isInit = useRef(true);
  const prevId = useRef(id);
  const setWitchContext = useContext(SetWitchFetchContext);
  const tempIdWitch = useRef({id,witchFetch});

  useEffect(() => {
    tempIdWitch.current.id = id;
    cached.set(calWitchFetch(data), {info:data.info, time:data.time})              // new id means new data
    if (prevId.current !== id) {
      prevId.current = id;
    }
    if (isInit.current) { isInit.current = false; }
    else { fetchOthers(); }
  }, [id]);

  useEffect(() => {
    let setListener = false;
    if (document.readyState==='complete') { fetchOthers(); }
    else {
      setListener = true;
      window.addEventListener('load', fetchOthers);
    }
    return ()=>{ setListener && window.removeEventListener('load', fetchOthers); }
  }, []);

  function fetchOthers() {
    witchList.forEach(async (ob, ind)=>{
      if (ind!==witchFetch && !cached.has(enKey(id, ind))){
        const received = await fetchMiddleClient(id, ind);
        cached.set(enKey(id, ind), received);
      }
    })
  }

  function onWitchChange(witch=witchFetch) {
    tempIdWitch.current = {id:id, witchFetch: witch};
    const key = enKey(id, witch);
    if (cached.has(key)) {
      setShowData(cached.get(key).info);
      otherEffects();
      (async ()=> {
        const newData = await fetchMiddleClient(id, witch, cached.get(key).time);
        if (newData && tempIdWitch.current.id===id && tempIdWitch.current.witchFetch===witch) {
          cached.set(key, newData);
          setShowData(newData.info);
          otherEffects();
        }
      })()
    }
    else {
      (async ()=>{
        const received = await fetchMiddleClient(id, witch);
        if (tempIdWitch.current.id===id && tempIdWitch.current.witchFetch===witch) {
          cached.set(key, received);
          setShowData(received.info);
          otherEffects();
        }
      })()
    }
    function otherEffects() {
      setWitchContext(witchList[witch].genre);
      setColumn(calColumn(witch, 0));
    }
  }

  return [showData, witchFetch, onWitchChange, column, setColumn];
}

function enKey(id, ind) {
  return `${id},${ind}`
}

