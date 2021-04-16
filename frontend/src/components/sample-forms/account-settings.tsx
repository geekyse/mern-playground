import React, { Component } from 'react';
import Validation from '../forms/validation';
import Alert from '../alerts';
import { axiosInstance, getConfig } from '../../util/axios';
import router from 'next/router';

// Class component example
export default class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.handleAccountSettings = this.handleAccountSettings.bind(this);
  }

  items = [
    {
      label: 'User name',
      name: 'userName',
      type: 'text',
      defaultValue: this.props['user'].userName,
    },
    {
      label: 'Bio',
      name: 'bio',
      type: 'text',
      defaultValue: this.props['user'].bio,
    },
    {
      label: 'First name',
      name: 'firstName',
      type: 'text',
      defaultValue: this.props['user'].firstName,
    },
    {
      label: 'Last name',
      name: 'lastName',
      type: 'text',
      defaultValue: this.props['user'].lastName,
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
      defaultValue: this.props['user'].address,
    },
    {
      label: 'City',
      name: 'city',
      type: 'text',
      defaultValue: this.props['user'].city,
    },
    {
      label: 'Country',
      name: 'country',
      type: 'text',
      defaultValue: this.props['user'].country,
    },
    {
      label: 'Education',
      name: 'education',
      type: 'text',
      defaultValue: this.props['user'].education,
    },
    {
      label: 'Work',
      name: 'work',
      type: 'text',
      defaultValue: this.props['user'].work,
    },
    {
      label: 'About',
      name: 'about',
      type: 'text',
      defaultValue: this.props['user'].about,
    }];

  handleAccountSettings = (values) => {
    const axiosConfig = getConfig(router);
    axiosInstance.put(`/system/user/${this.props['user']._id}`, values, axiosConfig)
      .then(() => {
        router.push(`/profile/`);
      }).catch((err) => {
      console.log(err);
      this.setState({ error: 'Wrong email or password..!' });
    });
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
        <Validation items={this.items} onSubmit={this.handleAccountSettings} alerts={this.state['error']} />
      </div>
    );
  };
}
