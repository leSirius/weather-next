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
  return <div className="flex h-full flex-col px-3 py-24 md:px-2 text-card bg-side ">
    <Image className="mb-12" priority={true} width={240} height={48} src='/www-logo-r.png' alt='Whoops, logo lost' />
    {links.map(link=>{
      const LinkIcon = link.icon;
      return(
        <Link href={link.href} key={link.name+link.href}
              className="flex w-full text-lg rounded-lg bg-amber-500 hover:bg-amber-600 gap-2 p-3 my-3">
          <LinkIcon className="w-6"/>
          <p className="hidden md:block">{link.name}</p>
        </Link>
      )
    })}

  </div>
}