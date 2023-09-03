import { UserButton, auth } from '@clerk/nextjs';
import MainNav from './MainNav';
import StoreSwitcher from './StoreSwitcher';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

export default async function Navbar() {

  const { userId } = auth()

  if(!userId) return redirect('/sign-in')

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <StoreSwitcher items={stores}/>
            <MainNav/>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    </div>
  )
}
