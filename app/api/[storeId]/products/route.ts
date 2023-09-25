import { isServerAuthed } from '@/lib/helpers'
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'
import { createProduct } from '../../../actions/product-actions'
import { getStoreByUserId } from '../../../actions/store-actions'

export const POST = async (
    req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {

        const { value: { 
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
         } } = await req.json()
        
        const userId = isServerAuthed() 
  

        if(
            !params.storeId ||
            !name ||
            !price ||
            !categoryId ||
            !colorId ||
            !sizeId ||
            (!images || images.length === 0)
            ) 
            return 
            new NextResponse(
                'Store id, Name, Price, Category id, colorId, Size id, images, Featured, and Archived are required.', 
                { status: 400 }
                )
        
                console.log('ran 2')
        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        const product = await createProduct({
            name,
            price,
            isFeatured,
            isArchived,
            categoryId,
            colorId,
            sizeId,
            storeId: params.storeId,
            images
            
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log(`[PRODUCTS_POST] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}


export const GET = async (
    req: Request,
    { params }: { params: { storeId: string } }

) => {
    try {

        const { searchParams } = new URL(req.url)
        
        const categoryId = searchParams.get('categoryId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const isFeatured = searchParams.get('isFeatured')
        
        if(!params.storeId) 
            return new NextResponse('Store id is required', { status: 400 })
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
            orderBy:{ createdAt: 'desc' }
        })
        console.log({ products, categoryId, colorId, sizeId, isFeatured, url: req.url })
        return NextResponse.json(products)

    } catch (error) {
        console.log(`[PRODUCTS_GET] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}