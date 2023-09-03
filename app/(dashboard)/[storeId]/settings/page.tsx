import { isAuthed } from '@/lib/helpers';

interface SettingsPageProps {
    params: { storeId: string; }
}
export default function SettingsPage({ params }: SettingsPageProps) {
    
    const userId = isAuthed()
    

    return (
    <div>page</div>
  )
}