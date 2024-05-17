import SearchBox from "@/app/ui/search/search-list/search-box";
import CityList from "@/app/ui/search/search-list/city-list";
import { Suspense } from 'react';
export default function SearchList({query}) {

  return (
    <div className='w-full'>
      <SearchBox></SearchBox>
      <div className='h-4'></div>
      <div className='h-[30rem] w-full rounded-xl bg-sky-600 overflow-scroll no-scroll'>
        <Suspense fallback={<></>}>
          <CityList query={query}></CityList>
        </Suspense>
      </div>
    </div>

  )
}