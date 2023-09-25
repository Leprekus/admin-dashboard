
import { getProduct } from '@/app/actions/api/product-actions';
import ProductForm from './components/ProductForm';
import { getManyCategories } from '@/app/actions/api/categories-actions';
import { getManyColors } from '@/app/actions/api/color-actions';
import { getManySizes } from '@/app/actions/api/sizes-actions';

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