import Link from "next/link";
import {
  HomeIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Image from "next/image";
const links = [
  { 'name':'Home', 'href': '/', 'icon': HomeIcon, },
  { 'name':'Search', href: '/search', 'icon': DocumentMagnifyingGlassIcon }
]

export default function SideNav(){
  return <div className="flex h-12 md:h-full md:pt-36 md:px-2 text-card bg-side max-sm: md:flex-col ">

    {links.map(link=>{
      const LinkIcon = link.icon;
      return(
        <Link href={link.href} key={link.name+link.href}
              className="flex max-sm:justify-center w-full md:rounded-lg bg-amber-500 hover:bg-amber-600 md:gap-2 md:p-3 md:my-3">
          <LinkIcon className="w-6"/>
          <p className="hidden md:block">{link.name}</p>
        </Link>
      )
    })}

  </div>
}

//<Image className="mb-12" priority={true} width={240} height={48} src='/www-logo-r.png' alt='Whoops, logo lost' />