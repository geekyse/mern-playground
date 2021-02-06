import Head from 'next/head';
import Layout from '../layouts';
import Create from '../components/create';

export default function Home(props) {
    return <Layout>
        <Head>
            <title>Create User</title>
        </Head>
        <div className={'col-12'}>
            <div className='card'>
                <div className='card-header'>
                    Create User
                </div>
                <div className='card-body'>
                    <Create/>
                </div>
            </div>
        </div>
    </Layout>;
}

