'use client'

import { useUserProvider } from '@/providers/UserProvider'
import { changeUserName } from '@/api/actions'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UpdateUserNameFormDataSchema } from '@/lib/schemas'
import Input from '../Input/Input'
import styles from './ChangeUser.module.css'
import ChangeUserDataForm from './ChangeUserDataForm'

export type UpdateUserNameFormValues = z.infer<
  typeof UpdateUserNameFormDataSchema
>

export default function ChangeUserName() {
  const { user } = useUserProvider()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<UpdateUserNameFormValues>({
    defaultValues: {
      username: user?.displayName || '',
    },
    resolver: zodResolver(UpdateUserNameFormDataSchema),
  })

  const onSubmit: SubmitHandler<UpdateUserNameFormValues> = async (data) => {
    if (!user?.uid) {
      // eslint-disable-next-line no-console
      console.error('User ID is missing')
      return
    }
    await changeUserName(user.uid, data.username)
    // todo: add popup
  }
  return (
    <ChangeUserDataForm
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      changeType="username"
    >
      <Input<UpdateUserNameFormValues>
        name={'username'}
        type={'text'}
        placeholder={'Enter your name'}
        control={control}
        className={styles.form_input}
        errors={errors}
      />
    </ChangeUserDataForm>
  )
}
