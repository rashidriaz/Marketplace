import * as yup from 'yup';

export type AddPostFormValues = {
  title: string;
  description: string;
  images: string[];
  category: string;
  quantity: number;
  price: number;
};
export const AddPostFormSchema = yup.object().shape({
  title: yup.string().required("Title cannot be left empty").max(15).min(5),
  description: yup.string().required("Description cannot be left empty").max(200).min(10),
  images: yup.array(),
  category: yup.string().required("Title cannot be left empty"),
  quantity: yup.number().required("Quantity cannot be left empty").min(1),
  price: yup.number().required("Price cannot be left empty").min(1),
});
export const initialValues = {
  title: '',
  description: '',
  images: [],
  category: '',
  quantity: 0,
  price: 0,
};

