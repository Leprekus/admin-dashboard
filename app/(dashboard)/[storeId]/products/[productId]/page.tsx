import { getManyCategories } from '@/app/api/actions/categories-actions'
import ProductForm from './components/ProductForm'
import { getProduct } from '@/app/api/actions/product-actions'
import { getManySizes } from '@/app/api/actions/sizes-actions';
import { getManyColors } from '@/app/api/actions/color-actions';

export default async function ProductFormPage({
    params,
}: {
    params: { productId: string, storeId: string; }
}) {

    const product = await getProduct(params.productId)
    const categories = await getManyCategories(params.storeId)
    const colors = await getManyColors(params.storeId)
    const sizes = await getManySizes(params.storeId)
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductForm 
            initialData={product}
            categories={categories}
            colors={colors}
            sizes={sizes}
            />
        </div>
    </div>
  )
}