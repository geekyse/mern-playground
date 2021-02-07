import Head from 'next/head';
import Layout from '../../components/layout';
import {axiosInstance, getConfig} from '../../util/axios';
import Update from '../../components/update';

export default function Home(props) {
    let {user} = props;

    if (!user.id) {
        return <Layout>
            <div><h1>User Not Found</h1></div>
        </Layout>;
    }

    return <Layout>
        <Head>
            <title>View User {user.id}</title>
        </Head>
        <div className={'col-12'}>
            <div className='card'>
                <div className='card-header'>
                    Update User <strong>{user.username}</strong>
                </div>
                <div className='card-body'>
                    <Update user={user}/>
                </div>
            </div>
        </div>
    </Layout>;
}

Home.getInitialProps = async function (router) {

    const axiosConfig = getConfig(router);
    const {id} = router.query;

    let response = await axiosInstance.get(`/user/${id}`, axiosConfig);

    return {user: response.data};
};
