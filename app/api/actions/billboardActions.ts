import prismadb from '@/lib/prismadb'
import { Billboard } from '@prisma/client'

export const updateBillboard = async (id: string, payload: Partial<Billboard>) => {
    const billboard = await prismadb.billboard.updateMany({
        where: { id },
        data: { ...payload }
    })
}
export const getManyBillboards = async (id: string) => {
    const billboard = await prismadb.billboard.findMany({
        where: { id },
    
    })
}

