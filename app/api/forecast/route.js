import {doFetchBack, handleErrBack, moveSearchParams, useStoredData} from "@/app/api/lib/manipulator";
import {forecast} from "@/app/api/lib/cached-data";

const baseUrl = "https://devapi.qweather.com/v7/weather/24h"

export async function GET(request){
  if (useStoredData()) {return Response.json(forecast);}

  let url = "";
  try {
    url = moveSearchParams(request.url, baseUrl);
    const data = await doFetchBack(url);
    return Response.json(data.hourly);
  }
  catch (e){
    return handleErrBack(request.url, url, e);
  }
}


