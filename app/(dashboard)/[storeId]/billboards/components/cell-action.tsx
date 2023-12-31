'use client'

import { BillboardColumn } from './column'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { onCopy } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Fetch } from '@/lib/helpers'
import AlertModal from '@/components/modals/AlertModal'

interface CellActionProps {
    data: BillboardColumn
}

export default function CellAction({ data }: CellActionProps) {
  
    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    console.log(params.billboardId)
    const onDelete = async () => {
        try {
            setIsLoading(true)
            
            const deleteStore = Fetch.delete(`/api/${params.storeId}/billboards/${data.id}`)
           
            await toast.promise(deleteStore, {
                loading: 'Deleting billboard...',
                success: 'Billboard Deleted!',
                error: 'Failed to delete billboard. Remove all categories using this billboard.'
              })
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            
        } catch(error) {
            console.error(error)
        } finally { 
            setIsLoading(false)
            setOpen(false)
        }
    }
    return (
    <>
    <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        isLoading={isLoading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-9 w-8 p-0'>
                <span className='sr-only'>Open Menu</span>
                <MoreHorizontal className='h-4 w-4'/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                <Copy className='mr-2 h-4'/>
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                <Edit className='mr-2 h-4'/>
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className='mr-2 h-4'/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}