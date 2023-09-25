import { getBillboard } from '@/app/actions/api/billboard-actions'
import BillboardForm from './components/BillboardForm'

export default async function BillboardFormPage({
    params,
}: {
    params: { billboardId: string }
}) {

    const billboard = await getBillboard(params.billboardId)

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardForm initialData={billboard}/>
        </div>
    </div>
  )
}