import React from 'react';
import { axiosInstance, getConfig } from '../util/axios';
import Profile from './user/profile';
import { withAdminAuthSync } from '../util/auth';

function MyProfile(props) {
  let { user } = props;
  return (
    <div className={'col-12'}>
      <Profile user={user} />
    </div>
  );
}

MyProfile.getInitialProps = async function(router: any) {
  let response = await axiosInstance.get(`/system/user/profile`, getConfig(router));
  return { user: response.data };
};

export default withAdminAuthSync(MyProfile);
