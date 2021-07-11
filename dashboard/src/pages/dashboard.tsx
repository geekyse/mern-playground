import Widget1 from '../components/dashboard/widget-1';
import { FiActivity, FiUsers, FiExternalLink, FiClock } from 'react-icons/fi';
import Datatable from '../components/datatable';
import { axiosInstance, getConfig } from '../util/axios';
import Section from '../components/dashboard/section';
import { withAdminAuthSync } from '../util/auth';
import React from 'react';
import Link from 'next/link';

const Index = (props) => {
  let result = props;

  const productColumns = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Brand', accessor: 'brand' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Price', accessor: 'price.sellPrice' },
      { Header: 'Cost', accessor: 'price.costPrice' },
    ],
    [result.products],
  );

  const userColumns = React.useMemo(
    () => [
      { Header: 'Username', accessor: 'userName' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Role', accessor: 'role' },
    ],
    [result.users],
  );

  const products = React.useMemo(() => result.products.data, [result.products]);
  const users = React.useMemo(() => result.users.data, [result.users]);

  return (
    <>
      <div className='flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4'>
        {/*widget*/}
        <div className='w-full lg:w-1/4'>
          <Widget1
            title='Users'
            description={588}
            right={<FiUsers size={24} className='stroke-current text-gray-500' />}
          />
        </div>
        {/*widget*/}
        <div className='w-full lg:w-1/4'>
          <Widget1
            title='Sessions'
            description={(435)}
            right={<FiActivity size={24} className='stroke-current text-gray-500' />}
          />
        </div>
        {/*widget*/}
        <div className='w-full lg:w-1/4'>
          <Widget1
            title='Bounce rate'
            description='40.5%'
            right={<FiExternalLink size={24} className='stroke-current text-gray-500' />}
          />
        </div>
        {/*widget*/}
        <div className='w-full lg:w-1/4'>
          <Widget1
            title='Session duration'
            description='1m 24s'
            right={<FiClock size={24} className='stroke-current text-gray-500' />}
          />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4'>

        <div className=' lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 lg:w-1/2'>

          <Section title={''} description={<span>Products</span>}>
            <button
              style={{ float: 'right' }}
              className='btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded'
            ><Link href={'/product/create'}>Create Product</Link></button>
            <Datatable columns={productColumns} data={products} />
          </Section>

        </div>

        <div className='lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 lg:w-1/2'>

          <Section title={''} description={<span>Users</span>}>
            <button
              style={{ float: 'right' }}
              className='btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded'
            ><Link href={'/user/create'}>Create User</Link></button>
            <Datatable columns={userColumns} data={users} />
          </Section>
        </div>

      </div>
    </>
  );
};

Index.getInitialProps = async function(router) {
  const axiosConfig = getConfig(router);
  let products = await axiosInstance.get('/system/product', axiosConfig);
  console.log(products.data,"---------")
  let users = await axiosInstance.get('/system/user', axiosConfig);
  return { products: products.data, users: users.data };
};

export default withAdminAuthSync(Index);
