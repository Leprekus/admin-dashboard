import { getManyBillboards } from '@/app/api/actions/billboard-actions';
import BillboardClient from './components/client';
import { BillboardColumn } from './components/column';
import { format } from 'date-fns'
export default async function BillboardsPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const billboards = await getManyBillboards(params.storeId)
  const formattedBillboards: BillboardColumn[] = billboards
    .map(item => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardClient data={formattedBillboards}/>
        </div>
    </div>
  )
}