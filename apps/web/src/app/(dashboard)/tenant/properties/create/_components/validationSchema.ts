import * as Yup from 'yup';

export const validationSchemas = [
  Yup.object().shape({
    category: Yup.string().required('Category is required'),
  }),
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    city: Yup.object().shape({
      value: Yup.string().required('City is required'),
      label: Yup.string().required('City label is required'),
    }),
    province: Yup.object().shape({
      value: Yup.string().required('Province is required'),
      label: Yup.string().required('Province label is required'),
    }),
    district: Yup.object().shape({
      value: Yup.string().required('District is required'),
      label: Yup.string().required('District label is required'),
    }),
    address: Yup.string().required('Address is required'),
  }),
];



export const initialValues = {
    category: '',
    name: '',
    description: '',
    city: '',
    province: '',
    district: '',
    address: '',
  };
  

export const roomValidationSchema = Yup.object().shape({
  type: Yup.string().required('Room type is required'),
  price: Yup.number().required('Price is required').min(0, 'Price cannot be negative'),
  stock: Yup.number().required('Stock is required').min(0, 'Stock cannot be negative'),
  description: Yup.string().required('Description is required'),
  capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be at least 1'),
  bedDetails: Yup.string().nullable(),
  roomFacilities: Yup.array().of(Yup.string()).required('Room facilities are required'),
  bathroomFacilities: Yup.array().of(Yup.string()).required('Bathroom facilities are required'),
});

export const initialValuesRoom = {
  type: '',
  price: '',
  stock: 1,
  description: '',
  capacity: 2,
  bedDetails: '',
  roomFacilities: [],
  bathroomFacilities: [],
};