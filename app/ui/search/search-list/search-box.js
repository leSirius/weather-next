'use client'
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {useContext} from "react";
import {WitchFetchContext} from "@/app/lib/witch-context";
export default function SearchBox() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const {replace} = useRouter();

  function debounce(callback, count=400) {
    let timer;
    return (e)=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{callback(e)}, count);
    }
  }

  const handleInput = debounce((e)=> {
    const formedParams = new URLSearchParams();
    e.target.value? formedParams.set('query', e.target.value): formedParams.delete('query');
    if (searchParams.get('id')) {formedParams.set('id' ,searchParams.get('id'));}
    replace(`${pathName}?${formedParams}`);
  });

  return (
    <div className=''>
      <label >
        <p className='font-semibold text-green-500 text-lg'>Search</p>
        <input
          type="text"
          onChange={handleInput}
          defaultValue={searchParams.get('location')?.toString()}
          className='w-full p-0.5 font-base text-gray-700 rounded-md bg-teal-300 outline-none border-2 border-teal-400 focus:border-blue-500 '
        />
      </label>

    </div>
  )
}