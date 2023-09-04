'use client'
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
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
import ApiAlert from '@/components/ui/api-alert';
import useOrigin from '@/hooks/useOrigin';

interface BillboardFormProps { initialData: Billboard | null }

const FormSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof FormSchema>

export default function BillboardForm({ initialData }: BillboardFormProps) {
  
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit existing billboards' : 'Add a new billboard'
    const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: initialData ?? { label: '', imageUrl: '' },
        
    })

    const onSubmit = async (data: BillboardFormValues) => {
         try {
            setIsLoading(true)
            await Fetch.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success(toastMessage)

         } catch (error) {
            toast.error('Something went wrong')
            
         } finally { setIsLoading(false) }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            const deleteStore = Fetch.delete(`/api/stores/${params.storeId}`)
            await toast.promise(deleteStore, {
                loading: 'Deleting store...',
                success: 'Store Deleted!',
                error: 'Failed to delete store. Remove all products and categories first.'
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
                    name='label'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isLoading} 
                                    placeholder='Billboard label'
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
                    form.getValues().label === initialData?.label ||
                    isLoading
                } 
                type='submit'>
                { action }
            </Button>
        </form>
    </Form>
    <Separator/>
    <ApiAlert 
    title='NEXT_PUBLIC_API_URL' 
    description={`${origin}/api/${params.storeId}`}
    variant='public'
    />
    </>
  )
}