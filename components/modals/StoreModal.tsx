'use client'
import React, { useState } from 'react'
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
import { Fetch } from '@/lib/helpers'
import toast from 'react-hot-toast'

const FormSchema = z.object({
  name: z.string().min(1),
  
})

export default function StoreModal() {
  
  const storeModal = useStoreModal()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '' }
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    //TODO: create store
    console.log('values: ', values);

    try {
      setIsLoading(true)

      const createStore =  Fetch.post('/api/stores', values)
     
      toast.promise(createStore, {
        loading: 'Creating your store...',
        success: 'Store Created!',
        error: 'Failed to create store.'
      })

      const store = await createStore
  
      window.location.assign(`/${store.id}`)
      
     
    } 
    catch(error) { 

      console.error(error)
      toast.error('Failed to create store.') 
    } 
    finally { setIsLoading(false) }
    
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
                    <Input 
                      disabled={isLoading} 
                      placeholder='E-Commerce' { ...field }/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button 
                disabled={isLoading}
                variant='outline' onClick={storeModal.Close}>Cancel</Button>
                <Button 
                disabled={isLoading}
                type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
    </Modal>
  )
}
