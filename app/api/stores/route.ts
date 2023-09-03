import { isServerAuthed } from '@/lib/helpers'
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (
    req: Request,

) => {
    try {

        const { value: { name } } = await req.json()
        
        const userId = isServerAuthed() 

        if(!name) return new NextResponse('Name is required', { status: 400 })



        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }

        })

        return NextResponse.json(store)

    } catch (error) {
        console.log(`[STORE_POST] ${error}`)
        return new NextResponse('Internal error', { status: 500 })
    }
}