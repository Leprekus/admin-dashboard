import { deleteProduct } from '@/app/actions/product-actions';
import { getStoreByUserId } from '@/app/actions/store-actions';
import { isServerAuthed } from '@/lib/helpers';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (
    _req: Request,
    { params }: { params: { productId: string } }
) => {

    try {

        if(!params.productId) return new NextResponse('Product id is Required', { status: 400 })

        const product = 
        await prismadb.product.findUnique({
            where: { id: params.productId },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            }
        })


        return NextResponse.json(product)

    } catch (error) {

        console.log(`[PRODUCT_GET] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const PATCH = async (
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
) => {

    try {

        const userId = isServerAuthed()

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

        const storeByUserId = await getStoreByUserId(params.storeId, userId)

        if(!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

        await prismadb.product.update({
            where: { id: params.productId },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                images: {
                    deleteMany: {}
                },
            }
        })
        const product = 
        await prismadb.product.update({
            where: { id: params.productId },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string}) => (
                                image
                            ))
                        ]
                    }
                },
            }
        })

        return NextResponse.json(product)
        
    } catch (error) {

        console.log(`[PRODUCT_PATCH] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}

export const DELETE = async (
    _req: Request,
    { params }: { params: { storeId: string, productId: string } }
) => {

    try {

        const userId = isServerAuthed()

        if(!params.storeId || !params.productId) return new NextResponse('Product id is Required', { status: 400 })

        //check that store belongs to user
        const storeByUserId = await getStoreByUserId(params.storeId, userId)
        
        if(!storeByUserId)
            return new NextResponse('Unauthorized', { status: 403 })

        const product = await deleteProduct(params.productId)
        
        return NextResponse.json(product)

    } catch (error) {

        console.log(`[PRODUCT_DELETE] ${error}`);

        return new NextResponse('Internal error ', { status: 500 })
    }
}