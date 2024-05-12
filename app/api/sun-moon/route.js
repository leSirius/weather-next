import {routeFetcher, useStoredData} from "@/app/api/lib/manipulator";
import {sun} from "@/app/api/lib/cached-data";

const baseUrl = 'https://devapi.qweather.com/v7/astronomy/sun?';
export async function GET(request) {
  if (useStoredData()) { return Response.json(sun); }
  const data = await routeFetcher(request.url, baseUrl);
  return Response.json(data);
}