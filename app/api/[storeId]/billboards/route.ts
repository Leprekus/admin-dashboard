import { isServerAuthed } from '@/lib/helpers'
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (
    req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {

        const { value: { label, imageUrl } } = await req.json()
        
        const userId = isServerAuthed() 

        if(!label || !imageUrl || !params.storeId) 
            return new NextResponse('Label, Image URL, and Store id are required', { status: 400 })
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

            const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(params.storeId)

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
        


            const billboard = await prismadb.billboard.findMany({
            where: { storeId: params.storeId }
        
        })

        return NextResponse.json(params.storeId)

    } catch (error) {
        console.log(`[BILLBOARDS_GET] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}