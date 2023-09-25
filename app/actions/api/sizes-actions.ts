import prismadb from '@/lib/prismadb'
import { Size } from '@prisma/client'

export const getManySizes = async (storeId: string) => {
    const sizes = await prismadb.size.findMany({
        where: { storeId },
        orderBy: { createdAt: 'desc' }
    })

    return sizes
}
export const getSize = async (id: string) => {
    const sizes = await prismadb.size.findUnique({
        where: { id },
    })

    return sizes
}

export const createSize = async (
    payload: {
        name: string;
        value: string;
        storeId: string;
}) => {
    const size = await prismadb.size.create({
        data: { ...payload }
    })

    return size
}

export const updateSize = async (id: string, payload: Partial<Size>) => {
    const size = await prismadb.size.updateMany({
        where: { id },
        data: { ...payload }
    })

    return size
}

export const deleteSize = async (id: string) => {

    const size = await prismadb.size.delete({
        where: { id }
    })

    return size
}