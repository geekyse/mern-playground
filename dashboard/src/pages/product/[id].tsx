import React, { useState } from 'react';
import Validation from '../../components/forms/validation';
import { axiosInstance, getConfig } from '../../util/axios';
import { useRouter } from 'next/router';
import Alert from '../../components/alerts';

const CreateProduct = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const axiosConfig = getConfig(router);

  let onSubmit = async (values) => {
    axiosInstance.get(`/system/product/${productId}`, axiosConfig)
      .then(() => router.push(`/product/${productId}`))
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  let items = [
    {
      label: 'Title',
      error: {
        required: 'Please enter a valid username',
        minLength: { value: 3, message: 'Your title should have at least 4 characters', },
        maxLength: { value: 300, message: 'Your title should have no more than 8 characters', },
      },
      name: 'title',
      type: 'text',
      placeholder: 'Enter you username',
    },
    {
      label: 'Description',
      error: {
        required: 'Please enter a valid first name' ,
      },
      name: 'description',
      type: 'text',
      placeholder: 'Enter you first name',
    },
    {
      label: 'Vendor',
      error: {
        required: 'Please enter a valid last name' ,
        minLength: { value: 3, message: 'Your last name should have at least 4 characters', },
        maxLength: { value: 20, message: 'Your last name should have no more than 8 characters', },
      },
      name: 'vendor',
      type: 'text',
      placeholder: 'Enter you last name',
    },
    {
      label: 'brand',
      error: { required: 'Please enter a valid brand' },
      name: 'brand',
      type: 'text',
      placeholder: 'Enter you brand',
    },
    {
      label: 'category',
      error: { required: 'Please enter a valid brand' },
      name: 'category',
      type: 'text',
      placeholder: 'Enter you brand',
    },
    {
      label: 'type',
      error: { required: 'Please enter a valid type' },
      name: 'type',
      type: 'text',
      placeholder: 'Enter you type',
    },

    {
      label: 'price.sellPrice',
      error: { required: 'Please enter a valid brsellPriceand' },
      name: 'price.sellPrice',
      type: 'text',
      placeholder: 'Enter you sellPrice',
    },
    {
      label: 'costPrice',
      name: 'price.costPrice',
      type: 'text',
      placeholder: 'Enter you costPrsssssice',
    },
    {
      label: 'swatch.colors',
      name: 'swatch.colors',
      type: 'text',
      placeholder: 'Enter you costPrsssssice',
    },
    {
      label: 'swatch.sizes',
      name: 'swatch.sizes',
      type: 'text',
      placeholder: 'Enter you swatch.sizes',
    },
    {
      label: 'swatch.styles',
      name: 'swatch.styles',
      type: 'text',
      placeholder: 'Enter you costPrsssssice',
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
        <Validation items={items} onSubmit={onSubmit} alerts={onSubmit} />
      </div>
    </>
  );
};

export default CreateProduct;
