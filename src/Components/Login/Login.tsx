import React, { useEffect, useState } from 'react';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { postUser } from '../../apiCalls';
import panda from '../../images/panda-happy.png';

interface LoginProps {
    logIn: (userID: string) => void
}

const Login = ({ logIn }: LoginProps) => {
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        return () => setError(null)
    })

    const openModal = () => {
        const modal: HTMLDialogElement = document.querySelector('#aboutModal') as HTMLDialogElement
        modal.showModal()
      }
    
      const closeModal = () => {
        const modal: HTMLDialogElement = document.querySelector('#aboutModal') as HTMLDialogElement
        modal.close()
      }    

    return (
        <div className='login-page'>
            <div className='login-container'>
                <img src={panda} alt="panda logo"></img>
                <div className='demo-container'>
                    <h1>Welcome to Kanji Panda!</h1>
                    <button className="save-btn login-button" onClick={() => logIn("115072d9-2694-42c5-9f9d-b9960237536b")}>TRY THE APP DEMO</button>
                    <div>
                        <p className='login-header'>OR Login To Continue</p>
                        <GoogleLogin
                            shape='pill'
                            size='large'
                            onSuccess={async credentialResponse => {
                                const decodedJwt: { name: string, email: string, sub: string } = jwtDecode(credentialResponse.credential!);

                                try {
                                    const postUserInfo = await postUser(decodedJwt.name, decodedJwt.sub, decodedJwt.email)
                                    logIn(postUserInfo.data.user_id)
                                } catch (error) {
                                    console.log('failed')
                                    setError(new Error('Login Failed.'))
                                }
                            }}
                            onError={() => {
                                setError(new Error('Login Failed.'))
                            }}
                        />
                        {error && <p>Login Failed. Please try again with different credentials.</p>}
                    </div>
                </div>
            </div>
            <button className='save-btn about-btn' onClick={openModal}>About Kanji Panda</button>
            <dialog id="aboutModal">
          <div className='modal-container'>
            <p className='chart-header'>About This Application</p>
            <p className='info-text'>
              Kanji Panda is the ultimate study companion for Japanese learners. Designed with a focus on enhancing your Japanese learning journey, Kanji Panda empowers users to delve into the fascinating world of kanji characters effortlessly.
              <br /><br />
              Whether you're a beginner or an advanced learner, this app offers a seamless experience to explore, study, and master kanji. With the ability to load random kanji or conduct targeted searches, you can effortlessly build a personalized kanji collection, saving them for future reference. As you progress, mark off each kanji you've studied, and easily track your learning achievements. The app also provides valuable insights, showcasing the number of kanji you've mastered, as well as those that still await your exploration. 
              <br/><br/>
              To further solidify your knowledge, an interactive quiz feature challenges you to test your understanding of the saved kanji. Embrace the Kanji Panda experience today and happy learning! 🐼</p>
            <p className='info-text'>Created by <a href="https://www.linkedin.com/in/saki-c-a7306b259/"><span className='linked'>Saki C</span></a></p>
              <button className='save-btn' onClick={closeModal}>Close</button>
          </div>
        </dialog>
        </div>
    )
}

export default Login