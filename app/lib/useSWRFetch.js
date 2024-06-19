import {useEffect, useRef, useState, useContext } from "react";
import {fetchMiddleClient} from "@/app/lib/data-search";
import {SetWitchFetchContext} from "@/app/lib/witch-context";
import {calWitchFetch, witchList} from "@/app/lib/middleInfo";

const cached = new Map();

export default function useSWRFetch(id, data, calColumn) {
  const [showData, setShowData] = useState(data.info);
  const witchFetch = calWitchFetch(showData);
  const [column, setColumn] = useState(calColumn(witchFetch));
  const isInit = useRef(true);
  const prevId = useRef(id);
  const tempKey = enKey(id, witchFetch);
  const setWitchContext = useContext(SetWitchFetchContext);


  useEffect(() => {
    cached.set(tempKey, {info:data.info, time:data.time})              // new id means new data
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

  function handleChanged(changedVal, witch=witchFetch) {
    const key = enKey(id, witch);
    if (cached.has(key)) {
      setShowData(cached.get(key).info);
      setPrev();
      (async ()=> {
        const newData = await fetchMiddleClient(id, witch, cached.get(key).time);
        newData && cached.set(key, newData);
        newData && setShowData(newData.info)
      })()
    }
    else {
      (async ()=>{
        const received = await fetchMiddleClient(id, witch);
        cached.set(key, received);
        setShowData(received);
        setPrev();
      })()
    }
    function setPrev() {
      switch (changedVal) {
        case 'id':
          break;
        case 'witchFetch':
          setWitchContext(witchList[witch].genre);
          setColumn(calColumn(witch, 0));
          break;
      }
    }
  }

  function sWitch(witch) {
    handleChanged('witchFetch', witch);
  }
  return [showData, witchFetch, sWitch, column, setColumn];
}

function enKey(id, ind) {
  return `${id},${ind}`
}

function deKey(str) {
  const [id, ind] = str.split(',');
  return [id, Number(ind)];
}
