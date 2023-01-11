import React, {memo, useState} from 'react';
import {Animated, StyleSheet} from "react-native";
import {Navigation} from '../types';
import {AppBar} from "../components/AppBar";
import {Searchbar, Card, Avatar, Text} from "react-native-paper";
import {View, ScrollView} from "react-native";
import Logo from "../components/Logo";
import {Post} from "../models/Post";
import {usePosts} from "../controllers/posts/usePosts";
import {Categories} from "../components/categories/categories.component";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({navigation}: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (<ScrollView>
    <AppBar navigation={navigation}/>
    <View style={styles.pageContainer}>
      <View style={styles.logoContainer}>
        <Logo/>
      </View>
      <View style={{marginBottom: 20}}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <Categories />
    </View>
  </ScrollView>)
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
