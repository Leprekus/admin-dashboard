import { getManyProducts } from '@/app/api/actions/product-actions';
import ProductClient from './components/client';
import { ProductColumn } from './components/column';
import { format } from 'date-fns'
import { priceFormatter } from '@/lib/utils';
export default async function ProductsPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const products = await getManyProducts(params.storeId)
  const formattedProducts: ProductColumn[] = products
    .map(item => ({
      id: item.id,
      name: item.name,
      isArchived: item.isArchived,
      isFeatured: item.isFeatured,
      price: priceFormatter.format(item.price.toNumber()),
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductClient data={formattedProducts}/>
        </div>
    </div>
  )
}