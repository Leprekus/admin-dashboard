'use client'
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Size } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { useState } from 'react';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { Fetch } from '@/lib/helpers';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/AlertModal';

interface SizeFormProps { initialData: Size | null }

const FormSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValues = z.infer<typeof FormSchema>

export default function SizeForm({ initialData }: SizeFormProps) {
  
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const title = initialData ? 'Edit size' : 'Create size'
    const description = initialData ? 'Edit existing sizes' : 'Add a new size'
    const toastMessage = initialData ? 'Size updated' : 'Size created'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: initialData ?? { name: '', value: '' },
        
    })

    const onSubmit = async (data: SizeFormValues) => {
         try {
            setIsLoading(true)
            if(initialData)
                await Fetch.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            
            else await Fetch.post(`/api/${params.storeId}/sizes`, data)
            
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)

         } catch (error) {
            toast.error('Something went wrong')
            
         } finally { setIsLoading(false) }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            
            const deleteSize = Fetch.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
           
            await toast.promise(deleteSize, {
                loading: 'Deleting size...',
                success: 'Size Deleted!',
                error: 'Failed to delete size. Remove all categories using this size.'
              })
            router.refresh()
            router.push('/')
            
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
    <div className='flex items-center justify-between'>
        <Heading 
            title={title}
            description={description}
        />
        {initialData &&
        <Button 
            size='icon'
            variant='destructive'
            disabled={isLoading}
            onClick={() => setOpen(true)}
        >
            <Trash className='h-4 w-4'/>
        </Button>}
    </div>
    <Separator/>
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
        >
            <div className='grid grid-cols-3 gap-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isLoading} 
                                    placeholder='Size name'
                                    { ...field }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='value'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isLoading} 
                                    placeholder='Size value'
                                    { ...field }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <Button 
                disabled={ 
                    form.getValues().name === initialData?.name ||
                    isLoading
                } 
                type='submit'>
                { action }
            </Button>
        </form>
    </Form>
    <Separator/>
    </>
  )
}