import React, { useState } from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import { postUser } from '../../apiCalls';

interface LoginProps {
    logIn: (userID: string) => void
}
const Login = ({ logIn }: LoginProps) => {
    const [error, setError] = useState(Error || null)

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='demo-container'>
                    <h1 className='login-header'>Try the app demo</h1>
                    <button onClick={() => logIn("115072d9-2694-42c5-9f9d-b9960237536b")}></button>

                </div>
                <div>
                    <p className='login-header'>Login To Continue</p>
                    <GoogleLogin
                        shape='pill'
                        size='large'
                        onSuccess={async credentialResponse => {
                            console.log(credentialResponse)
                            // const decodedJwt: { name: string, email: string, sub: string } = jwtDecode(credentialResponse.credential!)

                            // const postUserInfo = await postUser(decodedJwt.name, decodedJwt.sub, decodedJwt.email)

                            // try {
                            //     const res = await postUserInfo()
                            //     logIn(res.id)
                            //     console.log(res)
                            // } catch (error) {
                            //     setError(new Error('Login Failed. Please try again with different credentials.'))
                            // }
                        }}
                        onError={() => {
                            setError(new Error('Login Failed. Please try again with different credentials.'))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login