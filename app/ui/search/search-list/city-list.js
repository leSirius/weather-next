import {fetchCities, fetchLookUp} from "@/app/lib/data-search";
import CityItem from "@/app/ui/search/search-list/city-item";


export default async function CityList({query}) {
  const cities = query===''? await fetchCities(): await fetchLookUp(query);

  return (
    <>
      {cities?.map(city => <CityItem key={city.id} city={city}></CityItem>)}
    </>
  )
}

