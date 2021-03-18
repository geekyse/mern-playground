import React from 'react'
import SectionTitle from '../components/section-title/index'
import Datatable from '../components/datatable'
import Widget from '../components/widget/index'
import {axiosInstance, getConfig} from "../util/axios";
import {withAuthSync} from "../util/auth";

const DataTables = (props) => {
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
    const data = React.useMemo(() => result.data, [result.data])
    return <Datatable columns={columns} data={data}/>
}

DataTables.getInitialProps = async function (router) {
    const axiosConfig = getConfig(router);
    let response = await axiosInstance.get('/user', axiosConfig)
    return response.data
};

export const Index = () => (
    <>
        <SectionTitle title="Tables" subtitle="Datatables"/>
        <Widget
            title="Datatable example"
            description={<span>Use the <code>&lt;Datatable /&gt;</code> component to create a datatable</span>}>
            <DataTables/>
        </Widget>
    </>
)

export default withAuthSync(DataTables)


