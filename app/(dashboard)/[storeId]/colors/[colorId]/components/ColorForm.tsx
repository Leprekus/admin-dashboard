'use client'
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Color } from '@prisma/client';
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

interface ColorFormProps { initialData: Color | null }

const FormSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type ColorFormValues = z.infer<typeof FormSchema>

export default function ColorForm({ initialData }: ColorFormProps) {
  
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentColor, setCurrentColor] = useState(initialData?.value ?? '')

    const title = initialData ? 'Edit color' : 'Create color'
    const description = initialData ? 'Edit existing colors' : 'Add a new color'
    const toastMessage = initialData ? 'Color updated' : 'Color created'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: initialData ?? { name: '', value: '' },
        
    })

    const onSubmit = async (data: ColorFormValues) => {
         try {
            setIsLoading(true)
            if(initialData)
                await Fetch.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            
            else await Fetch.post(`/api/${params.storeId}/colors`, data)
            
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage)

         } catch (error) {
            toast.error('Something went wrong')
            
         } finally { setIsLoading(false) }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            
            const deleteColor = Fetch.delete(`/api/${params.storeId}/colors/${params.colorId}`)
           
            await toast.promise(deleteColor, {
                loading: 'Deleting color...',
                success: 'Color Deleted!',
                error: 'Failed to delete color. Remove all categories using this color.'
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
            color='icon'
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
                                    placeholder='Color name'
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
                                    placeholder='Color value'
                                    { ...field }
                                    onChange={(e) => {
                                        setCurrentColor(e.target.value)
                                        field.onChange(e)
                                        }
                                    }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='value'
                    render={() => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                            <div 
                                className='h-6 w-6 rounded-full border' 
                                style={{ backgroundColor: currentColor}}/>
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