import { isServerAuthed } from '@/lib/helpers'
import { NextResponse } from 'next/server'
import { createCategory, getManyCategories } from '@/app/actions/api/categories-actions'
import { getStoreByUserId } from '@/app/actions/api/store-actions'

export const POST = async (
    req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {

        const { value: { name, billboardId } } = await req.json()
        
        const userId = isServerAuthed() 

        if(!name || !billboardId || !params.storeId) 
            return new NextResponse('Category name and Billboard id are required', { status: 400 })
        
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const category = await createCategory({
            name,
            billboardId,
            storeId: params.storeId
            
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log(`[CATEGORIES_POST] ${error}`)
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

        const categories = await getManyCategories(params.storeId)
        console.log({ categories })
        return NextResponse.json(categories)

    } catch (error) {
        console.log(`[CATEGORIES_GET] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}