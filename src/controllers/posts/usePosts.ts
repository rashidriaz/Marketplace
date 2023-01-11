import {useFirestore} from "../../client/useFirestore";
import {Post} from "../../models/Post";

export const usePosts = () => {
  const {getPosts} = useFirestore();

  async function getAllPosts() {
    const response = await getPosts();
    const postsList: Post[] = response.map((document) => {
      const {
        title,
        description,
        price,
        quantity,
        imageUrls,
        category,
        phoneNumber,
        username,
        userId
      } = document.data();
      return {title, description, price, quantity, imageUrls, category, phoneNumber, username, userId};
    })
    return postsList
  }
  return {getAllPosts}
}
