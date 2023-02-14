import React, {useEffect, useContext, useState} from 'react'
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import "../styles/profile.css";
import axios from 'axios';

function Profile() {
  
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //currentUser must be defined before hook [id,setId]
  const {currentUser} = useContext(AuthContext);
  const [id, setId] = useState(currentUser.id);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [email, setEmail] = useState("");
  const [error,setError] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate()

  //console.log(currentUser)
    useEffect(()=>{
      if(currentUser == null){
        navigate("/");
      }
    },[currentUser])

    useEffect(()=>{
      const getUser = async() => {
        const res = await axios.get(`/users/${currentUser.id}`);
        // console.log( res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      }
      getUser();
    },[]) 

    const validateEmail = (e) => {
      if (validator.isEmail(e)) {
        setError(" ");
        setEmail(e)
      } else {
        setError("Please, enter valid Email!");
      }
    };
    
    const uplaod = async () => {
      if(file !== null){
      try {
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data.downloadURL)
        return res.data.downloadURL;
      } catch (err) {
        console.log(err);
      }
    }
    }

    const handelImage = async() =>{
      const imgUrl = await uplaod();
      try{
        await axios.put(`/users/user-image-upload/${currentUser.id}`, {
        img: file ? imgUrl : ""
      })
      handelRefresh();
      }catch(err){
        console.log(err);
      }
    }

  const handelDelete = async() => {
    try{
      await axios.delete(`/users/${currentUser.id}`);
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }

  const handelClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${currentUser.id}`, {
        username, 
        email, 
      });
      handelRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  const handelClickPassword = async (e) => {
    e.preventDefault();
    try {
      if(newPassword !== ConfirmNewPassword){
          setError("Passwords must be same.")
      }else{
        await axios.put(`/users/password-change/${currentUser.id}`, {
          username, 
          password,
          newPassword,
          id,
        });
        handelRefresh();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handelRefresh = () => {
    window.location.reload();
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
        {currentUser? 
        <div className='main-div-profile'>
          <h1 className='title-profile'>Profile</h1>    
          <h2 className='title-profile'>Edit</h2>
     
          <div className='edit-div-profile'>
            <label className='label-profile'>Username</label>
            <input className='input-profile' type={"text"} onChange={e => setUsername(e.target.value)} value={username} />
            <label className='label-profile'>Email</label>
            <label className='label-profile'>Currnet email: {email}</label>
            <input className='input-profile' type="email" onChange={e => validateEmail(e.target.value) }/>
            <button className='button-profile' onClick={handelClick}>Publish</button>
          </div>
      
          <h2 className='title-profile'>Eidt user photo</h2>
          <div className='image-div-profile'>
            <>
            <button onClick={handleClick} className="button-profile">
              Upload image
            </button>
            <input  ref={hiddenFileInput} style={{display:'none'}} type={"file"} onChange={e => setFile(e.target.files[0])}/>
            </>
            {file? <p className="image-text">{file.name}</p> : null}
            <button className='button-profile' onClick={handelImage}>Publish</button>
          </div>
     
      <h2 className='title-profile'>Change password</h2>
      <div className='password-div-profile'>
        {error}
        <label className='label-profile'>Old Password</label>
        <input className='input-profile' type={"password"} onChange={e => setPassword(e.target.value)} value={password} />
        <label className='label-profile'>New Password</label>
        <input className='input-profile' type={"password"} onChange={e => setNewPassword(e.target.value)} value={newPassword} />
        <label className='label-profile'>Confirm New Password</label>
        <input className='input-profile' type={"password"} onChange={e => setConfirmNewPassword(e.target.value)} value={ConfirmNewPassword} />
        <button className='button-profile' onClick={handelClickPassword}>Publish</button>
      </div>
      
      <h2 className='title-profile'>Delete accout</h2>
      <button className='button-delete-profile' onClick={handelDelete}>Delete</button>
    </div>
    :<div></div>
    }
  </div>
  )
}

export default Profile