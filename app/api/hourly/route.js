import {doFetchBack, handleErrBack, moveSearchParams, routeFetcher, useStoredData} from "@/app/api/lib/manipulator";
import {hourly} from "@/app/api/lib/cached-data";

const baseUrl = "https://devapi.qweather.com/v7/weather/24h"

export async function GET(request){
  if (useStoredData()) {return Response.json(hourly);}
  const data = await routeFetcher(request.url, baseUrl);
  return Response.json(data);
}


