import {moveSearchParams, doFetchBack, handleErrBack, useStoredData} from "@/app/api/lib/manipulator";

const baseUrl = "https://devapi.qweather.com/v7/weather/now"
let cached = {
  "obsTime": "2024-05-03T02:37+08:00",
  "temp": "16",
  "feelsLike": "12",
  "icon": "150",
  "text": "Clear",
  "wind360": "23",
  "windDir": "NE",
  "windScale": "4",
  "windSpeed": "24",
  "humidity": "70",
  "precip": "0.0",
  "pressure": "1016",
  "vis": "11",
  "cloud": "10",
  "dew": "11"
}

export async function GET(request) {
  if (useStoredData()) { return Response.json(cached); }

  let url = '';
  try {
    url = moveSearchParams(request.url, baseUrl);
    const data = await doFetchBack(url);
    return  Response.json(data.now);
  }
  catch(e) {
    return handleErrBack(request.url, url, e);
  }
}

