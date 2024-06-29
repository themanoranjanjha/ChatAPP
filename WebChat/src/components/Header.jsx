import React from 'react'
import { LogOut} from 'react-feather'
import { userAuth } from '../utils/AuthContext'

const Header = () => {
    const {user, handleUserLogout} = userAuth()
  return (
    <div id="header--wrapper">
       {user ? (
        <>
          welcome {user.name}
          <LogOut onClick={handleUserLogout} className="header--link"/>
        </>
       )
       : (
           <button>Login</button>
       )}
    </div>
  )
}

export default Header