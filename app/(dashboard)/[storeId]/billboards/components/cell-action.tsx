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

interface CellActionProps {
    data: BillboardColumn
}

export default function CellAction({ data }: CellActionProps) {
  return (
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
            <DropdownMenuItem>
                <Edit className='mr-2 h-4'/>
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Trash className='mr-2 h-4'/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}