import prismadb from '@/lib/prismadb'
import { Billboard } from '@prisma/client'

export const updateBillboard = async (id: string, payload: Partial<Billboard>) => {
    const billboard = await prismadb.billboard.updateMany({
        where: { id },
        data: { ...payload }
    })

    return billboard
}
export const getManyBillboards = async (storeId: string) => {
    const billboards = await prismadb.billboard.findMany({
        where: { storeId },
    
    })

    return billboards
}
export const getBillboard = async (id: string) => {
    const billboard = await prismadb.billboard.findUnique({
        where: { id },
    
    })

    return billboard
}

export const createBillboard = async (
    payload: {
        label: string;
        imageUrl: string;
        storeId: string;
}) => {
    const billboard = await prismadb.billboard.create({
        data: { ...payload }
    })

    return billboard
}

export const deleteBillboard = async (id: string) => {

    const billboard = await prismadb.billboard.delete({
        where: { id }
    })

    return billboard
}

