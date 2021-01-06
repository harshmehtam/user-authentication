import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
    history
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    console.log("user ===> ", user);
    return loading && profile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <h1 className='large text-primary'>Welcome to the DashBoard!</h1>
                <p className='lead'>
                    <i className='fas fa-user' /> Welcome {user && user.firstName}
                </p>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>{user?.email || ''}</td>
                            <td>{user?.firstName || ''}</td>
                            <td>{user?.lastName || ''}</td>
                            <td><Button onClick={() => {
                                history.push('/edit-user', { detail: user })
                            }} variant="primary">Edit</Button></td>
                            <td><Button variant="danger">Delete</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Fragment>
        );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default compose(
    withRouter, connect(
        mapStateToProps,
        { getCurrentProfile }
    ))(Dashboard);