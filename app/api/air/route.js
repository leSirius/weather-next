import {doFetchBack, handleErrBack, moveSearchParams, routeFetcher, useStoredData} from "@/app/api/lib/manipulator";
import {airNow} from "@/app/api/lib/cached-data";

const baseUrl = 'https://devapi.qweather.com/v7/air/now?'

export async function GET(request) {
  if (useStoredData()) {return Response.json(airNow);}
  const data = await routeFetcher(request.url, baseUrl);
  return Response.json(data);
}
