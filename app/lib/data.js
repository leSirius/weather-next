
export async function fetchDataByCor(lat, lon){
  try{
    const res = await fetch(`/api?lat=${lat}&lon=${lon}`, {method:"GET"});
    const data = await res.json();
    return data.now;
  }
  catch (e){
    console.log('fetch by coordinate failed')
    return null;
  }

}

export function addUnit(ob){
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
        ob[key] = date.toTimeString().split('(')[0];
        break;
      }
    }
  }
}
