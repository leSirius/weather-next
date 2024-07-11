'use client'
import useSWR from "swr";

const fetcher = url=> fetch(url).then(res =>res.json());

export function useAstroInfoById(id, date, genre, lang='zh') {
  const dateStr = getDateStr(date);
  const url = `/api/astronomy/${genre}?location=${id}&date=${dateStr}&lang=${lang}`;
  return useSWR(url, fetcher)
}

export function useNowById(id){
  const url = `/api/now?location=${id}`;
  const {data,error,isLoading} = useSWR(url, fetcher);
  return {nowData:addUnit(data?.now), error, isLoading};
}

export function useAirById(id, lang='zh') {
  const url = `/api/air?location=${id}&lang=${lang}`;
  const {data, error, isLoading} = useSWR(url, fetcher);
  return {data:data?.now, error, isLoading}
}

//based on geolocation, return one city info
export async function fetchCityByLoc(location) {
  const url = `/api/city?location=${location}`;
  try {
    checkUndefined(location);
    const data = await doFetch(url);
    return data.location[0];
  } catch (e){
    return handleErr(url, e);
  }
}

export async function fetchHourlyById(id) {
  const url =  `/api/hourly?location=${id}`;
  try {
    checkUndefined(id);
    const data = await doFetch(url);
    return data.hourly;
  }
  catch (e) {
    return handleErr(url, e);
  }
}

export async function fetchIndicesById(id, type=0, lang='zh') {
  if (Array.isArray(type)) {type = type.join(',')}
  const url = `/api/indices?location=${id}&type=${type}&lang=${lang}`;
  try {
    checkUndefined(id, type);
    let data = await doFetch(url);
    return data.daily;
  } catch (e){
    return handleErr(url, e);
  }
}

export async function fetchDailyById(id) {
  const url = `/api/daily?location=${id}`;
  try {
    checkUndefined(id);
    const data = await doFetch(url);
    return data.daily;
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

function getDateStr(date) {
  const month = date.getMonth()+1;
  return `${date.getFullYear()}${month<10?`0${month}`:month}${date.getDate()}`;
}

function addUnit(data){
  if (data===void 0||data===null) {return data;}
  const ob = {};
  Object.keys(data).forEach(key=>{
    switch (key) {
      case "temp":{
        ob[key] = `${data[key]}°C`;
        break;
      }
      case "humidity":{
        ob[key] = `${data[key]}%`;
        break;
      }
      case "vis":{
        ob[key] = `${data[key]}km`;
        break;
      }
      case "feelsLike":{
        ob[key] = `${data[key]}°C`;
        break;
      }
      case "precip":{
        ob[key] = `${data[key]}mm`;
        break;
      }
      case "windSpeed":{
        ob[key] = `${data[key]}km/h`;
        break;
      }
      case "pressure":{
        ob[key] = `${data[key]}hPa`;
        break;
      }
      case "obsTime":{
        const date = new Date(data[key]);
        ob[key] = date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit',hour12:false, timeZone:'Asia/Shanghai'});
        break;
      }
      default :{
        ob[key] = data[key];
      }
    }
  })
  return ob;
}
