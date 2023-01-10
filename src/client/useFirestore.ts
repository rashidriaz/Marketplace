import {doc, setDoc, getDoc, collection, writeBatch, query, getDocs} from "firebase/firestore";
import {useFirebaseApp} from "./useFirebaseApp";
import {User} from "../models/User";

export const useFirestore = () => {
  const {firestore} = useFirebaseApp();

  const createNewUser = async (user: User, userId: string) => {
    await setDoc(doc(firestore, "users", userId), {...user});
  }
  const getUser = async (userId: string) => {
    const documentReference = doc(firestore, "users", userId);
    const snapshot = await getDoc(documentReference);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    const user: User = {name: data.name, email: data.email, posts: data.posts, phoneNumber: data.phoneNumber};
    return user;
  }
  return {createNewUser, getUser}
}
