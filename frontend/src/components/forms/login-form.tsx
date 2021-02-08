import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'
import {axiosInstance} from "../../util/axios";
import {useRouter} from "next/router";
import {login} from "../../util/cookies";

const Login = ({message = ''}) => {
    const [data, setData] = useState('');

    const [errorSummary, setErrorSummary] = useState('');

    const router = useRouter();

    const onSubmit = async (values) => {
        await axiosInstance.post(`/user/login`, values
        ).then(response => {
            setData(response.data)
            login(response.data.token);
            router.push(`/`);
        }).catch(error =>{
            setErrorSummary(error.message)
            }
        )
    };

    let items = [
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
                    value: 4,
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
                { errorSummary && message && (
                    <div className="w-full mb-4">
                        <Alert
                            color="bg-transparent border-red-500 text-red-500"
                            borderLeft
                            raised>
                            {message}
                        </Alert>
                    </div>
                )}
                <Validation items={items} onSubmit={onSubmit}/>
            </div>
        </>
    )
}

export default Login
