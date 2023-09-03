import { UserButton } from '@clerk/nextjs';
import MainNav from './MainNav';
import StoreSwitcher from './StoreSwitcher';
import prismadb from '@/lib/prismadb';
import { isAuthed } from '@/lib/helpers';

export default async function Navbar() {

  const userId = isAuthed()

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
