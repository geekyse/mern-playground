import {useRouter} from "next/router";
import {useEffect} from "react";
import { logoutAdmin } from '../util/auth';

const Logout = () => {

  logoutAdmin();
  const router = useRouter();
  useEffect(() => {
    // const axiosConfig = getConfig(router);
    // axiosInstance.post(`/system/user/session`, axiosConfig)
    router.push('/login')
  })
  return null;
}
export default Logout;
