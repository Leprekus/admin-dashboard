import { deleteSize, getSize, updateSize } from '@/app/actions/sizes-actions';
import { getStoreByUserId } from '@/app/actions/store-actions';
import { isServerAuthed } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export const GET = async (
    _req: Request,
    { params }: { params: { sizeId: string } }
) => {

    try {

        if(!params.sizeId) return new NextResponse('Size id is Required', { status: 400 })

        const size = await getSize(params.sizeId)

        return NextResponse.json(size)

    } catch (error) {

        console.log(`[SIZE_GET] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string; sizeId: string } }
) => {

    try {

        const userId = isServerAuthed()

        const { value: { name, value } } = await req.json()

        if(!name || !value || !params.sizeId) return new NextResponse('Name, Value, and Size id are Required', { status: 400 })

        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const size = 
        await updateSize(
            params.sizeId,
            { name, value }
            )

        return NextResponse.json(size)
        
    } catch (error) {

        console.log(`[SIZE_PATCH] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const DELETE = async (
    _req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) => {

    try {

        const userId = isServerAuthed()

        if(!params.storeId || !params.sizeId) return new NextResponse('Store id is Required', { status: 400 })

        //check that store belongs to user
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId)
            return new NextResponse('Unauthorized', { status: 403 })

        const size = await deleteSize(params.sizeId)
        
        return NextResponse.json(size)

    } catch (error) {

        console.log(`[SIZE_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}