//based on the city id, return temporary weather info of the city.
import useSWR from "swr";

const fetcher = url=> fetch(url).then(res =>res.json());

export function useSumById(id, date, genre='sun') {
  const month = date.getMonth()+1;
  const dateStr = `${date.getFullYear()}${month<10?`0${month}`:month}${date.getDate()}`;
  const url = `/api/sun-moon?location=${id}&date=${dateStr}`;
  return useSWR(url, fetcher);
}

export function useNowById(id){
  const url = `/api/now?location=${id}`;
  const {data,error,isLoading} = useSWR(url, fetcher);
  return {nowData:addUnit(data), error, isLoading};
}

export function useAirNowById(id, lang='zh') {
  const url = `/api/air/now?location=${id}&lang=${lang}`;
  return useSWR(url, fetcher);
}

//based on geolocation, return one city info
export async function fetchCityByLoc(location) {
  const url = `/api/city?location=${location}`;
  try {
    checkUndefined(location);
    const data = await doFetch(url);
    return data[0];
  } catch (e){
    return handleErr(url, e);
  }
}

export async function fetchHourlyById(id) {
  const url =  `/api/hourly?location=${id}`;
  try {
    checkUndefined(id);
    const data = await doFetch(url);
    return Array.isArray(data)? data:[];
  }
  catch (e) {
    return handleErr(url, e);
  }


}

export async function fetch5dAirById(id) {
  const url = `/api/air/5d?location=${id}`;
  try {
    checkUndefined(id);
    return await doFetch(url);
  } catch (e){
    return handleErr(url, e);
  }
}

export async function fetchIndicesById(id, type=0, lang='zh') {
  if (Array.isArray(type)) {type = type.join(',')}
  const url = `/api/indices?location=${id}&type=${type}&lang=${lang}`;
  try {
    checkUndefined(id, type);
    return await doFetch(url);
  } catch (e){
    return handleErr(url, e);
  }
}

export async function fetchDailyById(id) {
  const url = `/api/daily?location=${id}`;
  try {
    checkUndefined(id);
    return await doFetch(url);
  } catch (e){
    return handleErr(url, e);
  }
}




function checkUndefined(...params){
  if (params.some(p=>p===void 0)) {
    throw Error(`invalid Parameter`)
  }
}

async function doFetch(url){
  const res = await fetch(url);
  return res.json();
}

function handleErr(url, e){
  console.error(`In data.js, fetch ${url} failed. ${e.message}`);
  return void 0;
}

function addUnit(data){
  if (data===void 0||data===null){return data;}
  const ob = {...data};
  for (const key of Object.keys(ob)){
    switch (key) {
      case "temp":{
        ob[key] = `${ob[key]}°C`;
        break;
      }
      case "humidity":{
        ob[key] = `${ob[key]}%`;
        break;
      }
      case "vis":{
        ob[key] = `${ob[key]}km`;
        break;
      }
      case "feelsLike":{
        ob[key] = `${ob[key]}°C`;
        break;
      }
      case "precip":{
        ob[key] = `${ob[key]}mm`;
        break;
      }
      case "windSpeed":{
        ob[key] = `${ob[key]}km/h`;
        break;
      }
      case "pressure":{
        ob[key] = `${ob[key]}hPa`;
        break;
      }
      case "obsTime":{
        const date = new Date(ob[key]);
        ob[key] = date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit',hour12:false});
        break;
      }
    }
  }
  return ob;
}