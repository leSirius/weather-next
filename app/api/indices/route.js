import { indices } from "@/app/api/lib/cached-data";
import { routeFetcher, useStoredData } from "@/app/api/lib/manipulator";
const baseUrl = 'https://devapi.qweather.com/v7/indices/1d?'

export async function GET(request) {
  const ETag = request.headers.get('If-None-Match');
  const data = useStoredData()? indices: await routeFetcher(request.url, baseUrl);
  if (ETag && data.updateTime===ETag) {
    return new Response(null, { status: 304 })
  }
  return Response.json(data);
}


