import {daily} from "@/app/api/lib/cached-data";
import {doFetchBack, handleErrBack, moveSearchParams, useStoredData} from "@/app/api/lib/manipulator";

const baseUrl = 'https://devapi.qweather.com/v7/weather/7d?';

export async function GET(request){
  if (useStoredData()) {return Response.json(daily.daily);}

  let url = "";
  try {
    url = moveSearchParams(request.url, baseUrl);
    const data = await doFetchBack(url);
    return Response.json(data.daily);
  }
  catch (e){
    return handleErrBack(request.url, url, e);
  }
}

