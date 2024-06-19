import {fetchMiddleServer} from "@/app/lib/data-search";
import MiddleBoardServer from "@/app/ui/search/weather-info/middle-board-server";


export default async function MiddleDataLayer({id, witch}) {
  const data = await fetchMiddleServer(id, witch);

  return <MiddleBoardServer id={id} data={data}></MiddleBoardServer>
}
