'use client'
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import useStoreModal from '@/hooks/useStoreModal'
import Modal from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'

const FormSchema = z.object({
  name: z.string().min(1),
  
})

export default function StoreModal() {
  
  const storeModal = useStoreModal()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '' }
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    //TODO: create store
    console.log('values: ', values);
    
  }
  
  return (
    <Modal
    title='Store Modal'
    description='Add a new store to manage products and categories'
    isOpen={storeModal.isOpen}
    onClose={storeModal.Close}
    >
        <div className='space-y-4 py-4 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='E-Commerce' { ...field }/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button variant='outline' onClick={storeModal.Close}>Cancel</Button>
                <Button type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
    </Modal>
  )
}
