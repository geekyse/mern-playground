import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { logoutAdmin } from '../util/auth';
// import { axiosInstance, getConfig } from '../util/axios';


const Logout = async () => {
  const router = useRouter();
  //delete session from mongo
  // const axiosConfig = getConfig(router);
  // axiosInstance.post(`/system/user/session`, '', axiosConfig);

  logoutAdmin()

  useEffect(() => {router.push('/login')}, [router]);

  return null;
};
export default Logout;
