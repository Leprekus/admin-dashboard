
'use client'

import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'

interface OrderClientProps { data: OrderColumn[] }

export default function OrderClient({ data }: OrderClientProps) {

  return (
    <>
          <Heading
              title={`Orders (${data.length})`}
              description='Manage orders for your store'
          />
        <Separator/>
        <DataTable searchKey='products' columns={columns} data={data}/>
        
    </>
  )
}