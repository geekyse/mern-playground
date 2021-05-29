// import React, { useState } from 'react';
// import { axiosInstance, getConfig } from '../../util/axios';
// import { useRouter } from 'next/router';
// import Alert from 'src/components/alerts';
// import Validation from '../../components/forms/validation';
//
// export default function AccountSettings(props) {
//     let { user } = props;
//     const [error, setError] = useState('');
//     const router = useRouter();
//     const axiosConfig = getConfig(router);
//
//     const onSubmit = async (values) => {
//         await axiosInstance.put(`/system/user/${user._id}`, values, axiosConfig)
//           .then(() => {
//               setError('Data Updates Successfully');
//               router.push(`/profile/`);
//           }).catch(error => {
//               setError(error.response.data.message);
//           });
//     };
//
//     let items = [
//         {
//             label: 'User name (no\'t updateable)',
//             name: 'userName',
//             type: 'text',
//             placeholder: user.userName,
//
//         },
//         {
//             label: 'Bio',
//             name: 'bio',
//             type: 'text',
//             placeholder: user.bio,
//         },
//         {
//             label: 'First name',
//             name: 'firstName',
//             type: 'text',
//             placeholder: user.firstName,
//         },
//         {
//             label: 'Last name',
//             name: 'lastName',
//             type: 'text',
//             placeholder: user.lastName,
//         },
//         {
//             label: 'Address',
//             name: 'address',
//             type: 'text',
//             placeholder: user.address,
//         },
//         {
//             label: 'City',
//             name: 'city',
//             type: 'text',
//             placeholder: user.city,
//         },
//         {
//             label: 'Country',
//             name: 'country',
//             type: 'text',
//             placeholder: user.country,
//         },
//         {
//             label: 'Education',
//             name: 'education',
//             type: 'text',
//             placeholder: user.education,
//         },
//         {
//             label: 'Work',
//             name: 'work',
//             type: 'text',
//             placeholder: user.work,
//         },
//         {
//             label: 'About',
//             name: 'about',
//             type: 'text',
//             placeholder: user.about,
//         },
//
//     ];
//     return (
//       <>
//           <div className="flex flex-col">
//
//               {error && (
//                 <div className="w-full mb-4">
//                     <Alert
//                       color="bg-transparent border-green-500 text-green-500"
//                       borderLeft
//                       raised>
//                         {error}
//                     </Alert>
//                 </div>
//               )}
//               <Validation items={items} onSubmit={onSubmit} alerts={''} />
//           </div>
//       </>
//     );
// }
//
