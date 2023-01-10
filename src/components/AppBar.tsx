import {Appbar} from "react-native-paper";
import {useAuth} from "../client/useFirebaseAuth";
import {Navigation} from "../types";

type Props = {
  navigation: Navigation;
};
export const AppBar = ({navigation}: Props) => {
  const {logOut} = useAuth()
  return (
    <Appbar.Header>
      <Appbar.Action icon="pencil" onPress={async () => {
        navigation.navigate("AddPostScreen");
      }}/>
      <Appbar.Content title="Marketplace Ltd."/>
      <Appbar.Action icon="logout" onPress={async () => {
        await logOut();
        navigation.navigate("HomeScreen");
      }}/>
    </Appbar.Header>
  )
}
