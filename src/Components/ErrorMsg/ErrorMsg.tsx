import React from 'react';
import notFoundImg from '../../images/404.png';
import './ErrorMsg.css';

interface ErrorMsgProps {
  message: string
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({message}) => {

  const renderMsg = () => {
    if (message.includes("404")) {
      return (
        <main className='dashboard'>
          <img alt="404 not found error message" src={notFoundImg} />
        </main>
      )
    } else {
      return <h1 className='error-msg'>{message}</h1>
    }
  }

  return (
    <div className='error-page'> 
      {message && renderMsg()}
    </div>
  )
}

export default ErrorMsg

