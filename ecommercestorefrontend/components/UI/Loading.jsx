import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-12 h-12 animate-spin'>
            <img src="logo.png" alt="" />
        </div>
    </div>
  )
}

export default LoadingPage