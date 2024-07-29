import React from 'react'
import Login from '../components/auth/Login'

export default function LoginPage() {
  return (
    <div>
        <div className='w-3/6 px-10 py-10 mx-auto my-10 shadow-md rounded-md border'>
              <div className='mb-10'>
                   <h1 className='font-bold text-2xl'>Login</h1>
                   <p>please login to your account!</p>
              </div>

              <Login/>
          </div>

    </div>
  )
}
