import {useFormik} from 'formik';
import * as yup from 'yup';

export type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};
export const RegistrationFormValidationSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  password: yup.string().min(8).required('Please enter your password'),
  phoneNumber: yup.string().required("Please enter you phone number"),
});
export const initialValues = {
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
};
