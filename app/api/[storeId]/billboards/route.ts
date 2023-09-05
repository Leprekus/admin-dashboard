import { isServerAuthed } from '@/lib/helpers'
import { NextResponse } from 'next/server'
import { getStoreByUserId } from '../../actions/store-actions'
import { createBillboard, getManyBillboards } from '../../actions/billboard-actions'

export const POST = async (
    req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {

        const { value: { label, imageUrl } } = await req.json()
        
        const userId = isServerAuthed() 

        if(!label || !imageUrl || !params.storeId) 
            return new NextResponse('Label, Image URL, and Store id are required', { status: 400 })
        
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const billboard = await createBillboard({
            label,
            imageUrl,
            storeId: params.storeId,
            
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log(`[BILLBOARDS_POST] ${error}`)
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

        const billboards = await getManyBillboards(params.storeId)
            
        return NextResponse.json(billboards)

    } catch (error) {
        console.log(`[BILLBOARDS_GET] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}