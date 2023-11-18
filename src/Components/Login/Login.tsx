import React, { useEffect, useState } from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { postUser } from '../../apiCalls';

interface LoginProps {
    logIn: (userID: string) => void
}

const Login = ({ logIn }: LoginProps) => {
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {

        return () => setError(null)
    })

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className='demo-container'>
                    <h1 className='login-header'>Try the app demo</h1>
                    <button className="login-button" onClick={() => logIn("115072d9-2694-42c5-9f9d-b9960237536b")}>DEMO</button>
                </div>
                <div>
                    <p className='login-header'>Login To Continue</p>
                    <GoogleLogin
                        shape='pill'
                        size='large'
                        onSuccess={async credentialResponse => {
                            console.log(credentialResponse)
                            const decodedJwt: { name: string, email: string, sub: string } = jwtDecode(credentialResponse.credential!);

                            try {
                                console.log('here')
                                const postUserInfo = await postUser(decodedJwt.name, decodedJwt.sub, decodedJwt.email)
                                logIn(postUserInfo.data.user_id)
                                console.log('hello', postUserInfo)
                            } catch (error) {
                                console.log('failed')
                                setError(new Error('Login Failed. Please try again with different credentials.'))
                            }
                        }}
                        onError={() => {
                            setError(new Error('Login Failed. Please try again with different credentials.'))
                        }}
                    />
                    {error && <p>Login Failed. Please try again with different credentials.</p>}
                </div>
            </div>
        </div>
    )
}

export default Login