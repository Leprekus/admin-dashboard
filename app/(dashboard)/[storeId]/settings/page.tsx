import { isAuthed } from '@/lib/helpers';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import SettingsForm from './components/SettingsForm';

interface SettingsPageProps {
    params: { storeId: string; }
}
export default async function SettingsPage({ params }: SettingsPageProps) {
    
    const userId = isAuthed()
    
    const store = await prismadb.store.findFirst({
        where: { id: params.storeId, userId }
    })

    if(!store) return redirect('/')

    return (
    <div className='flex-co'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm store={store}/>
        </div>
    </div>
  )
}