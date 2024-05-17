
export function MiddleLoadingServer() {

  return (
    <div className='grid grid-cols-3 gap-4 h-full'>
      <div className='col-span-2 flex  p-1 pb-0.5 bg-blue-900 rounded-lg  relative text-card shadow-lg shadow-blue-900'></div>
      <div className='col-span-1 bg-cyan-800 opacity-95 rounded-lg shadow-lg shadow-cyan-900' ></div>
    </div>
  )
}

export function TailLoadingServer() {
  return (
    <div className='grid grid-cols-3 gap-4 h-full text-card'>
      <div className='bg-sky-500 rounded-xl shadow-[inset_-1px_-1px_6px_0px_rgba(50,50,150,0.7)]'></div>
      <div className='bg-sky-500 rounded-xl shadow-[inset_-1px_-1px_6px_0px_rgba(50,50,150,0.7)]'></div>
      <div className='bg-sky-500 rounded-xl shadow-[inset_-1px_-1px_6px_0px_rgba(50,50,150,0.7)]'></div>
    </div>
  )
}