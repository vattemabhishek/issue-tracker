'use client';
import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBugOutline } from 'react-icons/io5';

const NavBar = () => {
 const { status, data: session } = useSession()
 const currentPath = usePathname();
 
  const links = [
        {  label:'Dashboard', href:'/'},
        {  label:'Issues', href:'/issues/list'}
   ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <IoBugOutline />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
        <Box>
          {status==="authenticated"  && <Link href="/api/auth/signout">Log Out</Link>}
          {status==="unauthenticated" && <Link href="/api/auth/signin">Log In</Link>}
        </Box>

    </nav>
  )
}

export default NavBar


