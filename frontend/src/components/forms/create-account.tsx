import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'
import {axiosInstance, getConfig} from "../../util/axios";
import {useRouter} from "next/router";

const CreateAccount = ({message = null}, props: any) => {
    const [data] = useState(null)
    const router = useRouter();

    let onSubmit = async (values) => {

        await axiosInstance.post('/user', values)
            .then(function (response) {
                router.push(`/login`);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    let items = [
        {
            label: 'User Name',
            error: {required: 'Please enter a valid username'},
            name: 'userName',
            type: 'text',
            placeholder: 'Enter you username'
        },
        {
            label: 'First Name',
            error: {required: 'Please enter a valid first name'},
            name: 'firstName',
            type: 'text',
            placeholder: 'Enter you first name'
        },
        {
            label: 'Last Name',
            error: {required: 'Please enter a valid last name'},
            name: 'lastName',
            type: 'text',
            placeholder: 'Enter you last name'
        },
        {
            label: 'Email',
            error: {required: 'Please enter a valid email'},
            name: 'email',
            type: 'email',
            placeholder: 'Enter you email'
        },
        {
            label: 'Password',
            error: {
                required: 'Password is required',
                minLength: {
                    value: 8,
                    message: 'Your password should have at least 4 characters'
                },
                maxLength: {
                    value: 50,
                    message: 'Your password should have no more than 8 characters'
                }
            },
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password'
        },
    ]
    return (
        <>
            <div className="flex flex-col">
                {data && message && (
                    <div className="w-full mb-4">
                        <Alert
                            color="bg-transparent border-green-500 text-green-500"
                            borderLeft
                            raised>
                            {message}
                        </Alert>
                    </div>
                )}
                <Validation items={items} onSubmit={onSubmit} alerts={onSubmit}/>
            </div>
        </>
    )
}

export default CreateAccount
