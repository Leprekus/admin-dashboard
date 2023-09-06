'use client'

import { SizeColumn } from './column'
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
    data: SizeColumn
}

export default function CellAction({ data }: CellActionProps) {
  
    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onDelete = async () => {
        try {
            setIsLoading(true)
            
            const deleteStore = Fetch.delete(`/api/${params.storeId}/sizes/${data.id}`)
           
            await toast.promise(deleteStore, {
                loading: 'Deleting size...',
                success: 'Size Deleted!',
                error: 'Failed to delete size. Remove all products using this size.'
              })
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            
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
            <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
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