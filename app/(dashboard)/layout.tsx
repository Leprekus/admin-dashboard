import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import Navbar from '@/components/Navbar'
import { isAuthed } from '@/lib/helpers'
export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode,
  params: { storeId: string }
}) {

  const userId = isAuthed()

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if(!store) return redirect('/')

  return (
    <>
    <Navbar/>
    { children }
    </>
  )
}