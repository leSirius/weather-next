// import { daily } from "@/app/api/lib/cached-data";
import {routeFetcher} from "@/app/api/lib/manipulator";

const baseUrl = 'https://devapi.qweather.com/v7/weather/7d?';

export async function GET(request){
  const ETag = request.headers.get('If-None-Match');
  const data = await routeFetcher(request.url, baseUrl);
  if (ETag && data.updateTime===ETag) {
    return new Response(null, { status: 304 })
  }
  return Response.json(data);
}

