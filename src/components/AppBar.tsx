import {Appbar} from "react-native-paper";
import {useAuth} from "../client/useFirebaseAuth";
import {Navigation} from "../types";

type Props = {
  navigation: Navigation;
  title?:string
  showActions?:boolean
};
export const AppBar = ({navigation, title, showActions=true}: Props) => {
  const {logOut} = useAuth()
  return (
    <Appbar.Header>
      {showActions && <Appbar.Action icon="pencil" onPress={async () => {
        navigation.navigate("AddPostScreen");
      }}/>}
      <Appbar.Content title={title || "Marketplace Ltd."}/>
      {showActions && <Appbar.Action icon="logout" onPress={async () => {
        await logOut();
        navigation.navigate("HomeScreen");
      }}/>}
    </Appbar.Header>
  )
}
