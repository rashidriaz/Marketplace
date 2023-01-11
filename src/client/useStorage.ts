import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {useFirebaseApp} from "./useFirebaseApp";
import {useRecoilValue} from "recoil";
import {userAtom} from "../models/User";

export const useStorage = () => {
  const user = useRecoilValue(userAtom);
  const {app} = useFirebaseApp();
  const storage = getStorage(app);

  const uploadImages = async (list: string[]) => {
    if (!user) return;
    let refList: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = await fetch(list[i]);
      const blob = await item.blob();
      if (!item) return;
      const reference = `posts/${user.email}/${i}${new Date().toISOString()}${list[i].toString().split("ImagePicker/")[1]}`;
      refList.push();
      const storageReference = ref(storage, reference);
      const snapshot = await uploadBytes(storageReference, blob);
      const gsRef = await getDownloadURL(snapshot.ref);
      refList.push(gsRef);
    }
    return refList;

  }
  return {uploadImages}
}
