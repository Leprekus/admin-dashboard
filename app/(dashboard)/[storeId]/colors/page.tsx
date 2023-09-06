
import { getManyColors } from '@/app/api/actions/color-actions'
import { format } from 'date-fns'
import { ColorColumn } from './components/column'
import SizeClient from './components/client'
export default async function ColorPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const Color = await getManyColors(params.storeId)
  const formattedColor: ColorColumn[] = Color
    .map(item => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizeClient data={formattedColor}/>
        </div>
    </div>
  )
}