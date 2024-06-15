import {useEffect, useState} from "react";

const cached = new Map();

export default function useCachedFetch(id, data, fetchList, initFetch, calColumn) {
  const [prevId, setPrevId] = useState(id);
  const [showData, setShowData] = useState(data);
  const [witchFetch, setWitchFetch] = useState(initFetch);
  const [column, setColumn] = useState(calColumn(initFetch));
  const tempKey = enKey(id, witchFetch);


  if (prevId !== id) { handleChanged('id') }

  //if (prevWitchFetch !== witchFetch) { handleChanged('witchFetch') }

  useEffect(() => {
    cached.set(tempKey, data);
  }, []);


  useEffect(() => {
    fetchList.forEach(async (fetcher, ind)=>{
      if (ind!==witchFetch){
        const received = await fetcher(id);
        cached.set(enKey(id, ind), received);
      }
    })
  }, [prevId]);

  function handleChanged(changedVal, witch=witchFetch) {
    const key = enKey(id, witch);
    if (cached.has(key)) {
      setShowData(cached.get(key));
      setPrev();
      (async ()=>{

      })()
    }
    else {
      (async ()=>{
        const received = await fetchList[witch](id);
        cached.set(key, received);
        setShowData(received);
        setPrev();
      })()
    }
    function setPrev() {
      switch (changedVal) {
        case 'id':
          setPrevId(id);
          break;
        case 'witchFetch':
          setColumn(calColumn(witch, 0));
          break;
      }
    }
  }

  function sWitch(witch) {
    setWitchFetch(witch);
    setColumn(calColumn(witch));
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
