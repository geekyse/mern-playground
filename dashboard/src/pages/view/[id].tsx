import Head from 'next/head';
import Layout from '../../components/layout';
import {axiosInstance, getConfig} from '../../util/axios';
import Link from 'next/link';

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
            <table className={'table table-bordered'}>
                <tr>
                    <th>
                        <Link href={`/update/${user.id}`}>
                            <a className={'btn  btn-sm btn-primary'}>
                                Update
                            </a>
                        </Link>
                    </th>
                    <th>Delete</th>
                </tr>
                <tr>
                    <th>Username</th>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <th>firstName</th>
                    <td>{user.firstName}</td>
                </tr>
                <tr>
                    <th>lastName</th>
                    <td>{user.lastName}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                </tr>
            </table>
        </div>
    </Layout>;
}

Home.getInitialProps = async function (router) {

    const axiosConfig = getConfig(router);
    const {id} = router.query;

    let response = await axiosInstance.get(`/user/${id}`, axiosConfig);

    return {user: response.data};
};
