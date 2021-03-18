import React, { useState } from 'react';
import Validation from '../forms/validation';
import Alert from '../alerts';
import { useRouter } from 'next/router';
import { loginAdmin } from '../../util/auth';
import { axiosInstance, getConfig } from '../../util/axios';

const Login = ({ message = '' }) => {

  const [error, setError] = useState(null);

  const router = useRouter();
  const axiosConfig = getConfig(router);

  const onSubmit = async (values) => {
    axiosInstance.post(`/system/user/login`, values, axiosConfig)
      .then(response => {
        loginAdmin(response.data.token);
        router.push(`/`);
      }).catch(error => {
        setError(error.response.data.message);
      },
    );
  };

  let items = [
    {
      label: 'Email',
      error: { required: 'Please enter a valid email' },
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email',
    },
    {
      label: 'Password',
      error: {
        required: 'Password is required',
        minLength: {
          value: 4,
          message: 'Your password should have at least 4 characters',
        },
        maxLength: {
          value: 50,
          message: 'Your password should have no more than 8 characters',
        },
      },
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ];
  return (
    <>

    <div className="flex flex-col">
      {error && (
        <div className="w-full mb-4">
          <Alert
            color="bg-transparent border-red-500 text-red-500"
            borderLeft
            raised>
            {error}
          </Alert>
        </div>
      )}
      <Validation items={items} onSubmit={onSubmit} />
    </div>
    </>

  );
};

export default Login;

