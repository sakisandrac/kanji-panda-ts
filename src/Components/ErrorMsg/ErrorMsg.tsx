import React from 'react';
import notFoundImg from '../../images/404.png';

interface ErrorMsgProps {
  message: string
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({message}) => {

  const renderMsg = () => {
    if (message.includes("404")) {
      return (
        <main className='dashboard'>
          <img src={notFoundImg} />
        </main>
      )
    } else {
      return <h1>{message}</h1>
    }
  }

  return (
    <div className='error-page'> 
      {message && renderMsg()}
    </div>
  )
}

export default ErrorMsg

