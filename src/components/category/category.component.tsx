import {View, Text, FlatList} from "react-native";
import {CardItem} from "../cardItem/CartItem.component";
import {categoryStyles} from "./categopry.styles";
import {Post} from "../../models/Post";

export type CategoryProps = {
  horizontalScroll: boolean,
  title: string,
  posts: Post[],
}
export const Category = ({horizontalScroll, title, posts: posts}: CategoryProps) => {
  const {containerStyles, titleStyles} = categoryStyles;
  return posts.length > 0 ? (
    <View style={containerStyles}>
      <Text style={titleStyles}>{title}</Text>
      <FlatList showsHorizontalScrollIndicator={false} horizontal={horizontalScroll} data={posts}
                keyExtractor={o => o.title}
                renderItem={({item}) => (<CardItem post={item}/>)}/>
    </View>
  ) : <View></View>;
}
