import {Link, useLocation, useNavigate} from "react-router-dom";
import React, { useEffect,useState,useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu';
import "../styles/single.css";
import moment from 'moment'
import axios from 'axios';

function Single() {
  //location must be defined before hooks to be used.
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext);
  const [book,setBook] = useState([]);
  const navigate = useNavigate();
  
  //  console.log(bookId)
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/books/${bookId}`);
        // console.log(res.data)
        setBook(res.data); 
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[bookId])

  const handelDelete = async() => {
    try{
      await axios.delete(`/books/${bookId}`);
      navigate("/")
    }catch(err){
      console.log(err);
    }  
  }

  return (        
    <div className='main-box-single'>
      <h1 className='title-single'>{book.title}</h1>
      <div className='content-box-single'>
        <div className='user-info'> 
          <img className='img-single' src={book?.img} alt="img here"/>
            <div className='description-single'>
              <h2 className='description-title-single'>Description</h2>
              <p className='description-paragraph-single'>{book?.desc}</p>
            </div>
            
            <div className='book-info'>
              {book.userImg &&<img className='avatar-single' src={book.userImg} alt="user image"/>}
              <div className='avatar-text-single'>
                <p>booked {moment(book.date).fromNow()}</p>
                <p>by {book.username}</p>
              </div>
            </div>
      
            {currentUser?.username === book.username && (
            <div  className='user-actions'>
              <Link className='button-single' to={`/write?edit=${bookId}`} state={book}>
                Edit
              </Link>
              <Link className='button-delete-single' onClick={handelDelete}>Delete</Link>
            </div>
            )}
        </div>
      </div >
      <div className='recomendations'>
        <Menu cat={book.cat}/>
      </div>
    </div>
  )
}

export default Single