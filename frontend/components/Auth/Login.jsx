import "../../styles/auth.css"
import Social from "./Social.jsx"
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = ({onLogin}) => {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("")
  const navigate = useNavigate();
  
  const loginHandle = async(e)=>{
    e.preventDefault();
 
    try {
      const responce = await axios.post("http://localhost:8000/user/login",{
        email,
        password
      })

      navigate("/home");
    } catch (error) {
      
      alert(error.response.data.message)
    }
  }
  
  return (
    <motion.div 
    className="login-container"
    animate={{x: onLogin ? 0 : "100%",opacity: onLogin ? 1 : 0}}
    transition = {{duration:0.6 ,
      ease: "easeInOut"
    }} >
      <div className="innerLogin">
        <h1>Login</h1>
        <Social />
        <span className="login-span">Or use personal info</span>
        <form className="login-form" onSubmit={loginHandle}>
          <input type="emial" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}} required/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}  } required/>
          <a href="#">Forgot your password?</a>
          <button className="login-btn" >Login</button>
        </form>
      </div>
    </motion.div>
  )
}
  
export default Login