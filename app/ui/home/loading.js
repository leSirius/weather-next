import {CompassPlate, CompassPointer} from "@/app/lib/icons";

export function Loading() {
  return (
    <div className='w-full md:w-10/12 text-center p-2'>
      <HeadLoading></HeadLoading>
      <MiddleLoading></MiddleLoading>
      <TailBoard></TailBoard>
    </div>
  )
}

function Cube({children}) {
  return (
    <div className='w-[22.5%] h-48 mt-4 p-2 rounded-lg bg-sky-700 shadow-[inset_-1px_-1px_6px_0px_rgba(191,219,254,0.3)]
      max-sm:w-[48%] max-sm:h-40 overflow-y-scroll no-scrollbar'
    >{children}</div>
  )
}

export function HeadLoading() {
  return (
    <div className='w-full p-4 bg-blue-600 rounded-lg text-card h-[168px]'></div>
  )
}

export function MiddleLoading() {
  return (
    <div className='grid grid-cols-3 pt-4 gap-4 h-52'>
      <div className='col-span-2 flex p-1 pb-0.5 bg-blue-900 rounded-lg shadow-lg shadow-blue-900'></div>
      <div className='col-span-1 bg-cyan-800 opacity-95 rounded-lg shadow-lg shadow-cyan-900'></div>
    </div>
  )
}

export function TailBoard() {
  return (
    <div className='flex justify-between mt-2 w-full h-52 max-sm:flex-wrap text-card'>
      <Cube></Cube>
      <Cube>
        <div className='px-3 '>
          <div className="flex justify-center relative opacity-65 w-full mb-1.5">
            <p className='absolute top-[10%] text-sm max-sm:top-[7.5%]'>N</p>
            <CompassPlate width='66.67%' ></CompassPlate>
            <div className={`absolute left-1/3 w-1/3 top-1/4 border-none`} >
              <CompassPointer width='100%' ></CompassPointer>
            </div>
          </div>
        </div>

      </Cube>
      <Cube></Cube>
      <Cube></Cube>
    </div>
  )
}