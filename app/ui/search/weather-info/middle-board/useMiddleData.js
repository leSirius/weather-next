import {useEffect, useState} from "react";
import {fetchDailyById, fetchHourlyById, fetchIndicesById} from "@/app/lib/data-home";

const cached = {}
const fetchList = [fetchHourlyById, fetchIndicesById, fetchDailyById];
function setCache(ind, data){ cached[ind] = deepCopyObList(data); }

export function useMiddleData(id, initData, initWitch=0) {
  const [dataMatrix, setDataMatrix] = useState(deepCopyObList(initData));
  const [witchFetch, setWitchFetch] = useState(witchFetch);
  let reTried = 0;

  useEffect(() => {
    const timerId = setInterval(fetchAll, 60000);
    fetchList.forEach(async (fetcher, ind)=>{
      cached[ind] = ind===initWitch? deepCopyObList(initData): await fetcher(id);
    });
    return ()=>{clearInterval(timerId);}
  }, []);

  function fetchAll() {
    fetchList.forEach(async (fetcher, ind)=>{cached[ind]  = await fetcher(id);});
  }

  async function fetchAt(ind) {
    cached[ind] = await fetchList[ind](id);
  }

  function setTempData(id, ind) {
    if (ind===witchFetch) {
      (async ()=>{
        const data = await fetchAt(ind);
        if (!compareObList(dataMatrix, data)){
          setDataMatrix(data);
        }
      })();
    }
  }


  return [dataMatrix, setTempData];
}

function compareObList(arr1, arr2) {
  return arr1.every((ob, ind)=>{
    return Object.keys(ob).every((key)=>{
      return ob[key]===arr2[ind][key];
    })
  })
}

function deepCopyObList(arr) {
  return arr.map(ob=>{return {...ob}});
}
