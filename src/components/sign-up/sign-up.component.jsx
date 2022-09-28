import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocument } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up.component.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, passwordConfirmation } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== passwordConfirmation) {
      alert('Password does not match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocument(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <h1>Sign up with your email and passowrd</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          minLength="6"
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}
export default SignUpForm
