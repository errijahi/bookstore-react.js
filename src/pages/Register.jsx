import React,{useState,useEffect,useContext} from 'react';
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from '../context/authContext';
import {Link, useNavigate} from "react-router-dom";
import validator from "validator";
import "../styles/styles.css";
import axios from "axios";


function Register() {
  const {currentUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser !== null){
      navigate("/");
    }
  },[currentUser])

  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const [error,setError] = useState(null);

  const validateEmail = (e) => {
    if (validator.isEmail(e.target.value)) {
      setError(" ");
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
    } else {
      setError("Enter valid Email!");
    }
  };

  const handelChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handelSubmit = async e => {
    e.preventDefault();
    try{
      if(inputs.username == "" || inputs.email == "" || inputs.password == "" || inputs.confirmPassword == "" ){
        setError("All fileds must be filled")
      }else if(inputs.password !== inputs.confirmPassword){
          setError("Passwords must be same")
      }else{
        await axios.post("/auth/register",inputs)
        navigate("/login");
      }
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
        <h1 className='title'>Register</h1>
        <form  className='items'>
        
          <div className="field">
            <input className='inputForm' autocomplete="off" type={"text"} name='username' onChange={handelChange}/>
            <label className={inputs.username ? 'labelFormValue' :'labelForm' } >username</label>
          </div>
        
          <div className="field">
            <input  className='inputForm' autocomplete="off" type={"email"} name='email' onChange={validateEmail}/>
            <label className={inputs.email ? 'labelFormValue' :'labelForm' }>email</label>
          </div>
       
          <div className="field">
            <input className='inputForm' autocomplete="off" type={"password"} name='password' onChange={handelChange}/>
            <label className={inputs.password ? 'labelFormValue' :'labelForm' }>password</label>
          </div>
       
          <div className="field">
            <input className='inputForm' autocomplete="off" type={"password"} name='confirmPassword' onChange={handelChange}/>
            <label className={inputs.confirmPassword ? 'labelFormValue' :'labelForm' }>confirm password</label>
          </div>
       
          <p className={error ? 'error' : null}>{error}</p>
          <button type='submit' className='button' onClick={handelSubmit}>Submit</button>
          <div className='other'>
            <Link className='link' to={"/Login"}>Login</Link> <p>or</p>  <Link className='link' to={"/"}>View books</Link> 
          </div>
        
        </form>
      </div>
      }
    </div>
  )
}

export default Register