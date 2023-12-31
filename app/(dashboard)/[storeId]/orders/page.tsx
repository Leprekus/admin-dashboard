import { priceFormatter } from '@/lib/utils';
import { format } from 'date-fns';
import OrderClient from './components/client';
import { OrderColumn } from './components/column';
import { getManyOrders } from '@/app/actions/api/order-actions';
export default async function OrdersPage({ 
  params 
}: {
  params: { storeId: string }
 }) {

  const orders = await getManyOrders(params.storeId)
  const formattedOrders: OrderColumn[] = orders
    .map(item => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      isPaid: item.isPaid,
      totalPrice: priceFormatter.format(item.orderItems
        .reduce(
          (total, item) => 
        total + Number(item.product.price), 0
        )
      ),
      products: item.orderItems
                    .map(item => item.product.name).join(', '),
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <OrderClient data={formattedOrders}/>
        </div>
    </div>
  )
}