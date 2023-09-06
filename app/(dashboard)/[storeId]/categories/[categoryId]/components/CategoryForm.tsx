'use client'
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Billboard, Category } from '@prisma/client';
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

interface CategoryFormProps { 
    initialData: Category | null;
    billboards: Billboard[];
 }

const FormSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof FormSchema>

export default function CategoryForm({ initialData, billboards }: CategoryFormProps) {
  
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const title = initialData ? 'Edit category' : 'Create category'
    const description = initialData ? 'Edit existing categories' : 'Add a new category'
    const toastMessage = initialData ? 'Category updated' : 'Category created'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: initialData ?? { name: '', billboardId: '' },
        
    })

    const onSubmit = async (data: CategoryFormValues) => {
         try {
            setIsLoading(true)
            if(initialData)
                await Fetch.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
            
            else await Fetch.post(`/api/${params.storeId}/categories`, data)
            
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success(toastMessage)

         } catch (error) {
            toast.error('Something went wrong')
            
         } finally { setIsLoading(false) }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            
            const deleteCategory = Fetch.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
           
            await toast.promise(deleteCategory, {
                loading: 'Deleting category...',
                success: 'Category Deleted!',
                error: 'Failed to delete category. Remove all categories using this category.'
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
                                    placeholder='Category name'
                                    { ...field }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='billboardId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Billboard</FormLabel>
                            <Select 
                                disabled={isLoading} 
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            defaultValue={field.value}
                                            placeholder='Select a billboard'
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {billboards.map(billboard => (
                                    <SelectItem 
                                    key={billboard.id}
                                    value={billboard.id}
                                    >
                                        {billboard.label}
                                    </SelectItem>))}
                                </SelectContent>
                            </Select>
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