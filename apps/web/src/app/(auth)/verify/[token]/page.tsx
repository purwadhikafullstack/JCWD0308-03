'use client';

import SingUpForm from '@/components/auth/SignUpForm';
import { VerifyEmail } from '@/lib/account';
import { useParams, useRouter } from 'next/navigation';
import * as yup from 'yup';

const initialValues = {
  password: '',
};

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be less than 15 characters')
    .required('Password is required'),
});

const VerifyPage = () => {
  const params = useParams();
  const router = useRouter()

  const handleVerify = async (values: any, actions: any) => {
    try {
      const token = params.token.toString();
      const result = await VerifyEmail(values, token, 'users');
      
      // console.log('result : ', result);
      alert('verify success');
      router.push('/login/user');
    } catch (error:any) {
      console.error('failed to verify email : ', error);
      alert('Verification failed: ' + error.message);
    }
    actions.resetForm();
  };

  return (
    <div>
      <SingUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="Verify Email"
        subtitle="Enter your password"
        fields={[
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
          },
        ]}
        onSubmit={handleVerify}
        buttonLabel="Verify"
        linkHref="/"
      />
    </div>
  );
};

export default VerifyPage;
