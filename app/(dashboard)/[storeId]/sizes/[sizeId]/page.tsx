
import { getSize } from '@/app/actions/api/sizes-actions'
import SizeForm from './components/SizeForm'

export default async function SizeFormPage({
    params,
}: {
    params: { sizeId: string }
}) {

    const size = await getSize(params.sizeId)

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizeForm initialData={size}/>
        </div>
    </div>
  )
}