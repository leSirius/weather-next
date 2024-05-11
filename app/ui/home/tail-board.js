import AirNow from "@/app/ui/home/tail-board-widgets/air-now";
import Wind from "@/app/ui/home/tail-board-widgets/wind";

export default function TailBoard({id}) {

  return (
    <div className='flex justify-between mt-2 w-full h-52 max-sm:flex-wrap text-card'>
      <Cube><AirNow id={id}></AirNow></Cube>
      <Cube><Wind cityId={id}></Wind></Cube>
      <Cube></Cube>
      <Cube></Cube>
    </div>
  )
}

function Cube({children}) {
  return (
    <div className='w-[22.5%] h-48 mt-4 px-4 py-2 rounded-lg bg-sky-700 shadow-[inset_-1px_-1px_6px_0px_rgba(191,219,254,0.3)]
      max-sm:w-[48%] max-sm:h-40 overflow-y-scroll no-scrollbar'
    >
      {children}
    </div>
  )
}

