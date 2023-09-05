import { deleteBillboard, getBillboard, updateBillboard } from '@/app/api/actions/billboard-actions';
import { getStoreByUserId } from '@/app/api/actions/store-actions';
import { isServerAuthed } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export const GET = async (
    _req: Request,
    { params }: { params: { billboardId: string } }
) => {

    try {

        if(!params.billboardId) return new NextResponse('Billboard id is Required', { status: 400 })

        const billboard = await getBillboard(params.billboardId)

        return NextResponse.json(billboard)

    } catch (error) {

        console.log(`[STORE_GET] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string; billboardId: string } }
) => {

    try {

        const userId = isServerAuthed()

        const { value: { label, imageUrl } } = await req.json()

        if(!label || !imageUrl || !params.billboardId) return new NextResponse('Label, Image URL, and Billboard id are Required', { status: 400 })

        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const billboard = 
        await updateBillboard(
            params.billboardId,
            { label, imageUrl }
            )

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

        //check that store belongs to user
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId)
            return new NextResponse('Unauthorized', { status: 403 })

        const store = await deleteBillboard(params.storeId)
        
        return NextResponse.json(store)

    } catch (error) {

        console.log(`[STORE_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}