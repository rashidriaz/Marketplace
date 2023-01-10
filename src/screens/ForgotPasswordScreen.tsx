import React, {memo, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import Button from '../components/Button';
import {Navigation} from '../types';
import {Formik} from "formik";
import {Provider} from "react-native-paper";
import {
  initialValues,
  ForgetPasswordFormSchema,
  ForgetPasswordFormValues
} from "../controllers/forms/useForgetPassword";
import {useAuth} from "../client/useFirebaseAuth";
import {EmailConfirmationDialog} from "../components/auth/EmailConfirmationDialog";

type Props = {
  navigation: Navigation;
};

const ForgotPasswordScreen = ({navigation}: Props) => {
  const {sendResetPasswordLink} = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const onSubmit = async(values: ForgetPasswordFormValues) => {
    const email = values.email;
    await sendResetPasswordLink(email);
    setShowDialog(true);
  };

  return (
    <Provider>
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')}/>

      <Logo/>

      <Header>Reset your Password</Header>
      <Formik initialValues={initialValues} validationSchema={ForgetPasswordFormSchema} onSubmit={onSubmit}>
        {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
            isValid
          }) => (
          <>
            <TextInput
              label="Email"
              returnKeyType="next"
              onBlur={handleBlur("email")}
              value={values.email}
              onChangeText={handleChange("email")}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>}

            <Button disabled={!isValid} onPress={handleSubmit} mode="contained">
              Send reset link
            </Button>
          </>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>


        <EmailConfirmationDialog visible={showDialog} hideDialog={() => {
          setShowDialog(false);
          navigation.navigate("LoginScreen");
        }}/>
    </Background>
    </Provider>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
