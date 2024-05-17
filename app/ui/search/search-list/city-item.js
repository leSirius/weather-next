'use client'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import clsx from "clsx";
export default function CityItem({city}) {
  const pathName = usePathname();
  const {replace} = useRouter();
  const searchParam = useSearchParams();
  const tempId = searchParam.get('id');
  function clickCity(e) {
    const id = e.currentTarget.value;
    const newSearchParam = new URLSearchParams({id:id})
    if (searchParam.get('query')) {newSearchParam.set('query', searchParam.get('query'));}
    replace(`${pathName}?${newSearchParam}`)
  }

  return (
    <button
      onClick={clickCity}
      //key={city.id}
      value={city.id}
      className={clsx('block w-full mx-auto my-2 outline-none border-sky-600 border-b-2 hover:border-b-blue-400',
        {'bg-sky-700':tempId===city.id}
        )}
    >
      <p className='text-sm text-center text-gray-200 text-nowrap hover:opacity-60'>
        {`${city.name}`}
        <span className='opacity-80'>
        {city.name!==city.adm2? `, ${city.adm2}`: city.adm2!==city.adm1? `, ${city.adm1}`:''}
      </span>
      </p>

    </button>

  )
}