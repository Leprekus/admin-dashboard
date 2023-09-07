import prismadb from '@/lib/prismadb'
import { Order } from '@prisma/client'

export const updateOrder = async (id: string, payload: Partial<Order>) => {
    const order = await prismadb.order.updateMany({
        where: { id },
        data: { ...payload }
    })

    return order
}
export const getManyOrders = async (storeId: string) => {
    const orders = await prismadb.order.findMany({
        where: { storeId },
        include: { 
            orderItems: {
                include: { product: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    
    })

    return orders
}
export const getOrder = async (id: string) => {
    const order = await prismadb.order.findUnique({
        where: { id },
    
    })

    return order
}

export const createOrder = async (
    payload: {
        label: string;
        imageUrl: string;
        storeId: string;
}) => {
    const order = await prismadb.order.create({
        data: { ...payload }
    })

    return order
}

export const deleteOrder = async (id: string) => {

    const order = await prismadb.order.delete({
        where: { id }
    })

    return order
}

