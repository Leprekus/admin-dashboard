import { getColor } from '@/app/api/actions/color-actions'
import ColorForm from './components/ColorForm'

export default async function ColorFormPage({
    params,
}: {
    params: { colorId: string }
}) {

    const color = await getColor(params.colorId)

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ColorForm initialData={color}/>
        </div>
    </div>
  )
}