import Link from "next/link";
import {
  HomeIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Image from "next/image";
const links = [
  { 'name':'Home', 'href': '/', 'icon': HomeIcon, },
  { 'name':'Search', href: '/search?id=101010100', 'icon': DocumentMagnifyingGlassIcon }
]

export default function SideNav(){
  return <div className="flex h-12 md:h-full md:pt-36 md:px-2 text-card bg-side md:flex-col relative">
    <div className='absolute top-10 left-1/4 flex max-sm:hidden'>
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="qi-314-fill w-1/2" viewBox="0 0 16 16">
        <path d="M9 11a1 1 0 1 0 2 0c0-.5-.555-1.395-1-2-.445.605-1 1.5-1 2Zm-7.707 1.707A1 1 0 0 1 1 12c0-.5.555-1.395 1-2 .445.605 1 1.5 1 2a1 1 0 0 1-1.707.707Zm3 0A1 1 0 0 1 4 12c0-.5.555-1.395 1-2 .445.605 1 1.5 1 2a1 1 0 0 1-1.707.707Zm9-1A1 1 0 0 1 13 11c0-.5.555-1.395 1-2 .445.605 1 1.5 1 2a1 1 0 0 1-1.707.707ZM11 14a1 1 0 0 0 2 0c0-.5-.555-1.395-1-2-.445.605-1 1.5-1 2Z"/>
        <path d="M7.857 0a.5.5 0 0 0-.474.342l-.167.5a.5.5 0 0 0-.025.191c-3.729.31-6.71 2.74-7.19 5.824-.033.216.397.393.593.283.412-.232 1.055-.445 2.029-.445 1.359 0 2.074.414 2.416.718.13.116.415.116.545 0 .294-.262.864-.604 1.883-.695v8.749a.533.533 0 0 0 1.066 0V6.718c1.019.091 1.589.433 1.883.695.13.116.415.116.545 0 .342-.304 1.057-.718 2.416-.718.974 0 1.617.213 2.03.445.195.11.625-.067.591-.283-.48-3.087-3.464-5.517-7.196-5.824a.5.5 0 0 0-.025-.191l-.166-.5A.5.5 0 0 0 8.136 0h-.279Z"/>
      </svg>
      <p className='pl-0.5 pt-8 font-bold text-2xl'>Weather</p>
    </div>

    {links.map(link=>{
      const LinkIcon = link.icon;
      return(
        <Link href={link.href} key={link.name}
              className="flex max-sm:justify-center w-full md:rounded-lg bg-amber-500 hover:bg-amber-600 md:gap-2 md:p-3 md:my-3">
          <LinkIcon className="w-6"/>
          <p className="hidden md:block">{link.name}</p>
        </Link>
      )
    })}

  </div>
}

//<Image className="mb-12" priority={true} width={240} height={48} src='/www-logo-r.png' alt='Whoops, logo lost' />