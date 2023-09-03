'use client'
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Store } from '@prisma/client';
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

interface SettingsFormProps { store: Store }

const FormSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof FormSchema>

export default function SettingsForm({ store }: SettingsFormProps) {
  
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: store
    })

    const onSubmit = async (data: SettingsFormValues) => {
         
        console.log(data)
    }

    return (
    <>
    <div className='flex items-center justify-between'>
        <Heading 
            title='Settings'
            description='Manage store preferences'
        />
        <Button 
            size='icon'
            variant='destructive'
            disabled={isLoading}
            onClick={() => setOpen(true)}
        >
            <Trash className='h-4 w-4'/>
        </Button>
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
                                    placeholder='Store name'
                                    { ...field }
                                    />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <Button 
                disabled={isLoading} 
                type='submit'>
                Save Changes
            </Button>
        </form>
    </Form>
    </>
  )
}