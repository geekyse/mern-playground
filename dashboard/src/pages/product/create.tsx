import React, { useState } from 'react';
import Validation from '../../components/forms/validation';
import { axiosInstance, getConfig } from '../../util/axios';
import { useRouter } from 'next/router';
import Alert from '../../components/alerts';
import Section from '../../components/dashboard/section';
import Link from 'next/link';
import Datatable from '../../components/datatable';

const CreateProduct = (props) => {
  let result = props;

  const columns = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Brand', accessor: 'brand' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Price', accessor: 'price.sellPrice' },
      { Header: 'Cost', accessor: 'price.costPrice' },
    ],
    [],
  );
  const data = React.useMemo(() => result.data, [result.data]);

  const [error, setError] = useState(null);
  const router = useRouter();
  const axiosConfig = getConfig(router);

  let onSubmit = async (values) => {
    axiosInstance.post(`/system/product`, values, axiosConfig)
      .then(() => router.push(`/product/create`))
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  let items = [
    {
      label: 'Title',
      error: {
        required: 'Please enter a valid Title',
        minLength: { value: 3, message: 'Your Title should have at least 4 characters' },
        maxLength: { value: 300, message: 'Your Title should have no more than 8 characters' },
      },
      name: 'title',
      type: 'text',
    },
    {
      label: 'Description',
      error: { required: 'Please enter a valid first Description'},
      name: 'description',
      type: 'textarea',
    },
    {
      label: 'Vendor',
      error: {
        required: 'Please enter a valid last Vendor',
        maxLength: { value: 20, message: 'Your last Vendor should have no more than 8 characters' },
      },
      name: 'vendor',
      type: 'text',
    },
    {
      label: 'Brand',
      error: { required: 'Please enter a valid Brand' },
      name: 'brand',
      type: 'text',
    },
    {
      label: 'category',
      error: { required: 'Please enter a valid brand' },
      name: 'category',
      type: 'text',
    },
    {
      label: 'type',
      error: { required: 'Please enter a valid type' },
      name: 'type',
      type: 'text',
    },

    {
      label: 'price.sellPrice',
      error: { required: 'Please enter a valid brsellPriceand' },
      name: 'price.sellPrice',
      type: 'text',
    },
    {
      label: 'costPrice',
      name: 'price.costPrice',
      type: 'text',
    },
    {
      label: 'swatch.colors',
      name: 'swatch.colors',
      type: 'text',
    },
    {
      label: 'swatch.sizes',
      name: 'swatch.sizes',
      type: 'text',
    },
    {
      label: 'swatch.styles',
      name: 'swatch.styles',
      type: 'text',
    },

  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

      <div className='w-full lg:w-1/2'>
        <Section title={''} description={<span>Products</span>}>
          {error && (
            <div className='w-full mb-4'>
              <Alert
                color='bg-transparent border-red-500 text-red-500'
                borderLeft
                raised>
                {error}
              </Alert>
            </div>
          )}
          <Validation items={items} onSubmit={onSubmit} alerts={onSubmit} />
        </Section>
      </div>

      <div className='w-full lg:w-1/2'>
        <Section title={''} description={<span>Products</span>}>
          <button
            style={{float: 'right'}}
            className='btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded'
          ><Link href={'/product/create'}>Create Product</Link></button>
          <Datatable columns={columns} data={data} />
          <form method="POST" action="/upload-multiple-images" encType="multipart/form-data">
            <div>
              <label>Select multiple images:</label>
              <input type="file" name="multiple_images" multiple />
            </div>
            <div>
              <input type="submit" name="btn_upload_multiple_images" value="Upload" />
            </div>
          </form>
        </Section>
      </div>
      </div>
    </>
  );
};

export default CreateProduct;

CreateProduct.getInitialProps = async function(router) {
  const axiosConfig = getConfig(router);
  let response = await axiosInstance.get('/system/product', axiosConfig);
  return response.data;
};
