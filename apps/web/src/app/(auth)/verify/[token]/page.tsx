// 'use client';

// import SingUpForm from '@/components/auth/SignUpForm';
// import VerifyForm from '@/components/auth/verifyAccountForm';
// import { VerifyEmail } from '@/lib/account';
// import { useParams, useRouter } from 'next/navigation';
// import * as yup from 'yup';

// const VerifyPage = () => {
//   const params = useParams();
//   const router = useRouter()

//   const handleVerify = async (values: any, actions: any) => {
//     try {
//       const token = params.token.toString();
//       const result = await VerifyEmail(values, token, 'users');

//       // console.log('result : ', result);
//       alert('verify success');
//       router.push('/login/user');
//     } catch (error:any) {
//       console.error('failed to verify email : ', error);
//       alert('Verification failed: ' + error.message);
//     }
//     actions.resetForm();
//   };

//   return (
//     <div>
//       <VerifyForm
//       title='Verify your Account'
//       subtitle='Enter password and verify your account'
//       fields={[
//         {
//           name: 'password',
//           label: 'Password',
//           type: 'password',
//           placeholder: 'Enter your password',
//         }
//       ]}
//       onSubmit={handleVerify}
//       buttonLabel='Verify'
//       linkHref='/login/user'
//       />
//     </div>
//   );
// };

// export default VerifyPage;

'use client';

import React, { useEffect, useState } from 'react';
import VerifyForm from '@/components/auth/verifyAccountForm';
import { VerifyEmail } from '@/lib/account';
import { useParams, useRouter } from 'next/navigation';
import * as yup from 'yup';

const VerifyPage = () => {
  const params = useParams();
  const router = useRouter();
  const [verificationError, setVerificationError] = useState('')

  const handleVerify = async (values: any, actions: any) => {
    try {
      const token = params.token.toString();
      const response = await VerifyEmail(values, token, 'users');
      if (response.status === 'ok') {
      alert('Verification successful!');
      router.push('/login/user');
      } else if (response.message === 'Email already verified') {
        setVerificationError('Email already verified');
      }

    } catch (error: any) {
      console.error(' failed:', error);
      if (error) {
        setVerificationError('Email verification link expired.');
      } else {
        setVerificationError('Verification failed: ' + error.message);
      }
    }
    actions.resetForm();
  };

  return (
    <div>
      {verificationError && (
        <div className="p-52">
          <h2>Email verification link expired</h2>
          <p>Please request a new verification link.</p>
        </div>
      )}
      {!verificationError && (
        <VerifyForm
          title="Verify your Account"
          subtitle="Enter password and verify your account"
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
          linkHref="/login/user"
        />
      )}
    </div>
  );
};

export default VerifyPage;
