import { auth } from '@clerk/nextjs'
import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode,
  params: { storeId: string }
}) {

  const { userId } = auth()

  if(!userId) return redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if(!store) return redirect('/')

  return (
    <>
    <nav>Navbar</nav>
    { children }
    </>
  )
}