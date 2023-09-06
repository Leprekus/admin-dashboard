import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const getManyCategories = async (storeId: string) =>  {

    const categories = await prismadb.category.findMany({
        where: { storeId },
        include: { billboard: true },
        orderBy: { createdAt: 'desc' }
    })
    
    return categories
}
export const getCategory = async (id: string) =>  {

    const categories = await prismadb.category.findUnique({
        where: { id },
    })

    return categories
}

export const createCategory = async (
    payload: {
        name: string;
        billboardId: string;
        storeId: string
}) => {
    const category = await prismadb.category.create({
        data: { ...payload }
    })

    return category
}
export const updateCategory = async (
    id: string, 
    payload: Partial<Category>
) => {
    const category = await prismadb.category.updateMany({
        where: { id },
        data: { ...payload }
    })

    return category
}

export const deleteCategory = async (id: string) => {
    const category = await prismadb.category.delete({
        where: { id },
    })

    return category
}