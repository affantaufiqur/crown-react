import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import './sign-in.component.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const loginGoogleUser = async () => {
    dispatch(googleSignInStart())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(emailSignInStart(email, password))
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          return alert('No user associated with this email')
        case 'auth/wrong-password':
          return alert('Please enter a valid password')
        default:
          console.log(error)
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already an account?</h2>
      <h1>Sign in with your email and passowrd</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          minLength="6"
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            onClick={loginGoogleUser}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}
export default SignInForm
