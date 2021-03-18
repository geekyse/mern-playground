import Widget1 from '../components/dashboard/widget-1'
import SectionTitle from '../components/dashboard/section-title'
import {FiActivity, FiUsers, FiExternalLink, FiClock} from 'react-icons/fi'
import React from "react";
import Datatable from "../components/datatable";
import {axiosInstance, getConfig} from "../util/axios";
import Section from "../components/dashboard/section";
import { withAdminAuthSync } from '../util/auth';

const Index = (props) => {
    let result = props
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Username',
                accessor: 'userName'
            },
            {
                Header: 'First Name',
                accessor: 'firstName'
            },
            {
                Header: 'Last Name',
                accessor: 'lastName'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },

        ],
        []
    )
    const data = React.useMemo(() => result.data, [])

    // @ts-ignore
  return (
    <>

        <SectionTitle title="Overview" subtitle="Dashboard"/>
        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            {/*widget*/}
            <div className="w-full lg:w-1/4">
                <Widget1
                    title="Users"
                    description={588}
                    right={<FiUsers size={24} className="stroke-current text-gray-500"/>}
                />
            </div>
            {/*widget*/}
            <div className="w-full lg:w-1/4">
                <Widget1
                    title="Sessions"
                    description={( 435)}
                    right={<FiActivity size={24} className="stroke-current text-gray-500"/>}
                />
            </div>
            {/*widget*/}
            <div className="w-full lg:w-1/4">
                <Widget1
                    title="Bounce rate"
                    description="40.5%"
                    right={<FiExternalLink size={24} className="stroke-current text-gray-500" />}
                />
            </div>
            {/*widget*/}
            <div className="w-full lg:w-1/4">
                <Widget1
                    title="Session duration"
                    description="1m 24s"
                    right={<FiClock size={24} className="stroke-current text-gray-500"/>}
                />
            </div>
        </div>
        <div className="w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <Section description={<span>Users</span>}>
                <Datatable columns={columns} data={data}/>
            </Section>
        </div>
    </>
    )
}

Index.getInitialProps = async function (router) {
    const axiosConfig = getConfig(router);
    let response = await axiosInstance.get('/system/user', axiosConfig)
    return response.data
};

export default withAdminAuthSync(Index);
