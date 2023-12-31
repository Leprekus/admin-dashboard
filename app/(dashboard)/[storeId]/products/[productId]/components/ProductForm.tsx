'use client'
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Category, Color, Image, Product, Size } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import _ from 'lodash'
import { useState } from 'react';
import { 
    Form, 
    FormControl, 
    FormDescription, 
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
import ImageUpload from '@/components/ui/ImageUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductFormProps { 
    initialData: Product & {
    images: Image[]
} | null ;
    categories: Category[];
    colors: Color[];
    sizes: Size[];
}

const FormSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string().min(1) }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})

type ProductFormValues = z.infer<typeof FormSchema>

export default function ProductForm({ 
    initialData,
    categories,
    colors,
    sizes,
}: ProductFormProps) {
  
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const title = initialData ? 'Edit product' : 'Create product'
    const description = initialData ? 'Edit existing products' : 'Add a new product'
    const toastMessage = initialData ? 'Product updated' : 'Product created'
    const action = initialData ? 'Save changes' : 'Create'

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: 
        initialData  ? 
        {
            ...initialData,
            price: parseFloat(String(initialData?.price))
        } : 
        { 
            name: '', 
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            isFeatured: false,
            isArchived: false,
        },
        
    })


    const onSubmit = async (data: ProductFormValues) => {
   
         try {
            setIsLoading(true)
            if(initialData)
                await Fetch.patch(`/api/${params.storeId}/products/${params.productId}`, data)
            
            else await Fetch.post(`/api/${params.storeId}/products`, data)
            
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success(toastMessage)

         } catch (error) {
            toast.error('Something went wrong')
            
         } finally { setIsLoading(false) }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            
            const deleteProduct = Fetch.delete(`/api/${params.storeId}/products/${params.productId}`)
           
            await toast.promise(deleteProduct, {
                loading: 'Deleting product...',
                success: 'Product Deleted!',
                error: 'Failed to delete product. Remove all categories using this product.'
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
            <FormField
                    control={form.control}
                    name='images'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value.map(image => image.url)}
                                    disabled={isLoading}
                                    onChange={(url) => field.onChange([ 
                                        ...field.value, { url } 
                                    ])}
                                    onRemove={(url) => field.onChange([ 
                                        ...field.value
                                        .filter(current => current.url !== url) 
                                    ])}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
             />
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
                                    placeholder='Product name'
                                    { ...field }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isLoading} 
                                    placeholder='0.00'
                                    type='number'
                                    { ...field }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
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
                                            placeholder='Select a category'
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map(category => (
                                    <SelectItem 
                                    key={category.id}
                                    value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='sizeId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size</FormLabel>
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
                                            placeholder='Select a size'
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sizes.map(size => (
                                    <SelectItem 
                                    key={size.id}
                                    value={size.id}
                                    >
                                        {size.name}
                                    </SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='colorId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
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
                                            placeholder='Select a color'
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {colors.map(color => (
                                    <SelectItem 
                                    key={color.id}
                                    value={color.id}
                                    >
                                        <div className='flex gap-2 items-center'>
                                            {color.name}
                                            <div 
                                            className='w-4 h-4 rounded-full' 
                                            style={{ backgroundColor: color.value }}
                                            />
                                        </div>
                                    </SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='isFeatured'
                    render={({ field }) => (
                        <FormItem 
                            className='
                            flex 
                            flex-row 
                            items-start 
                            space-x-3
                            space-y-0
                            rounded-md
                            border
                            p-4
                            '>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>
                                    Featured
                                </FormLabel>
                                <FormDescription>
                                    Featured products will appear on the homepage
                                </FormDescription>
                            </div>
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='isArchived'
                    render={({ field }) => (
                        <FormItem 
                            className='
                            flex 
                            flex-row 
                            items-start 
                            space-x-3
                            space-y-0
                            rounded-md
                            border
                            p-4
                            '>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>
                                    Archived
                                </FormLabel>
                                <FormDescription>
                                    Archived products will not be visible in your store.
                                </FormDescription>
                            </div>
                            
                        </FormItem>
                    )}
                />
            </div>
            <Button 
                disabled={ 
                    _.isEqual(form.getValues(), initialData) ||
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