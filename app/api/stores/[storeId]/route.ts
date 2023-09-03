import { isServerAuthed } from '@/lib/helpers';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string } }
) => {

    try {

        const userId = isServerAuthed()

        const { value: { name } } = await req.json()

        if(!name) return new NextResponse('Name is Required', { status: 400 })

        if(!params.storeId) return new NextResponse('Store id is Required', { status: 400 })

        const store = await prismadb.store.updateMany({
            where: { id: params.storeId, userId },

            data: { name }
        })

        return NextResponse.json(store)
        
    } catch (error) {

        console.log(`[STORE_PATCH] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const DELETE = async (
    _req: Request,
    { params }: { params: { storeId: string } }
) => {

    try {

        const userId = isServerAuthed()

        if(!params.storeId) return new NextResponse('Store id is Required', { status: 400 })

        const store = await prismadb.store.deleteMany({
            where: { id: params.storeId, userId },
        })

        return NextResponse.json(store)

    } catch (error) {

        console.log(`[STORE_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}