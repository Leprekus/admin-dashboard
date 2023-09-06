import { deleteColor, getColor, updateColor } from '@/app/api/actions/color-actions';
import { getStoreByUserId } from '@/app/api/actions/store-actions';
import { isServerAuthed } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export const GET = async (
    _req: Request,
    { params }: { params: { colorId: string } }
) => {

    try {

        if(!params.colorId) return new NextResponse('Color id is Required', { status: 400 })

        const color = await getColor(params.colorId)

        return NextResponse.json(color)

    } catch (error) {

        console.log(`[COLOR_GET] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string; colorId: string } }
) => {

    try {

        const userId = isServerAuthed()

        const { value: { name, value } } = await req.json()

        if(!name || !value || !params.colorId) return new NextResponse('Name, Value, and Color id are Required', { status: 400 })

        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const color = 
        await updateColor(
            params.colorId,
            { name, value }
            )

        return NextResponse.json(color)
        
    } catch (error) {

        console.log(`[COLOR_PATCH] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const DELETE = async (
    _req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) => {

    try {

        const userId = isServerAuthed()

        if(!params.storeId || !params.colorId) return new NextResponse('Store id is Required', { status: 400 })

        //check that store belongs to user
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId)
            return new NextResponse('Unauthorized', { status: 403 })

        const color = await deleteColor(params.colorId)
        
        return NextResponse.json(color)

    } catch (error) {

        console.log(`[COLOR_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}