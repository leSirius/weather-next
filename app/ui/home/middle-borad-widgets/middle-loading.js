

export default function MiddleLoading() {
  return(
    <div className='w-full flex pt-4 gap-4'>
      <div className='h-48 w-8/12 bg-blue-900 rounded-lg shadow-lg shadow-blue-900'></div>
      <div className='h-48 flex-grow bg-cyan-800 opacity-95 rounded-lg shadow-lg shadow-cyan-900'></div>
    </div>
  )
}