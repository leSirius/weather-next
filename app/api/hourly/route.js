import { routeFetcher, useStoredData} from "@/app/api/lib/manipulator";
import {hourly} from "@/app/api/lib/cached-data";

const baseUrl = "https://devapi.qweather.com/v7/weather/24h"

export async function GET(request){
  const ETag = request.headers.get('If-None-Match');
  const data = useStoredData()? hourly : await routeFetcher(request.url, baseUrl);
  if (ETag && data.updateTime===ETag) {
    return new Response(null, { status: 304 })
  }
  return Response.json(data);
}


