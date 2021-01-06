import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { googleLogin } from '../../actions/auth';

const Landing = ({ isAuthenticated, googleLogin }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    const responseSuccessGoogle = (response) => {
        console.log(response);
        axios.post('http://localhost:5000/api/googlelogin', { tokenId: response.tokenId })
            .then(res => {
                if (res && res.data) {
                    googleLogin(res.data);
                }
            })
    }

    const responseErrorGoogle = (response) => {
        console.log(response)
    }

    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>User Authentication</h1>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link to='/login' className='btn btn-light'>
                            Login
                        </Link>
                        <GoogleLogin
                            clientId="897928278253-3db9esu93orctgnevm00op1o4ae5q4cc.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            isSignedIn={true}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { googleLogin })(Landing);