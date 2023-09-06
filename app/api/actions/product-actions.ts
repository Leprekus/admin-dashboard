import prismadb from '@/lib/prismadb'
import { Image, Product } from '@prisma/client'

export const updateProduct = async (id: string, payload: Partial<Product>) => {
    const product = await prismadb.product.updateMany({
        where: { id },
        data: { ...payload }
    })

    return product
}
export const getManyProducts = async (storeId: string, ) => {
    const products = await prismadb.product.findMany({
        where: { storeId  },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: { createdAt: 'desc' }
    
    })

    return products
}
export const getProduct = async (id: string) => {
    const product = await prismadb.product.findUnique({
        where: { id },
        include: {
            images: true,
        },
    
    })

    return product
}

export const createProduct = async (
    payload: {
        name: string;
        price: string;
        isFeatured: boolean;
        isArchived: boolean;
        categoryId: string;
        colorId: string;
        sizeId: string;
        storeId: string;
        images: Image[]
}) => {
    const product = await prismadb.product.create({
        data: { 
            ...payload,
            images: {
                createMany: {
                    data: [
                        ...payload.images.map((image:{ url: string }) =>
                                image
                            )
                    ]
                }
            }
         }
    })

    return product
}

export const deleteProduct = async (id: string) => {

    const product = await prismadb.product.deleteMany({
        where: { id }
    })

    return product
}

