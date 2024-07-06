import React from 'react'
import ErrorImg from '../../Static/Images/error.gif'

const ErrorPage = () => {
  return (
    <div>
        <img src={ErrorImg} alt='404 Error' className='w-50'></img>
    </div>
  )
}

export default ErrorPage