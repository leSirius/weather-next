
export function Loading() {
  return (
    <div className='w-full md:w-10/12 text-center p-2'>
      <HeadLoading></HeadLoading>
      <MiddleLoading></MiddleLoading>
      <TailBoard></TailBoard>
    </div>
  )
}

function Cube() {
  return (
    <div className='w-[22.5%] h-48 mt-4 p-2 rounded-lg bg-sky-700 shadow-[inset_-1px_-1px_6px_0px_rgba(191,219,254,0.3)]
      max-sm:w-[48%] max-sm:h-40 overflow-y-scroll no-scrollbar'
    ></div>
  )
}

export function HeadLoading() {
  return (
    <div className='w-full p-4 bg-blue-600 rounded-lg text-card h-[168px]'></div>
  )
}

export function MiddleLoading() {
  return (
    <div className='w-full flex pt-4 gap-4'>
      <div className='h-48 w-8/12 bg-blue-900 rounded-lg shadow-lg shadow-blue-900'></div>
      <div className='h-48 flex-grow bg-cyan-800 opacity-95 rounded-lg shadow-lg shadow-cyan-900'></div>
    </div>
  )
}

export function TailBoard() {
  return (
    <div className='flex justify-between mt-2 w-full h-52 max-sm:flex-wrap text-card'>
      <Cube></Cube>
      <Cube></Cube>
      <Cube></Cube>
      <Cube></Cube>
    </div>
  )
}