import React, {useState,useEffect,useContext} from 'react';
import { ThemeContext } from '../context/themeContext';
import { AuthContext } from '../context/authContext';
import DarkModeToggle from "react-dark-mode-toggle";
import { Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import "../styles/navbar.css";
import axios from 'axios';

function Navbar() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState();
  const {currentUser} = useContext(AuthContext);
  const [img, setImg] = useState("");

  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      // console.log( res.data);
      setImg(res.data.img);
    }
    getUser();
  },[currentUser])

  useEffect(()=>{
    if(theme == "dark-theme"){
      setIsDarkMode(true);
    }else{
      setIsDarkMode(false);
    }
  },[theme])

  let showAvatar = () => {
    if(currentUser){
      if(img){
        // return <Link to={"/profile"} className="linkNavbar" > <img className='profile-image'  src={`../upload/${img}`} alt="u.i"/></Link>
        return <Link to={"/profile"} className="linkNavbar" > <img className='profile-image'  src={img} alt="u.i"/></Link>
      }else{
        return <Link to={"/profile"} className="linkNavbar" > <p className='profile-image'/> </Link>
      }
    }else{
      return null
    }
  }

  return (
    <div className='navbar'>
      <div className='loginRegister'>
        {currentUser? null :  <Link to={"/login"} className="linkNavbar" >Login</Link>} 
        {currentUser? null : <p className="link-Navbar-text">or</p> }
        {currentUser? null : <Link to={"/register"} className="linkNavbar" >Register</Link> }
        {showAvatar()}

        <div className='dark-ligh-mode-button'>
          <DarkModeToggle
          onChange={() => toggleTheme()}
          checked={isDarkMode}
          size={60}
          />
        </div>
      </div>
      
      <div  id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      </div>
    </div>
  )
}

export default Navbar