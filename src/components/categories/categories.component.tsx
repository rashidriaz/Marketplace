import {ScrollView} from "react-native";
import {Category} from "../category/category.component";
import {usePosts} from "../../controllers/posts/usePosts";
import {categoriesStyles} from "./categories.styles";
import {CategoriesList} from "../../models/Categories";
import {useEffect, useState} from "react";
import {Post} from "../../models/Post";
export const Categories = () => {
  const {getAllPosts} = usePosts()
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
      (async function () {
        const posts = await getAllPosts();
        setPosts(posts)
      })()
  });

  const {containerStyles} = categoriesStyles;
  return (
    <ScrollView style={containerStyles}>
      {posts.length > 0 && CategoriesList.map(category => {
        return <Category key={category.icon} horizontalScroll={true} title={category.title}
                         posts={posts.filter(post => post.category === category.title)}/>
      })}
    </ScrollView>
  )
}
