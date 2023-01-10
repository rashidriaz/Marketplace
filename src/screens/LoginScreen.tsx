import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {Navigation} from '../types';
import LoginForm from "../components/auth/LoginForm";

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({navigation}: Props) => {


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')}/>

      <Logo/>

      <Header>Welcome back.</Header>

      <LoginForm navigation={navigation}/>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  label: {
    color: theme.colors.secondary,
  },
});

export default memo(LoginScreen);
