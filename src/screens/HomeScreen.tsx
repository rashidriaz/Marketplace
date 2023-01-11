import React, {memo, useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {Navigation} from '../types';
import {useAuth} from "../client/useFirebaseAuth";
import {ActivityIndicator} from "react-native-paper";
import {theme} from "../core/theme";

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({navigation}: Props) => {
  const {isUserSignedIn} = useAuth();
  useEffect(() => {
    return () => {
      if (isUserSignedIn) {
        navigation.navigate("Dashboard");
      }
    };
  },[]);

  return(<Background>
      <Logo/>
      <Header>Let's get Started</Header>

      <Paragraph>
        First you need to Login or create a new account if you are new here.
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>);
};

export default memo(HomeScreen);
