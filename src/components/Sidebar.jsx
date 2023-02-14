import React, {useState,useEffect,useContext}  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { slide as Menu } from 'react-burger-menu';
import "../styles/navbar.css";
import axios from 'axios';

function Sidebar() {
  const {currentUser,logout} = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  
  const logOutUser = () => {
    logout();
    navigate("/");
  }
  
  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      // console.log( res.data);
      setUsername(res.data.username);
    }
    getUser();
  },[])

  return (
    <Menu>
    <div className='margin-space'></div>
      
      {currentUser ? <>
        <p className='link-title'> WELCOME  </p> 
        <p className='link-title-name'>{username ? username : currentUser?.username }</p>
      </> : null}

      <Link className='link-sideBar' to="/"><p>HOME</p></Link>
      {currentUser ? <div>
        <Link className='link-sideBar' to="/write"><p>ADD NEW BOOK</p></Link>
      </div> : null}

      {currentUser ? <div>
        <Link className='link-sideBar' to="/profile"><p>PROFILE</p></Link>
      </div> : null}

      {currentUser? <span onClick={logOutUser} className="link-sideBar" >LOGOUT</span> :  null} 
      <div className='margin-space'></div>
      <p className='link-title-geners'>Genres</p>

      <Link className='link-sideBar' to="/?cat=action and adventure"><p>Action and adventure</p></Link>
      <Link className='link-sideBar' to="/?cat=alternate history"><p>Alternate history</p></Link>
      <Link className='link-sideBar' to="/?cat=antology"><p>Antology</p></Link>
      <Link className='link-sideBar' to="/?cat=children"><p>Children</p></Link>
      <Link className='link-sideBar' to="/?cat=classic"><p>Classic</p></Link>
      <Link className='link-sideBar' to="/?cat=drama"><p>Drama</p></Link>
      <Link className='link-sideBar' to="/?cat=sport and leisure"><p>Sport and leisure</p></Link>
      <Link className='link-sideBar' to="/?cat=crime"><p>Crime</p></Link>
      <Link className='link-sideBar' to="/?cat=fantasy"><p>Fantasy</p></Link>
      <Link className='link-sideBar' to="/?cat=horror"><p>Horror</p></Link>
      <Link className='link-sideBar' to="/?cat=mystery"><p>Mystery</p></Link>
      <Link className='link-sideBar' to="/?cat=poetry"><p>Poetry</p></Link>
      <Link className='link-sideBar' to="/?cat=political thriller"><p>Political thriller</p></Link>
      <Link className='link-sideBar' to="/?cat=romance"><p>Romance</p></Link>
      <Link className='link-sideBar' to="/?cat=satire"><p>Satire</p></Link>
      <Link className='link-sideBar' to="/?cat=science fiction"><p>Science fiction</p></Link>
      <Link className='link-sideBar' to="/?cat=short story"><p>Short story</p></Link>
      <Link className='link-sideBar' to="/?cat=business/economics"><p>Business/economics</p></Link>
      <Link className='link-sideBar' to="/?cat=crafts/hobbies"><p>Crafts/hobbies</p></Link>
      <Link className='link-sideBar' to="/?cat=cookbook"><p>Cookbook</p></Link>
      <Link className='link-sideBar' to="/?cat=diary"><p>Diary</p></Link>
      <Link className='link-sideBar' to="/?cat=thriller"><p>Thriller</p></Link>
      <Link className='link-sideBar' to="/?cat=western"><p>Western</p></Link>
      <Link className='link-sideBar' to="/?cat=art/architecture"><p>Art/architecture</p></Link>
      <Link className='link-sideBar' to="/?cat=autobiogrphy"><p>Autobiogrphy</p></Link>
      <Link className='link-sideBar' to="/?cat=biogrphy"><p>Biogrphy</p></Link>
      <Link className='link-sideBar' to="/?cat=encyclopedia"><p>Encyclopedia</p></Link>
      <Link className='link-sideBar' to="/?cat=health/fitness"><p>Health/fitness</p></Link>
      <Link className='link-sideBar' to="/?cat=history"><p>History</p></Link>
      <Link className='link-sideBar' to="/?cat=humor"><p>Humor</p></Link>
      <Link className='link-sideBar' to="/?cat=jornal"><p>Jornal</p></Link>
      <Link className='link-sideBar' to="/?cat=philosophy"><p>Philosophy</p></Link>
      <Link className='link-sideBar' to="/?cat=relgion"><p>Relgion</p></Link> 
      <Link className='link-sideBar' to="/?cat=sceience"><p>Sceience</p></Link>      
    </Menu>
  )
}

export default Sidebar