'use client'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import {useForm, Controller}  from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import { Issue } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/createIssueSchema'
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage= () => {
 const [error,setError] = useState("");
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
   resolver  : zodResolver(createIssueSchema)
});
  return (
    <div className='max-w-xl  space-y-3'>
      {error && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='max-w-xl space-y-3 '
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error occured')
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
         <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit new issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage


