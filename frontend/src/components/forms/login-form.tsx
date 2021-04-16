import React, { Component } from 'react';
import Validation from '../forms/validation';
import Alert from '../alerts';
import { loginAdmin } from '../../util/auth';
import { axiosInstance, getConfig } from '../../util/axios';
import router from 'next/router';

// Class component example
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.handleLogin = this.handleLogin.bind(this);
  }

  items = [
    {
      label: 'Email',
      error: { required: 'Please enter a valid email' },
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email',
    },
    {
      label: 'Password',
      error: {
        required: 'Password is required',
        minLength: {
          value: 4,
          message: 'Your password should have at least 4 characters',
        },
        maxLength: {
          value: 50,
          message: 'Your password should have no more than 8 characters',
        },
      },
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ];

  handleLogin(values) {
    const axiosConfig = getConfig(router);
    axiosInstance.post(`/system/user/login`, values, axiosConfig)
      .then(response => {
        loginAdmin(response.data.token);
        router.push(`/dashboard`);
      })
      .catch(() => this.setState({ error: 'Wrong email or password..!' }));
  };

  render() {
    return (
      <div className='flex flex-col'>
        {this.state['error'] && (
          <div className='w-full mb-4'>
            <Alert color='bg-transparent border-red-500 text-red-500' borderLeft raised>
              {this.state['error']}
            </Alert>
          </div>
        )}
        <Validation items={this.items} onSubmit={this.handleLogin} alerts={this.state['error']} />
      </div>
    );
  };
}
