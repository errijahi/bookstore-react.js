import React,{useState,useContext,useEffect} from 'react'
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from '../context/authContext';
import {Link, useNavigate} from "react-router-dom";
import "../styles/login.css";

function Login() {
  const {login,currentUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const [error,setError] = useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    if(currentUser !== null){
      navigate("/");
    }
  },[currentUser])
  
  const [inputs,setInputs] = useState({
    username:"",
    password:""
  })

  const handelChange = (e) => {
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/");
    }catch(err){
      // console.log(err);
      setError(err.response.data)
    }
  }

  return (
     <div className={`App ${theme}`}>
    
      {currentUser? 
      <div></div>: 
   
      <div className="form">
        <h1 className='title'>Login</h1>
        <form className='items'>
          <div className="field">
            <input className='inputForm' autocomplete="off" type={"text"} name="username" onChange={handelChange}/>
            <label className={inputs.username ? 'labelFormValue' :'labelForm' }>username</label> 
          </div>
          <div className="field">
            <input autocomplete="off" className='inputForm' type={"password"} name="password" onChange={handelChange}/>
            <label className={inputs.password ? 'labelFormValue' :'labelForm' }>password</label>
          </div>
          <p className={error ? 'error' : null}>{error}</p>
          <button className='button' type='submit' onClick={handelSubmit}>Submit</button>
          <div className='other'>
            <Link className='link' to={"/register"}>Register</Link> <p>or</p>  <Link className='link' to={"/"}>View books</Link> 
          </div>
        </form>  
      </div> }  
     </div>
  )
}

export default Login