import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {Navigation} from '../types';
import RegistrationForm from "../components/auth/ResgistrationForm";

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({navigation}: Props) => {
    return (
      <Background>
        <BackButton goBack={() => navigation.navigate('HomeScreen')}/>

        <Logo/>

        <Header>Create Account</Header>

          <RegistrationForm navigation={navigation}/>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
;

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
