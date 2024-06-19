import WeatherInfo from "@/app/ui/search/weather-info";
import SearchList from "@/app/ui/search/search-list";
import WitchContext from "@/app/lib/witch-context";
export default function Page({searchParams}) {
  const query = searchParams?.query || '';
  const id = searchParams?.id || '';
  const witch = searchParams?.witch || 'hourly';

  return (
    <WitchContext>
      <div className='w-full md:w-10/12  grid grid-cols-3 gap-10'>
        <div className='col-span-2 h-full'>
          <WeatherInfo id={id} witch={witch}></WeatherInfo>
        </div>
        <div className='col-span-1'>
          <SearchList query={query}></SearchList>
        </div>
      </div>
    </WitchContext>
  )
}