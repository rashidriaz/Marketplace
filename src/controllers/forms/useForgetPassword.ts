import { useFormik } from 'formik';
import * as yup from 'yup';

export type ForgetPasswordFormValues = {
  email: string;
};
export const ForgetPasswordFormSchema = yup.object().shape({
  email: yup.string().email().required('Please enter your email'),
});
export const initialValues = {
  email: ''
};

