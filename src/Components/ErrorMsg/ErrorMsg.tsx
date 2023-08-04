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
      return <p className='error-msg'>{message}</p>
    }
  }

  return (
    <div className='error-page'> 
      {message && renderMsg()}
    </div>
  )
}

export default ErrorMsg

