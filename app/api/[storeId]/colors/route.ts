import { isServerAuthed } from '@/lib/helpers'
import { NextResponse } from 'next/server'
import { getStoreByUserId } from '@/app/actions/api/store-actions'
import { createColor, getManyColors } from '@/app/actions/api/color-actions'

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

        const color = await createColor({
            name,
            value,
            storeId: params.storeId,
            
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log(`[COLOR_POST] ${error}`)
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

        const color = await getManyColors(params.storeId)
            
        return NextResponse.json(color)

    } catch (error) {
        console.log(`[COLORS_GET] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}