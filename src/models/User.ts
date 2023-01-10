import {Post} from "./Post";
import {atom} from "recoil";

export type User = {
  name: string;
  email: string;
  posts: Post[];
  phoneNumber: string;
}

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null
});
