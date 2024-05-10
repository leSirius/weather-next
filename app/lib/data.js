//based on the city id, return temporary weather info of the city.
export async function fetchNowById(id){
  const url = `/api/now?location=${id}`;
  try{
    checkUndefined(id);
    const data = await doFetch(url);
    await addUnit(data);
    return data;
  }
  catch (e){
    return handleErr(url, e);
  }
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

export async function fetchForecastById(id) {
  const url =  `/api/forecast?location=${id}`;

  try {
    checkUndefined(id);
    const data = await doFetch(url);
    return Array.isArray(data)? data:[];
  }
  catch (e) {
    return handleErr(url, e);
  }
}

export async function fetchNowAirById(id) {
  const url = `/api/air/now?location=${id}`;
  try {
    checkUndefined(id);
    return await doFetch(url);
  } catch (e){
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

export async function fetchIndicesById(id, type=0) {
  if (Array.isArray(type)) {type = type.join(',')}
  const url = `/api/indices?location=${id}&type=${type}`;
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
    throw Error("Undefined Parameter")
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

function addUnit(ob){
  if (ob===void 0||ob===null){return ob;}
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
        ob[key] = `${ob[key]}Km/h`;
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
}