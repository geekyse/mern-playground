import React from 'react';
import {useFormik} from 'formik';
import {axiosInstance} from '../util/axios';
import {useRouter} from 'next/router';
import * as Yup from "yup";

export default function Login(props) {
    const router = useRouter();

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            axiosInstance.post(`/user/login/`, values).then(response => {
                router.push(`/`);
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
                <div className='custom-control custom-checkbox'>
                    <input type='checkbox' className='custom-control-input' id='customCheck1'/>
                    <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
                </div>
                <button type='submit' className='btn btn-primary btn-block'>
                    Sign in
                </button>
            </div>
        </div>

    </form>;
}
