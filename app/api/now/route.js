import {moveSearchParams, doFetchBack, handleErrBack, useStoredData} from "@/app/api/lib/manipulator";
import {now} from "@/app/api/lib/cached-data";

const baseUrl = "https://devapi.qweather.com/v7/weather/now"


export async function GET(request) {
  if (useStoredData()) { return Response.json(now); }

  let url = '';
  try {
    url = moveSearchParams(request.url, baseUrl);
    const data = await doFetchBack(url);
    return  Response.json(data.now);
  }
  catch(e) {
    return handleErrBack(request.url, url, e);
  }
}

