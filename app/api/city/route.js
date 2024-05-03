import {doFetchBack, handleErrBack, moveSearchParams, useStoredData} from "@/app/api/lib/url-manipulator";


const baseUrl = "https://geoapi.qweather.com/v2/city/lookup"
const cached = {
  "code": "200",
  "location": [
    {
      "name": "Xinyi Township",
      "id": "B82B7",
      "lat": "23.65600",
      "lon": "121.02100",
      "adm2": "Nantou County",
      "adm1": "Taiwan",
      "country": "China",
      "tz": "Asia/Taipei",
      "utcOffset": "+08:00",
      "isDst": "0",
      "type": "city",
      "rank": "66",
      "fxLink": "https://www.qweather.com/weather/xinyi-township-B82B7.html"
    }
  ],
  "refer": {
    "sources": [
      "QWeather"
    ],
    "license": [
      "QWeather Developers License"
    ]
  }
}

export async function GET(request) {
  if (useStoredData()) {return Response.json(cached.location);}

  let url = '';
  try {
    url = moveSearchParams(request.url, baseUrl);
    const data = await doFetchBack(url);
    return  Response.json(data.location);
  }
  catch(e) {
    return handleErrBack(request.url, url, e);
  }
}