import { getManyBillboards } from '@/app/api/actions/billboard-actions';
import BillboardClient from './components/BillboardClient';

export default async function BillboardsPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const billboards = await getManyBillboards(params.storeId)
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardClient/>
        </div>
    </div>
  )
}