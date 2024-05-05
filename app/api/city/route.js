import {doFetchBack, handleErrBack, moveSearchParams, useStoredData} from "@/app/api/lib/manipulator";
import {city} from "@/app/api/lib/cached-data";

const baseUrl = "https://geoapi.qweather.com/v2/city/lookup"

export async function GET(request) {
  if (useStoredData()) {return Response.json(city.location);}

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