import {doc, setDoc, getDoc, collection, writeBatch, query, getDocs} from "firebase/firestore";
import {useFirebaseApp} from "./useFirebaseApp";
import {User} from "../models/User";
import {Post} from "../models/Post";

export const useFirestore = () => {
  const {firestore} = useFirebaseApp();

  const createNewUser = async (user: User, userId: string) => {
    await setDoc(doc(firestore, "users", userId), {...user});
  }
  const createPost = async (post: Post) => {
    await setDoc(doc(firestore, "posts", `${post.userId}${new Date().toISOString()}`), {...post});
  }

  const getUser = async (userId: string) => {
    const documentReference = doc(firestore, "users", userId);
    const snapshot = await getDoc(documentReference);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    const user: User = {
      name: data.name,
      email: data.email,
      posts: data.posts,
      phoneNumber: data.phoneNumber,
      userId: data.userId
    };
    return user;
  }
  return {createNewUser, getUser, createPost}
}
