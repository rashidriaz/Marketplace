import { useFormik } from 'formik';
import * as yup from 'yup';

export type SignInFormValues = {
  email: string;
  password: string;
};
export const SignInFormSchema = yup.object().shape({
  email: yup.string().email().required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});
export const initialValues = {
  email: '',
  password: '',
};

