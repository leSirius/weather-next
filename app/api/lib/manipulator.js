// to save api usage
export function useStoredData(){
  return false;
}


export async function routeFetcher(comingUrl, baseUrl) {
  let formedUrl = '';
  try {
    formedUrl = moveSearchParams(comingUrl, baseUrl);
    return doFetchBack(formedUrl);
  }
  catch(e) {
    return handleErrBack(comingUrl, formedUrl, e);
  }
}


export async function doFetchBack(url){
  const res = await fetch(url, {next: { revalidate: 3600 }})
  return res.json();
}

// URL parameters should be string.
export function handleErrBack(requestUrl, url, e){
  requestUrl = (typeof requestUrl==="string")? requestUrl:requestUrl?.url;
  url = (typeof url==="string")? url:url.href;
  const info=
    `Received request: ${requestUrl};
     Formed request: ${url};
     Error message: ${e.message};`;
  console.error(info);
  return Response.json(e);
}

// Make request for data, and check whether parameters are valid(defined).
// Both parameters and return values of URLs should be string.
export function moveSearchParams(requestUrl, baseUrl) {
  if (typeof requestUrl!=="string") {requestUrl = requestUrl?.url;}
  const paramsComing = new URL(requestUrl).searchParams;
  const url = new URL(baseUrl);

  defaultLangKey(url);
  for (const [key, value] of paramsComing){
    if ((key==='location' && value==='')||value==='undefined'){
      throw Error('Invalid params in client request!');
    }
    url.searchParams.set(key, value);
  }
  return url.href;
}

function defaultLangKey(url){
  const key = process.env.KEY;
  url.searchParams.set('lang', 'en');
  url.searchParams.set('key', key);
}

