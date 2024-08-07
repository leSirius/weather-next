import {fetchAstronomy, fetchNow} from "@/app/lib/data-search";
import WindServer from "@/app/ui/search/weather-info/tail-board-server/wind-server";
import MoonCarouselServer from "@/app/ui/search/weather-info/tail-board-server/moon-carouse-server";
import SunInfoServer from "@/app/ui/search/weather-info/tail-board-server/sun-info-server";
export default async function TailBoardServer({id}) {
  const today = new Date();
  /*
  const nowData = await fetchNow(id);
  const moonData = await fetchAstronomy(id, 'moon', getDateStr(today));
  const sunData = await fetchAstronomy(id, 'sun', getDateStr(today));
  */

  const [nowData, moonData, sunData] = await Promise.all([
    fetchNow(id),
    fetchAstronomy(id, 'moon', getDateStr(today)),
    fetchAstronomy(id, 'sun', getDateStr(today))
  ]);

  return (
    <div className='grid grid-cols-3 gap-4 h-full text-card'>
      <Cube> <WindServer nowData={nowData}></WindServer> </Cube>
      <Cube> <MoonCarouselServer data={moonData} today={today}></MoonCarouselServer> </Cube>
      <Cube> <SunInfoServer data={sunData}></SunInfoServer> </Cube>
    </div>
  )
}


function Cube({children}) {
  return (
    <div className='bg-sky-500 rounded-xl shadow-[inset_-1px_-1px_6px_0px_rgba(50,50,150,0.7)]'>
      {children}
    </div>
  )
}

function getDateStr(date) {
  const timeString = date.toLocaleDateString('en-029',
    { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai'}
  )
  let [m, d, y] = timeString.split('/');
  y = '20'+y;
  return `${y}${m}${d}`;
}