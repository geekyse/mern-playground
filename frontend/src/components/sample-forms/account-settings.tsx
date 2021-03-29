import React, { useState } from 'react';
import Validation from '../forms/validation';
import Alert from '../alerts';
import { axiosInstance, getConfig } from '../../util/axios';
import { useRouter } from 'next/router';

export default function AccountSettings(props) {
  let { user } = props;
  const [error, setError] = useState('');
  const router = useRouter();
  const axiosConfig = getConfig(router);
  const onSubmit = async (values) => {
    await axiosInstance.put(`/system/user/${user._id}`, values, axiosConfig)
      .then(() => {
        setError('Data Updates Successfully');
        router.push(`/profile/`);
      }).catch(error => {
        setError(error.response.data.message);
      });
  };

  let items = [
    {
      label: 'User name (no\'t updateable)',
      name: 'userName',
      type: 'text',
      defaultValue:user.userName,

    },
    {
      label: 'Bio',
      name: 'bio',
      type: 'text',
      defaultValue:user.bio,
    },
    {
      label: 'First name',
      name: 'firstName',
      type: 'text',
      defaultValue:user.firstName,
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      defaultValue:user.lastName,
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
      defaultValue:user.address,
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      defaultValue:user.city,
    },
    {
      label: 'Country',
      name: 'country',
      type: 'text',
      defaultValue:user.country,
    },
    {
      label: 'Education',
      name: 'education',
      type: 'text',
      defaultValue:user.education,
    },
    {
      label: 'Work',
      name: 'work',
      type: 'text',
      defaultValue:user.work,
    },
    {
      label: 'About',
      name: 'about',
      type: 'text',
      defaultValue:user.about,
    },

  ];
  return (
    <>
      <div className="flex flex-col">

        {error && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {error}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} alerts={error} />
      </div>
    </>
  );
}

