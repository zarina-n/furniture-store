'use client'

import { useUserProvider } from '@/providers/UserProvider'
import { changeUserEmail } from '@/api/actions'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UpdateUserEmailFormDataSchema } from '@/lib/schemas'
import Input from '../Input/Input'
import styles from './ChangeUser.module.css'
import ChangeUserDataForm from './ChangeUserDataForm'

export type UpdateUserEmailFormValues = z.infer<
  typeof UpdateUserEmailFormDataSchema
>

export default function ChangeUserEmail() {
  const { user } = useUserProvider()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<UpdateUserEmailFormValues>({
    defaultValues: {
      email: user?.email || '',
    },
    resolver: zodResolver(UpdateUserEmailFormDataSchema),
  })

  const onSubmit: SubmitHandler<UpdateUserEmailFormValues> = async (data) => {
    if (!user?.uid) {
      // eslint-disable-next-line no-console
      console.error('User ID is missing')
      return
    }

    await changeUserEmail(user.uid, data.email)
    // todo: add popup
  }
  return (
    <ChangeUserDataForm
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      changeType="email"
    >
      <Input<UpdateUserEmailFormValues>
        name={'email'}
        type={'email'}
        placeholder={'Enter your email'}
        control={control}
        className={styles.form_input}
        errors={errors}
      />
    </ChangeUserDataForm>
  )
}
