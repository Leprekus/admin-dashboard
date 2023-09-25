import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const getManyColors = async (storeId: string) => {
    const colors = await prismadb.color.findMany({
        where: { storeId },
        orderBy: { createdAt: 'desc' }
    })

    return colors
}
export const getColor = async (id: string) => {
    const colors = await prismadb.color.findUnique({
        where: { id },
    })

    return colors
}

export const createColor = async (
    payload: {
        name: string;
        value: string;
        storeId: string;
}) => {
    const color = await prismadb.color.create({
        data: { ...payload }
    })

    return color
}

export const updateColor = async (id: string, payload: Partial<Color>) => {
    const color = await prismadb.color.updateMany({
        where: { id },
        data: { ...payload }
    })

    return color
}

export const deleteColor = async (id: string) => {

    const color = await prismadb.color.delete({
        where: { id }
    })

    return color
}