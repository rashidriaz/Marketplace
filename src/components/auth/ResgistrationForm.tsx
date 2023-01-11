import {Formik} from "formik";
import {
  initialValues,
  RegistrationFormValidationSchema,
  RegistrationFormValues
} from "../../controllers/forms/useRegistrationForm";
import TextInput from "../TextInput";
import {Text} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Button from "../Button";
import React, {useRef, useState} from "react";
import {StyleSheet} from "react-native";
import {AuthResponseType, useAuth} from "../../client/useFirebaseAuth";
import {Navigation} from "../../types";
import {useFirestore} from "../../client/useFirestore";
import {User} from "../../models/User";
import {useRecoilState} from "recoil";
import {userAtom} from "../../models/User";
import {ActivityIndicator} from "react-native-paper";
import {theme} from "../../core/theme";

type Props = {
  navigation: Navigation;
};
export default function RegistrationForm({navigation}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_userData, setUserData] = useRecoilState(userAtom);
  const {signUp} = useAuth();
  const {createNewUser} = useFirestore()
  const [error, setError] = useState<string | null>(null);
  const phoneInputRef = useRef<PhoneInput>(null);
  const onSubmit = async (values: RegistrationFormValues) => {
    if (error) return;
    setIsLoading(true);
    const response: AuthResponseType = await signUp(values.email, values.password);
    if (response.userId) {
      const user: User = {name: values.name, email: values.email, phoneNumber: values.phoneNumber, posts: [], userId: response.userId};
      await createNewUser(user, response.userId);
      setUserData(user);
      navigation.navigate("Dashboard");
    }
    if (response.errorMessage) {
      setError(response.errorMessage);
    }
    setIsLoading(false);
  }
  return isLoading ? (<ActivityIndicator animating={true} size="large" color={theme.colors.primary}/>) : (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={RegistrationFormValidationSchema}>
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
            label="Name"
            returnKeyType="next"
            value={values.name}
            onBlur={handleBlur("name")}
            onChangeText={handleChange("name")}
            touched={!!touched.name}
            errorText={errors.name}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            onBlur={handleBlur("email")}
            value={values.email}
            onChangeText={handleChange("email")}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            touched={!!touched.email}
            errorText={errors.email}
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            onBlur={handleBlur("password")}
            value={values.password}
            onChangeText={handleChange("password")}
            secureTextEntry
            touched={!!touched.password}
            errorText={errors.password}
          />
          <PhoneInput ref={phoneInputRef} defaultCode="PK" value={values.phoneNumber}
                      onChangeFormattedText={value => {
                        if (!phoneInputRef.current?.isValidNumber(value.toString())) {
                          setError("Invalid phone number")
                        } else {
                          setError(null);
                          const onChangeHandler = handleChange("phoneNumber")
                          onChangeHandler(value);
                        }
                      }}
                      textContainerStyle={{margin: 3}}
                      containerStyle={styles.phoneInput}/>
          {(error) &&
              <Text style={styles.errorMessage}>{error}</Text>}
          <Button disabled={!isValid} onPress={handleSubmit} mode="contained" style={styles.button}>
            Create new Account
          </Button>
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  phoneInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    width: "100%"
  },
  errorMessage: {fontSize: 14, color: 'red'},
  button: {
    marginTop: 24,
  },
})
