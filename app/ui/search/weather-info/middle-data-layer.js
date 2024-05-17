import {fetchMiddle} from "@/app/lib/data-search";
import MiddleBoardServer from "@/app/ui/search/weather-info/middle-board/middle-board-server";


export default async function MiddleDataLayer({id}) {
  const beginFrom = 'hourly';
  const data = await fetchMiddle(id, beginFrom);
  return <MiddleBoardServer id={id} data={data}></MiddleBoardServer>
}
