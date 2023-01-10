import React, {memo} from 'react';
import {StyleSheet} from "react-native";
import {Navigation} from '../types';
import {AppBar} from "../components/AppBar";
import {Searchbar} from "react-native-paper";
import {View} from "react-native";
import Logo from "../components/Logo";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({navigation}: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (<>
    <AppBar navigation={navigation}/>
    <View style={styles.pageContainer}>
      <View style={styles.logoContainer}>
        <Logo/>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

    </View>
  </>)
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  logoContainer: {
    alignItems: "center",
  }
})
export default memo(Dashboard);
