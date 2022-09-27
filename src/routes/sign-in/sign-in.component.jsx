import { signInWithGooglePopup, createUserDocument } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up/sign-up.component'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocument(user)
  }

  return (
    <div>
      Sign in page
      <button onClick={logGoogleUser}>Sign in with google</button>
      <SignUpForm />
    </div>
  )
}
export default SignIn
