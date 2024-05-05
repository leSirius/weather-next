import {doFetchBack, handleErrBack, moveSearchParams, useStoredData} from "@/app/api/lib/manipulator";
import {air} from "@/app/api/lib/cached-data";
const baseUrl = 'https://devapi.qweather.com/v7/air/now?'

export async function GET(request) {
  if (useStoredData()) {return Response.json(air);}

  let url = '';
  try {
    url = moveSearchParams(request.url, baseUrl);
    const data = await doFetchBack(url);
    return Response.json(data);
  }
  catch(e) {
    return handleErrBack(request.url, url, e);
  }
}
