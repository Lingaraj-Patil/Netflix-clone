import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards_data from "../../assets/cards/Cards_data";
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
  const  cardRef = useRef();
  const [apiData,setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTU4ODY5MGI5NDkwYTQ1MTJmZGY5ZTM1ZjU5OTQ0ZSIsIm5iZiI6MTc0MjM2NDA2Mi4zNzYsInN1YiI6IjY3ZGE1ZDllMmJlYTk3NWY4ZGE2Y2M0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oaQ59kjKVLIYwYYFOZUoJiGr76B7xT-9iG524jrb5uo'
    }
  };
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel',handleWheel);
  },[])

  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className='card-list' ref={cardRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path}/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards