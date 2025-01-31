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

export const formProps = {
  login: {
    header: 'Login',
    goToText: 'Not a member? Sign up now',
    forgotPassword: 'Forgot password?',
    submitText: 'Login',
    goToLink: 'signup',
  },

  signup: {
    header: 'Sign up',
    goToText: 'Back to Login',
    submitText: 'Sign up',
    signupText:
      'By signing up, I agree to the Privacy Police and the Terms of Services.',
    goToLink: 'login',
  },
  forgot_password: {
    header: 'Forgot password?',
    goToText: 'Back to Login',
    submitText: 'Submit',
    goToLink: 'login',
  },
}

export const changeUserFormProps = {
  email: {
    header: 'Change your email',
  },
  username: {
    header: 'Change your name',
  },
  password: {
    header: 'Change your password',
  },
}
