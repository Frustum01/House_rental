import React from 'react'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import LandingPage from '../pages/LandingPage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
      </Routes> */}
      <HomePage/>
    </div>
  )
}

export default App