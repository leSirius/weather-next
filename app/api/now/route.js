import {moveSearchParams, doFetchBack, handleErrBack, useStoredData, routeFetcher} from "@/app/api/lib/manipulator";
import {now} from "@/app/api/lib/cached-data";

const baseUrl = "https://devapi.qweather.com/v7/weather/now"


export async function GET(request) {
  if (useStoredData()) { return Response.json(now); }
  const data = await routeFetcher(request.url, baseUrl);
  return Response.json(data);
}

