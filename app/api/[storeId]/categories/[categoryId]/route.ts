import { deleteCategory, getCategory, updateCategory } from '@/app/api/actions/categories-actions';
import { getStoreByUserId } from '@/app/api/actions/store-actions';
import { isServerAuthed } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export const GET = async (
    _req: Request,
    { params }: { params: { categoryId: string } }
) => {

    try {

        if(!params.categoryId) return new NextResponse('Category id is Required', { status: 400 })

        const category = await getCategory(params.categoryId)

        return NextResponse.json(category)

    } catch (error) {

        console.log(`[CATEGORY_GET] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string; categoryId: string } }
) => {

    try {

        const userId = isServerAuthed()

        const { value: { name, billboardId } } = await req.json()

        if(!name || !billboardId || !params.categoryId) return new NextResponse('Name, Billboard id, and Category id are Required', { status: 400 })

        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const category = 
        await updateCategory(
            params.categoryId,
            { name, billboardId }
            )

        return NextResponse.json(category)
        
    } catch (error) {

        console.log(`[CATEGORY_PATCH] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const DELETE = async (
    _req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) => {

    try {

        const userId = isServerAuthed()

        if(!params.storeId || !params.categoryId) return new NextResponse('Category and Store ids are Required', { status: 400 })

        //check that store belongs to user
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId)
            return new NextResponse('Unauthorized', { status: 403 })

        const category = await deleteCategory(params.categoryId)
        
        return NextResponse.json(category)

    } catch (error) {

        console.log(`[CATEGORY_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}