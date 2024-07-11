//import {astronomy, hourly, now, cities, indices, daily} from "@/app/api/lib/cached-data";
import {witchList} from "@/app/lib/middleInfo";

const baseUrls = {
  cities: 'https://geoapi.qweather.com/v2/city/top',
  lookUp: 'https://geoapi.qweather.com/v2/city/lookup',
  now: "https://devapi.qweather.com/v7/weather/now",
  astronomy: "https://devapi.qweather.com/v7/astronomy",
  hourly: "https://devapi.qweather.com/v7/weather/24h",
  daily: 'https://devapi.qweather.com/v7/weather/7d',
  indices: 'https://devapi.qweather.com/v7/indices/1d'
}

// const saveApi = false;

export async function fetchMiddleServer(id, genre, type='0') {
  /*
  if (saveApi) {
    const target = genre==='hourly'? hourly : genre==='daily'? daily : indices;
    return {
      info:genre==='hourly'? target.hourly: target.daily,
      time:target.updateTime
    }
  }
  */
  const data = genre!=='indices'?
    await proxyFetcher(baseUrls[genre], {location: id}):
    await proxyFetcher(baseUrls[genre], {location: id, type: type, lang: 'zh'});
  return {info:data[genre === 'hourly' ? 'hourly' : 'daily'], time:data.updateTime}
}

export async function fetchMiddleClient(id, witch, revalidate = null) {
  const {baseUrl, genre} = witchList[witch];
  const param = genre!=='indices'?{location:id}:{location:id,type:'0',lang:'zh'};
  let url;
  try {
    url = makeUrl(baseUrl, param, false);
    const res = revalidate?
      await fetch(url,{headers:{'If-None-Match':revalidate}}):
      await fetch(url);
    if (!res.ok && res.status!==304) { throw new Error(res.status.toString()) }
    if (res.status!==304) {
      const data = await res.json();
      return {info:data[genre === 'hourly' ? 'hourly' : 'daily'], time:data.updateTime};
    }
    return null;
  }
  catch (e) { return handleErr(url, e); }
}

export async function fetchCities(number=20, range='cn', lang='zh') {
  // if (saveApi) {return cities;}
  const data = await proxyFetcher(baseUrls.cities, {number:20, range:range, lang:lang});
  return data.topCityList;
}

export async function fetchLookUp(location, number=20, lang='zh') {
  const data = await proxyFetcher(baseUrls.lookUp, {location: location, number: number, lang:lang});
  return data.location;
}

export async function fetchNow(id) {
  // if (saveApi) {return addUnit(now.now);}
  const data = await proxyFetcher(baseUrls.now, {location:id});
  return addUnit(data.now);
}

export async function fetchAstronomy(id, genre, date, lang='zh') {
  // if (saveApi) {return astronomy[genre]}
  return await proxyFetcher(`${baseUrls.astronomy}/${genre}`, {location: id, date: date, lang:lang});

}

async function proxyFetcher(baseUrl, paramsOb) {
  let url = '';
  try {
    url = makeUrl(baseUrl, paramsOb);
    const data = await doFetch(url);

    console.error(`---------------------------${baseUrl}`, Reflect.ownKeys(data).join(','));

    return data;
  }
  catch (e) {
    return handleErr(url, e);
  }
}

function makeUrl(baseUrl, paramOb, needKey=true){
  const searchParams = new URLSearchParams();
  needKey && searchParams.set('key', process.env.KEY);
  searchParams.set('lang', 'en');
  Object.keys(paramOb).forEach((key)=>{
    if (!paramOb[key]) {throw Error(`Invalid search param ${paramOb[key]}:${paramOb}`)}
    searchParams.set(key, paramOb[key].toString());
  })
  return `${baseUrl}?${searchParams}`
}

async function doFetch(url){
  const res = await fetch(url, {next: { revalidate: 3600 } });
  if (!res.ok) {throw Error(`Unlucky code: ${res.code}`)}
  return res.json();
}

function handleErr(url, e){
  console.error(`!----------------In data-search.js, fetch ${url} failed. ${e.message}--------------------!`);
  return void 0;
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
        ob[key] = date.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit', hourCycle: 'h23', timeZone:'Asia/Shanghai'});
        break;
      }
      default :{
        ob[key] = data[key];
      }
    }
  })
  return ob;
}