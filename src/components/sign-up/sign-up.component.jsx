import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocument } from '../../utils/firebase/firebase.utils'

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
    <div>
      <h1>Sign up with your email and passowrd</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          minLength="6"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          minLength="6"
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}
export default SignUpForm
