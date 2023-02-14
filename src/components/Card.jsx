import { json, Link } from 'react-router-dom';
import "../styles/card.css";
import React from 'react';

function Card(props) {
  return (    
    <Link className='link-card' to={"/book/" + props.children.id}>
        <div className='card-box'>
            <div className='title-box'>
            <h2>{props.children.title}</h2>
        </div>
            <div className='image-box'>
                <img className='image-box-img' src={props.children.img}  alt="book image"/>
            </div>
            <div className='description-box'>
                <p className='desc-text-card'>{props.children.desc}</p>
            </div>
        </div>
    </Link>
  )
}

export default Card
