import React from 'react';
import {useFormik} from 'formik';
import {axiosInstance} from '../util/axios';
import {useRouter} from 'next/router';
import * as Yup from 'yup';

export default function Create(props) {
    const router = useRouter();

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            axiosInstance.post('/user/', values).then(response => {
                router.push(`/view/${response.data.id}`);
            }).catch(e => {
                const errors = e.response.data.errors ?? [];
                errors.forEach(field => {
                    formik.setFieldError(field.param, field.msg);

                });
            });
        }
    });


    return <form onSubmit={formik.handleSubmit}>
        <div className='form-group row'>
            <label className={'col-3'}>Username</label>
            <div className={'col-9'}>
                <input type='username'
                       className='form-control' placeholder='Username'
                       name='username'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.username}
                />
                {formik.errors.username && formik.touched.username &&
                <div className={'error'}>{formik.errors.username}</div>}
            </div>
        </div>

        <div className='form-group row'>
            <label className={'col-3'}>First name</label>
            <div className={'col-9'}>
                <input type='firstName'
                       className='form-control'
                       placeholder='firstName'
                       name='firstName'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.firstName}
                />
                {formik.errors.firstName && formik.touched.firstName &&
                <div className={'error'}>{formik.errors.firstName}</div>}
            </div>
        </div>

        <div className='form-group row'>
            <label className={'col-3'}>Last name</label>
            <div className={'col-9'}>
                <input
                    type='lastName'
                    className='form-control'
                    placeholder='Last Name'
                    name='lastName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.errors.lastName && formik.touched.lastName &&
                <div className={'error'}>{formik.errors.lastName}</div>}
            </div>
        </div>

        <div className='form-group row'>
            <label className={'col-3'}>Email</label>
            <div className={'col-9'}>
                <input type='email'
                       className='form-control'
                       placeholder='Email'
                       name='email'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && <div className={'error'}>{formik.errors.email}</div>}
            </div>
        </div>

        <div className='form-group row'>
            <label className={'col-3'}>Password</label>
            <div className={'col-9'}>
                <input type='password'
                       className='form-control'
                       placeholder='password'
                       name='password'
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password &&
                <div className={'error'}>{formik.errors.password}</div>}
            </div>
        </div>
        <div className='form-group row'>
            <label className={'col-3'}>&nbsp;</label>
            <div className={'col-9'}>
                <button type='submit' className='btn btn-primary btn-block'>
                    Create
                </button>
            </div>
        </div>
    </form>;

}