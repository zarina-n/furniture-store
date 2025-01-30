import { AuthInputs } from './types'

export const loginInputs: AuthInputs[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
]

export const signUpInputs: AuthInputs[] = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Enter your name (optional)',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  {
    name: 'repeat_password',
    type: 'password',
    placeholder: 'Repeat your password',
  },
]

export const accountFormInputs: AuthInputs[] = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Enter your name',
    label: 'Change your user name',
  },
  // {
  //   name: 'email',
  //   type: 'email',
  //   placeholder: 'Enter your email',
  //   label: 'Change your user email',
  // },
  // {
  //   name: 'password',
  //   type: 'password',
  //   placeholder: 'Enter your password',
  //   label: 'Change your user password',
  // },
  // {
  //   name: 'repeat_password',
  //   type: 'password',
  //   placeholder: 'Repeat your password',
  // },
]
