import prismadb from '@/lib/prismadb'

export const getStoreByUserId = async (id: string, userId: string) => {
    const store = await prismadb.store.findFirst({ 
        where: { id, userId }
    })

    return store
}