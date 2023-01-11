import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {useFirebaseApp} from "./useFirebaseApp";

export type AuthResponseType = {
  userId: string | undefined,
  errorMessage: string | undefined,
}
export const useAuth = () => {
  const {auth} = useFirebaseApp()

  const signUp = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      return {userId: response.user.uid, errorMessage: undefined};
    } catch (e) {
      const error = e as Error;
      return {errorMessage: error.message, userId: undefined}
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {userId: response.user.uid, errorMessage: undefined};
    } catch (e) {
      const error = e as Error;
      return {errorMessage: error.message, userId: undefined}
    }
  }

  const logOut = async () => {
    await signOut(auth);
  }
  const sendResetPasswordLink = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.log(e)
    }
  }
  return {
    isUserSignedIn: !!auth.currentUser,
    signUp,
    signIn,
    logOut,
    sendResetPasswordLink,
  }
}

