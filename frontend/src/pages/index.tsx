import Head from 'next/head';
import Link from 'next/link';
import Layout from '../layouts';
import {axiosInstance, getConfig} from '../util/axios';
import Pagination from '../components/pagination';
import React from "react";

export default function Home(props) {
    let {result} = props;
    return <Layout>
        <Head>
            <title>List User</title>
        </Head>
        <div className={'col-12'}>
            <Link href={'/create'}>
                <a className={'btn btn-primary'}>Create</a>
            </Link>
            <br/>
            <br/>
            <table className={'table table-bordered'}>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>FullName</th>
                    <th>View</th>
                    <th>Update</th>
                </tr>
                {(result.total == 0) && <tr>
                    <td colSpan={10}>No records found.</td>
                </tr>}

                {result.total > 0 && result.data.map(user => {
                    return <tr key={user.email}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName + ' ' + user.lastName}</td>
                        <td>
                            <Link href={`/view/${user.id}`}>
                                <a className={'btn btn-sm btn-primary'}>
                                    View
                                </a>
                            </Link>
                        </td>
                        <td>
                            <Link href={`/update/${user.id}`}>
                                <a className={'btn btn-sm btn-primary'}>
                                    Update
                                </a>
                            </Link>
                        </td>
                    </tr>;
                })}
            </table>
        </div>
        {result.data && <div className={'col-md-12'}>
            <Pagination currentPage={result.page} pageSize={10} total={result.total}
                        baseUrl={'/'}/>

        </div>
        }
    </Layout>;
}

Home.getInitialProps = async function (router) {

    const axiosConfig = getConfig(router);
    const {id, token} = router.query;

    let response = await axiosInstance.get(`/user`, axiosConfig);

    return {result: response.data};
};
