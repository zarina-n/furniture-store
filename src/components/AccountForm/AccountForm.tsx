import { accountFormInputs } from '@/lib/authInputs'
import styles from './AccountForm.module.css'
import Button from '../Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UpdateProfileFormDataSchema } from '@/lib/schemas'
import { useUserProvider } from '@/providers/UserProvider'
import Input from '../Input/Input'
import { changeUserName } from '@/api/actions/actions'

export type UpdateProfileFormValues = z.infer<
  typeof UpdateProfileFormDataSchema
>

export default function AccountForm() {
  const { user } = useUserProvider()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<UpdateProfileFormValues>({
    defaultValues: {
      username: user?.displayName || '',
      //   email: user?.email,
      //   password: '',
    },
    resolver: zodResolver(UpdateProfileFormDataSchema),
  })

  const onSubmit: SubmitHandler<UpdateProfileFormValues> = async (data) => {
    if (!user?.uid) {
      console.error('User ID is missing')
      return
    }
    await changeUserName(user.uid, data.username)
    // todo: add popup
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_inputs}>
        {accountFormInputs.map(({ name, type, placeholder, label }) => (
          <div key={name} className={styles.form_input_wrapper}>
            <label htmlFor={name}>{label}</label>
            <Input<UpdateProfileFormValues>
              id={name}
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              control={control}
              className={styles.form_input}
              errors={errors}
            />
          </div>
        ))}
      </div>
      <Button
        title={isLoading || isSubmitting ? 'Submitting...' : 'Submit'}
        active={true}
        // disabled={!!errors}
        type="submit"
      />
    </form>
  )
}
