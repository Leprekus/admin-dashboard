import prismadb from '@/lib/prismadb'

export const getManyCategories = async (storeId: string) =>  {

    const categories = await prismadb.category.findMany({
        where: { storeId },
        include: { billboard: true },
        orderBy: { createdAt: 'desc' }
    })
    
    return categories
}