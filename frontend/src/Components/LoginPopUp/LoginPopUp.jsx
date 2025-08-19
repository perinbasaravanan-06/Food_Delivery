import { useState } from 'react';
import './LoginPopUp.css';
import {assets} from '../../assets/assets'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {
  const [currState,setCurrSatate] = useState("LOGIN")
  const {url,setToken} = useContext(StoreContext);

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event)=>{
    const name  = event.target.name
    const value = event.target.value
    setData(data => ({...data,[name]:value}))
  }
  

  const onLogin = async (event)=>{
    event.preventDefault();

      let  newUrl  = url;
      if(currState === "LOGIN"){
        newUrl +="/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
          setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
  } 

  return (
    <div className='login-pop-up'>
      <form  onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick = {()=> setShowLogin(false)}src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currState === "LOGIN" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> }
          <input name='email' onChange={onChangeHandler}  value={data.email}   type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          <button type='submit'>{currState  === "SIGN UP" ? "Create Account" : "LOGIN"}</button>
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