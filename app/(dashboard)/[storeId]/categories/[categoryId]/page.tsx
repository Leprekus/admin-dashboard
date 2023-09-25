import { getManyBillboards } from '@/app/actions/api/billboard-actions';
import CategoryForm from './components/CategoryForm';
import { getCategory } from '@/app/actions/api/categories-actions';

export default async function BillboardFormPage({
    params,
}: {
    params: { categoryId: string, storeId: string; }
}) {

    const category = await getCategory(params.categoryId)
    const billboards = await getManyBillboards(params.storeId)
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <CategoryForm 
                initialData={category}
                billboards={billboards}
            />
        </div>
    </div>
  )
}