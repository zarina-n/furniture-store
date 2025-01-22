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
