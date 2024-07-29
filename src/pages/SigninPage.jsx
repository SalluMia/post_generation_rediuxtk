import React from 'react'
import Signin from '../components/auth/Signin'

export default function SigninPage() {
  return (
    <div>
          <div className='w-3/6 px-10 py-10 mx-auto my-10 shadow-md rounded-md border'>
              <div className='mb-10'>
                   <h1 className='font-bold text-2xl'>Signup</h1>
                   <p>please sign up your account!</p>
              </div>

              <Signin/>
          </div>

    </div>
  )
}
