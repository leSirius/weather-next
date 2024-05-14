import {daily} from "@/app/api/lib/cached-data";
import {doFetchBack, handleErrBack, moveSearchParams, routeFetcher, useStoredData} from "@/app/api/lib/manipulator";

const baseUrl = 'https://devapi.qweather.com/v7/weather/7d?';

export async function GET(request){
  if (useStoredData()) {return Response.json(daily);}
  const data = await routeFetcher(request.url, baseUrl);
  return Response.json(data);
}

