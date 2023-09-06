import BillboardClient from './components/client';
import { CategoryColumn } from './components/column';
import { format } from 'date-fns'
import { getManyCategories } from '@/app/api/actions/categories-actions';
export default async function CategoriesPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const categories = await getManyCategories(params.storeId)
  const formattedCategories: CategoryColumn[] = categories
    .map(item => ({
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardClient data={formattedCategories}/>
        </div>
    </div>
  )
}