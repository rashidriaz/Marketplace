import {initialValues, SignInFormSchema, SignInFormValues} from "../../controllers/forms/useSignInForm";
import TextInput from "../TextInput";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../Button";
import {Formik} from "formik";
import React, {useState} from "react";
import {AuthResponseType, useAuth} from "../../client/useFirebaseAuth";
import {useRecoilState} from "recoil";
import {userAtom} from "../../models/User";
import {useFirestore} from "../../client/useFirestore";
import {Navigation} from "../../types";
import {theme} from "../../core/theme";
import Background from "../Background";
import {ActivityIndicator} from "react-native-paper";


type Props = {
  navigation: Navigation;
};

export default function LoginForm({navigation}: Props) {
  const [_userData, setUserData] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {signIn} = useAuth();
  const {getUser} = useFirestore()

  const onSubmit = async (values: SignInFormValues) => {
    setIsLoading(true);
    const response: AuthResponseType = await signIn(values.email, values.password);
    if (response.userId) {
      const user = await getUser(response.userId);
      if (!user) {
        setIsLoading(false);
        setError("Unable to signIn right now.");
        return;
      }
      setUserData(user);
      navigation.navigate("Dashboard");
    }
    if (response.errorMessage) {
      setIsLoading(false);
      setError(response.errorMessage);
      return;
    }

  }
  return isLoading ? (<ActivityIndicator animating={true} size="large" color={theme.colors.primary}/>) : (
    <Formik initialValues={initialValues} validationSchema={SignInFormSchema} onSubmit={onSubmit}>
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
          {touched.email && errors.email && <Text style={{fontSize: 14, color: 'red'}}>{errors.email}</Text>}
          <TextInput
            label="Password"
            returnKeyType="done"
            onBlur={handleBlur("password")}
            value={values.password}
            onChangeText={handleChange("password")}
            secureTextEntry
          />
          {touched.password && errors.password && <Text style={{fontSize: 14, color: 'red'}}>{errors.password}</Text>}

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            >
              <Text style={styles.label}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <Button disabled={!isValid} onPress={handleSubmit} mode="contained">
            Login
          </Button>

          {error && <Text style={{fontSize: 14, color: 'red'}}>{error}</Text>}
        </>
      )}
    </Formik>
  )
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  label: {
    color: theme.colors.secondary,
  },
});
