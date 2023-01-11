import {Navigation} from "../../../types";
import React, {useState} from "react";
import {ActivityIndicator} from "react-native-paper";
import {theme} from "../../../core/theme";
import {Formik} from "formik";
import TextInput from "../../TextInput";
import {Image, Text, ScrollView, View} from "react-native";
import Button from "../../Button";
import {AddPostFormSchema, AddPostFormValues, initialValues} from "../../../controllers/forms/useAddPostForm";
import SelectDropdown from 'react-native-select-dropdown'
import {CategoriesList} from "../../../models/Categories";
import {StyleSheet} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import {useStorage} from "../../../client/useStorage";
import {useFirestore} from "../../../client/useFirestore";
import {Post} from "../../../models/Post";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../../models/User";

type Props = {
  navigation: Navigation;
};
export default function AddPostForm({navigation}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [images, setImages] = useState<string[]>([]);
  const {uploadImages} = useStorage();
  const {createPost} = useFirestore();
  const user = useRecoilValue(userAtom);
  const pickImage = async () => {
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImages(result.assets.map(image => image.uri));
    }
  };
  const onSubmit = async (values: AddPostFormValues) => {
    if (images.length < 1) {
      setError("Select at least one image");
      return;
    }
    setIsLoading(true);
    const urls = await uploadImages(images);
    if (urls && user) {
      const post: Post = {
        title: values.title,
        description: values.description,
        category: values.category,
        quantity: values.quantity,
        price: values.price,
        imageUrls: urls,
        username: user.name,
        userId: user.userId,
        phoneNumber: user.phoneNumber
      }
      try {
        await createPost(post);
        navigation.navigate("Dashboard");
      } catch (e) {
        const error = e as Error;
        setError(error.message);
      }
    }
    setIsLoading(false);
  }

  const getCategories = () => CategoriesList.map(c => c.title as string);
  return isLoading ? (<ActivityIndicator animating={true} size="large" color={theme.colors.primary}/>) : (
    <ScrollView style={{marginBottom: 100}}>
      <Formik initialValues={initialValues} validationSchema={AddPostFormSchema} onSubmit={onSubmit}>
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
            <Button onPress={pickImage}>Select Image from library</Button>
            <View style={{flex: 5, flexDirection: "row", marginBottom: 100}}>
              {images.length > 0 && images.map(image => (
                <Image source={{uri: image}} style={{width: 50, height: 50, margin: 5}}/>
              ))}
            </View>
            <TextInput
              label="Title"
              returnKeyType="next"
              onBlur={handleBlur("title")}
              value={values.title}
              onChangeText={handleChange("title")}
              autoCapitalize="none"
              errorText={errors.title}
              touched={!!touched.title}
            />

            <TextInput
              label="Description"
              returnKeyType="next"
              numberOfLines={5}
              multiline={true}
              onBlur={handleBlur("description")}
              value={values.description}
              onChangeText={handleChange("description")}
              autoCapitalize="none"
              errorText={errors.description}
              touched={!!touched.description}
            />
            <Text style={styles.label}>Select Category:</Text>
            <SelectDropdown data={getCategories()} onSelect={(value, _) => {
              handleChange("category")(value)
            }}
                            buttonTextAfterSelection={(value, _) => value} rowTextForSelection={(row, _) => row}
                            onChangeSearchInputText={(value) => handleChange("category")(value)}
                            buttonStyle={styles.container}/>

            <TextInput
              label="Quantity"
              returnKeyType="next"
              onBlur={handleBlur("quantity")}
              value={values.quantity.toString()}
              onChangeText={handleChange("quantity")}
              autoCapitalize="none"
              errorText={errors.quantity}
              touched={!!touched.quantity}
            />
            <TextInput
              label="Price"
              returnKeyType="next"
              onBlur={handleBlur("price")}
              value={values.price.toString()}
              onChangeText={handleChange("price")}
              autoCapitalize="none"
              errorText={errors.price}
              touched={!!touched.price}
            />

            <Button style={{position: "relative", bottom: 0, marginBottom : 20}} disabled={!isValid} onPress={handleSubmit} mode="contained">
              Create post
            </Button>

            {error && <Text style={{fontSize: 14, color: 'red'}}>{error}</Text>}
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    width: '100%',
    marginVertical: 12,
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
});
