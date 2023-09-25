import { isServerAuthed } from '@/lib/helpers'
import { NextResponse } from 'next/server'
import { createSize, getManySizes } from '../../../actions/sizes-actions'
import { getStoreByUserId } from '../../../actions/store-actions'

export const POST = async (
    req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {

        const { value: { name, value } } = await req.json()
        
        const userId = isServerAuthed() 

        if(!name || !value || !params.storeId) 
            return new NextResponse('Name, Value, and Store id are required', { status: 400 })
        
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const size = await createSize({
            name,
            value,
            storeId: params.storeId,
            
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log(`[SIZE_POST] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}


export const GET = async (
    _req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {


        if(!params.storeId) 
            return new NextResponse('Store id is required', { status: 400 })

        const size = await getManySizes(params.storeId)
            
        return NextResponse.json(size)

    } catch (error) {
        console.log(`[SIZES_GET] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}