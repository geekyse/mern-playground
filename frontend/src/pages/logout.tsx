import {useRouter} from "next/router";
import {useEffect} from "react";
import {logout} from "../util/auth";


const Logout = () => {

    logout();
    const router = useRouter();
    useEffect(() => {
        router.push('/login');
    }, [])


    return null;
}
export default Logout;
