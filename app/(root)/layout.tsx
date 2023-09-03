import { isAuthed } from '@/lib/helpers'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function SetupLayout({
    children,
}: {
    children: ReactNode
}) {

    const userId = isAuthed()

    const store = await prismadb.store.findFirst({
        where: { userId }
    })

    if(store) return redirect(`/${store.id}`)

  return (
    <>
        { children }
    </>
  )
}
