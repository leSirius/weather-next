const key = process.env.KEY
const nowUrl = "https://devapi.qweather.com/v7/weather/now?lang=en&"

let cached = {
  "obsTime": "2024-05-02T19:47+08:00",
    "temp": "20°C",
    "feelsLike": "21°C",
    "icon": "501",
    "text": "Fog",
    "wind360": "270",
    "windDir": "W",
    "windScale": "2",
    "windSpeed": "6Km/h",
    "humidity": "79%",
    "precip": "0.0mm",
    "pressure": "1015hPa",
    "vis": "2km",
    "cloud": "20",
    "dew": "17"
}
function getNowUrl({lat, lon}){
  return nowUrl+'location='+lon+','+lat+'&key='+key;
}
export async function GET(request) {
  //return Response.json(cached);
  console.log("YOU CAN'T GET ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  const { searchParams } = new URL(request.url);
  const [lat,lon] = [searchParams.get('lat'), searchParams.get('lon')];
  if (isNaN(Number(lat))) {
    console.error("GET YOUR LOCATION FIRST")
    return Response.json({"lat": lat});
  }
  const url = getNowUrl({lat, lon});
  try {
    const res = await fetch(url)
    const data = await res.json();
    return  Response.json(data);
  }
  catch(e) {
    console.error(`request error: ${e.message}`);
    return Response.json(e);
  }
}

