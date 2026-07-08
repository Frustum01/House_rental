import React from 'react'
import axios from "axios"
import Social from './Social'
import { motion } from "framer-motion";
import { useState } from 'react';


const Register = ({onLogin}) => {
  
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [phone,setphone] = useState("");
  const [pass,setpass] = useState("");

  const handleRegister = async (e) =>{
    e.preventDefault();
    if (!name || !email || !pass || !phone) {
    alert("Please fill all fields");
    return;
  }

  if (phone.length !== 10) {
    alert("Phone number must be exactly 10 digits");
    return;
  }
    try {
      const responce = await axios.post("http://localhost:8000/user/register",{
        name,
        email,
        password:pass,
        phone
      });
      console.log("user created")
      
    } catch (error) {
    alert(error.response.data.message)
    }
  }



  return (
    <motion.div className="register-container"
    animate={{x: onLogin ?  0 : "-100%",opacity: onLogin ? 0 : 1,delay: onLogin ? 0 : 0.15}}
    transition = {{duration:0.6 ,
      ease: "easeInOut"
    }} >
      <div className="innerRegister">
        <h1>Register</h1>
        <Social />
        <span className="login-span">Or Use Your Email For Registration</span>
        <form className="Register-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setname(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
          <input type="password" placeholder="Password" value={pass} onChange={(e)=>setpass(e.target.value)} required/>
          <input type="tel" placeholder="Phone Number" value={phone} maxLength={10} onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); 
            if (value.length <= 10) {
            setphone(value);}}} required/>

          <button  className="Registerbtn" >Sign up</button>
        </form>
      </div>
    </motion.div>
  )
}

export default Register