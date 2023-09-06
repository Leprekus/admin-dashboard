import prismadb from '@/lib/prismadb'

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