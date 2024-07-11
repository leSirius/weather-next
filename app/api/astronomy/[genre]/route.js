import {routeFetcher} from "@/app/api/lib/manipulator";
// import {astronomy} from "@/app/api/lib/cached-data";

const baseUrl = 'https://devapi.qweather.com/v7/astronomy/';
export async function GET(request, {params}) {
  const genre = params.genre;
  //if (useStoredData()) {return Response.json(astronomy[genre]);}
  const data = await routeFetcher(request.url, baseUrl+genre);
  return Response.json(data);
}