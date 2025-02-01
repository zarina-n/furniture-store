'use client'

import { useUserProvider } from '@/providers/UserProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UpdatePasswordFormDataSchema } from '@/lib/schemas'
import Input from '../Input/Input'
import styles from './ChangeUser.module.css'
import { changeUserPassword } from '@/api/actions'
import ChangeUserDataForm from './ChangeUserDataForm'

export type UpdateUserPasswordFormValues = z.infer<
  typeof UpdatePasswordFormDataSchema
>

export default function ChangeUserPassword() {
  const { user } = useUserProvider()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<UpdateUserPasswordFormValues>({
    defaultValues: {
      password: '',
      repeat_password: '',
    },
    resolver: zodResolver(UpdatePasswordFormDataSchema),
  })

  const onSubmit: SubmitHandler<UpdateUserPasswordFormValues> = async (
    data,
  ) => {
    if (!user?.uid) {
      // eslint-disable-next-line no-console
      console.error('User ID is missing')
      return
    }
    await changeUserPassword(user.uid, data.password)

    // todo: add popup
  }
  return (
    <ChangeUserDataForm
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      changeType="password"
    >
      <Input<UpdateUserPasswordFormValues>
        name={'password'}
        type={'password'}
        placeholder={'Enter your new password'}
        control={control}
        className={styles.form_input}
        errors={errors}
      />
      <Input<UpdateUserPasswordFormValues>
        name={'repeat_password'}
        type={'password'}
        placeholder={'Repeat your new password'}
        control={control}
        className={styles.form_input}
        errors={errors}
      />
    </ChangeUserDataForm>
  )
}
