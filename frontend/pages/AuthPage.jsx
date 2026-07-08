import React from 'react'
import "../styles/auth.css"
import Login from '../components/Auth/Login.jsx'
import Overlay from '../components/Auth/Overlay.jsx'
import Register from '../components/Auth/Register.jsx'
import { useState } from 'react'
import Arrow from '../components/Landing/Arrow.jsx'
import { useNavigate } from 'react-router-dom'




const AuthPage = () => {
  const navigate = useNavigate();
  const [onLogin,setonLogin] = useState(true);

  const overlayclick = () => {
    setonLogin(!onLogin);
  }


  return (
    <div className="auth-page">
      <button className='back' onClick={()=>navigate("/")}><Arrow/></button>
      <div className="auth-container ">
            <Login onLogin={onLogin}/>
            <Register onLogin={onLogin} />
        <Overlay overlayclick={overlayclick} onLogin={onLogin} />
        
      </div>
    </div>
  )
}

export default AuthPage