import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export const Fetch = {
    post: async (endpoint: string, value: any) => {

        const res = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ value })
        })
        
        const data = await res.json()
        
        return data
    }
}

export const isAuthed = () => {

    const { userId } = auth()
    
    if(!userId) return redirect('/sign-in')

    return userId
    
}

export const isServerAuthed = (): string | never => {

    const { userId } = auth()
    
    if(!userId) return new NextResponse('Unauthenticated', { status: 401 }) as never

    return userId
    
}