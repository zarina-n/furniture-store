import { z } from 'zod'

export const LoginFormDataSchema = z.object({
  email: z
    .string()
    .nonempty('Please fill in this field.')
    .min(1, { message: 'Please fill in this field.' })
    .email({
      message: 'Please enter a valid email address (Ex: johndoe@domain.com).',
    }),
  password: z
    .string()
    .nonempty('Please fill in this field.')
    .min(6, { message: 'Must be a minimum of 6 characters.' }),
})

export const SignupFormDataSchema = z
  .object({
    username: z
      .string()
      .max(12, { message: 'Must be a maximum of 12 characters.' }),
    email: z.string().nonempty('Please fill in this field.').email({
      message: 'Please enter a valid email address (Ex: johndoe@domain.com).',
    }),
    password: z
      .string()
      .nonempty('Please fill in this field.')
      .min(6, { message: 'Must be a minimum of 6 characters.' }),
    repeat_password: z
      .string()
      .nonempty('Please fill in this field.')
      .min(6, { message: 'Must be a minimum of 6 characters.' }),
    is_subscribed: z.boolean().default(false),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Your passwords don't match",
    path: ['repeat_password'],
  })

export const UpdateProfileFormDataSchema = z.object({
  username: z
    .string()
    .max(6, { message: 'Must be a maximum of 6 characters.' }), // todo: change max length
  //   email: z.string().nonempty('Please fill in this field.').email({
  //     message: 'Please enter a valid email address (Ex: johndoe@domain.com).',
  //   }),
  //   password: z
  //     .string()
  //     .nonempty('Please fill in this field.')
  //     .min(6, { message: 'Must be a minimum of 6 characters.' }),
  //   repeat_password: z
  //     .string()
  //     .nonempty('Please fill in this field.')
  //     .min(6, { message: 'Must be a minimum of 6 characters.' }),
  //   is_subscribed: z.boolean().default(false),
  // })
  // .refine((data) => data.password === data.repeat_password, {
  //   message: "Your passwords don't match",
  //   path: ['repeat_password'],
})
