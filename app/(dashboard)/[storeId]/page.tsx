import Heading from '@/components/ui/Heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { priceFormatter } from '@/lib/utils'
import { CreditCardIcon, DollarSign, PackageIcon } from 'lucide-react'
import React from 'react'

interface DashboardPageProps {}
export default function DashboardPage({}: DashboardPageProps) {

  const totalRevenue = await getTotalRevenue
  const salesCount = () => {}
  const stockCount = () => {}
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading 
          title='Dashboard'
          description='Overview of your store'
          />
          <Separator/>
          <div className='grid gap-4 grid-cols-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Revenue
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {priceFormatter.format(0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Sales
                </CardTitle>
                <CreditCardIcon className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  00.00
                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Products in Stock
                </CardTitle>
                <PackageIcon className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  1
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    </div>
  )
}
