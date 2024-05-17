import {useAstroInfoById} from "@/app/lib/data-home";
import MoonInfoCarousel from "@/app/ui/home/tail-board-widgets/moon-info-carousel";


export default function MoonInfoData({id}){
  const today = new Date();
  const {data, error, isLoading} = useAstroInfoById(id, today, 'moon');
  if (error) {console.error(error.message); return <p>Got issues</p>}
  if (isLoading) {return <></>}
  return (
    <MoonInfoCarousel
      data ={data}
      today={today}
    >
    </MoonInfoCarousel>
  )

}
