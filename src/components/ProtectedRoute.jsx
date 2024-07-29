import React, { Children } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({children}) {
    const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated)
    console.log(isAuthenticated)

    const tokenExist=localStorage.getItem('token') !==null

    const isUserAuthenticated= isAuthenticated || tokenExist;
  return isUserAuthenticated? <>{children}</>: <Navigate to={'/login'}/>
}
