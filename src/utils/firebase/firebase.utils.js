import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, doc, getDocs, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBOZ_3W0M9A-gNOH4w_O0gJhIfQViyPq54',
  authDomain: 'crown-react-db-6c6dd.firebaseapp.com',
  projectId: 'crown-react-db-6c6dd',
  storageBucket: 'crown-react-db-6c6dd.appspot.com',
  messagingSenderId: '420413822435',
  appId: '1:420413822435:web:d9969b7fecd6ef38e3fcd6',
}

const firebaseApp = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
export const db = getFirestore()
export const createUserDocument = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
