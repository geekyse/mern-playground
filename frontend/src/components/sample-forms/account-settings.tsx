import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'
import {axiosInstance} from "../../util/axios";
import {useRouter} from "next/router";
import {parseCookies} from "nookies";
import Breadcrumb from "../breadcrumbs";

export default function AccountSettings(props,{message = null}) {
  const [data, setData] = useState(null)
  const {user} = props;

  const router = useRouter();

  const cookies = parseCookies(router);


  const onSubmit = async (values) => {
    await axiosInstance.put(`/user/${user.newUser.id}`, values).then(response => {
      router.push(`/user-profile/${user.newUser.id}`);
    })

  };

  let items = [
    {
      label: 'User name',
      error: {required: 'Please enter a valid first name'},
      name: 'userName',
      type: 'text',
      placeholder: user.newUser.userName
    },
    {
      label: 'First name',
      error: {required: 'Please enter a valid first name'},
      name: 'firstName',
      type: 'text',
      placeholder: user.newUser.firstName
    },
    {
      label: 'Last name',
      error: {required: 'Please enter a valid last name'},
      name: 'lastName',
      type: 'text',
      placeholder: user.newUser.lastName
    },
    {
      label: 'Bio',
      error: {required: 'Please enter a bio'},
      name: 'bio',
      type: 'text',
      placeholder: user.newUser.bio
    }

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
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

