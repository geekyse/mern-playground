import Head from 'next/head';
import Layout from '../layouts';
import {axiosInstance, getConfig} from '../util/axios';
import Login from '../components/login';

export default function Home(props) {
    let {result} = props;
    return <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <div className={'col-12'}>
            <div className='card'>
                <div className='card-header'>
                    Login
                </div>
                <div className='card-body'>
                    <Login/>
                </div>
            </div>
        </div>
    </Layout>;
}

Home.getInitialProps = async function (router) {

    const axiosConfig = getConfig(router);
    const {id, token} = router.query;

    let response = await axiosInstance.get(`/user`, axiosConfig);

    return {result: response.data};
};
