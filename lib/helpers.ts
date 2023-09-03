import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

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