import { useState } from 'react';
import './LoginPopUp.css';
import {assets} from '../../assets/assets'

const LoginPopUp = ({setShowLogin}) => {
  const [currState,setCurrSatate] = useState("SIGN UP")
  return (
    <div className='login-pop-up'>
      <form  className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick = {()=> setShowLogin(false)}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState === "LOGIN" ? <></> : <input type="text" placeholder='Your name' required /> }
         
          <input type='email' placeholder='Your email' required />
          <input type="password" placeholder='Password' required />
          <button>{currState  === "SIGN UP" ? "Create Account" : "LOGIN"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By contining,I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "LOGIN"
            ? <p>Create a new account? <span onClick={() => setCurrSatate("SIGN UP")}>Click here</span></p> 
            : <p>Already have an account ? <span onClick={() => setCurrSatate("LOGIN")}>Login here</span></p>
          }
          
          
        </div>
      </form>
    </div>
  )
}

export default LoginPopUp