import {routeFetcher} from "@/app/api/lib/manipulator";
//import {city} from "@/app/api/lib/cached-data";

const baseUrl = "https://geoapi.qweather.com/v2/city/lookup"

export async function GET(request) {
  //if (useStoredData()) {return Response.json(city);}
  const data = await routeFetcher(request.url, baseUrl);
  return Response.json(data);
}