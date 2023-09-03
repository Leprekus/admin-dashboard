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