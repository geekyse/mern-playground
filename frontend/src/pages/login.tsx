import {useSelector, shallowEqual} from 'react-redux'
import Link from 'next/link'
import Login from '../components/forms/login-form'
import SocialMedia from '../components/login-3/social-media'
import React from "react";
import Router from "next/router";
import axios from "axios";


const Index = () => {
    const {config} = useSelector(
        (state) => ({
            config: state.config
        }),
        shallowEqual
    )
    let {name} = {...config}
    return (
        <>
            <div className="w-full flex flex-row h-screen overflow-hidden">
                <div className="hidden lg:flex lg:flex-col w-1/2 items-center justify-center bg-gray-50 border-r border-gray-100">
                    <img
                        className="object-contain w-auto h-64 mb-8"
                        src="/images/illustration.svg"
                        alt="svg"
                    />
                </div>
                <div className="w-full lg:w-1/2 bg-white flex flex-col items-start justify-center p-4 lg:px-24">
                    <div className="flex flex-col w-full mb-4">
                        <div className="text-sm uppercase font-light text-gray-500">
                            Login
                        </div>
                        <div className="text-sm font-bold">
                            Please enter your username and password to login
                        </div>
                    </div>
                    <Login  />
                    <div className="mt-4 mb-2">
                        <SocialMedia />
                    </div>
                    <div className="flex flex-row w-full">
                        <span className="text-secondary mr-1">New user?</span>
                        <span>
              <Link href="/create-account">
                <a className="link">Create account here</a>
              </Link>
            </span>
                    </div>
                    <div className="w-full">
            <span>
              <Link href="/forgot-password">
                <a className="link">Forgot password?</a>
              </Link>
            </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Index
