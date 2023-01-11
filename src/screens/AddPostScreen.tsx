import {Navigation} from "../types";
import {AppBar} from "../components/AppBar";
import AddPostForm from "../components/posts/add/AddPostForm";
import {View} from "react-native";

type Props = {
  navigation: Navigation;
};
export default function AddPostScreen({navigation}: Props){
  return (
    <>
    <AppBar navigation={navigation} title="Add new Post" showActions={false}/>
      <View style={{marginHorizontal: 10, marginTop: 20}}>
      <AddPostForm navigation={navigation}/>
      </View>
    </>
  )
}
