import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const UserEdit = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        props.createProfile({ id, firstName, lastName, email }, props.history, true);
    };

    useEffect(() => {
        const { _id, email, firstName, lastName } = props.location.state.detail;
        setId(_id);
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
    }, [])

    return <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
            <input
                type='text'
                placeholder='firstName'
                name='firstName'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
        </div>
        <div className='form-group'>
            <input
                type='text'
                placeholder='lastName'
                name='lastName'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
        </div>
        <div className='form-group'>
            <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <input type='submit' className='btn btn-primary' value='Update' />
    </form>
};

export default compose(
    withRouter, connect(
        null,
        { createProfile }
    ))(UserEdit);