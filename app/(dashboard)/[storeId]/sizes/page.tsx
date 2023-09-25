
import { getManySizes } from '@/app/actions/sizes-actions'
import { format } from 'date-fns'
import SizeClient from './components/client'
import { SizeColumn } from './components/column'
export default async function SizesPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const Sizes = await getManySizes(params.storeId)
  const formattedSizes: SizeColumn[] = Sizes
    .map(item => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizeClient data={formattedSizes}/>
        </div>
    </div>
  )
}