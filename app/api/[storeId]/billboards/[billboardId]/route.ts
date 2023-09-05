import { isServerAuthed } from '@/lib/helpers';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string; billboardId: string } }
) => {

    try {

        const userId = isServerAuthed()

        const { value: { label, imageUrl } } = await req.json()

        if(!label || !imageUrl || !params.billboardId) return new NextResponse('Label, Image URL, and Billboard id are Required', { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const billboard = await prismadb.billboard.updateMany({
            where: { id: params.billboardId },
            data: { label, imageUrl }
 
        })

        return NextResponse.json(billboard)
        
    } catch (error) {

        console.log(`[BILLBOARD_PATCH] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const DELETE = async (
    _req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) => {

    try {

        const userId = isServerAuthed()

        if(!params.storeId || !params.billboardId) return new NextResponse('Store id is Required', { status: 400 })

        const store = await prismadb.store.deleteMany({
            where: { id: params.storeId, userId },
        })

        return NextResponse.json(store)

    } catch (error) {

        console.log(`[STORE_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}