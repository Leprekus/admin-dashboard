import { getManyCategories } from '@/app/actions/api/categories-actions';
import { format } from 'date-fns';
import BillboardClient from './components/client';
import { CategoryColumn } from './components/column';
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