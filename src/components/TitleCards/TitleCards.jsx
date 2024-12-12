import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import { FaPlayCircle } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsBadgeHd, BsHandThumbsUp } from 'react-icons/bs'
import { SlArrowDown } from 'react-icons/sl'

const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([])
    const cardListRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTEyYjExN2JiMjU2NWZiYzIwYTQwMTBjYjc2NzExOSIsIm5iZiI6MTczMzY5MTI4MC42MTc5OTk4LCJzdWIiOiI2NzU2MDc5MDZlMGJlZDI2NmI3ZjhjOTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBbPdS0Cr_4xaIEYLwhF-zk6u16AjfUElAP42kizidY'
        }
      };

    const handleWheel = (event) => {
    event.preventDefault;
    cardListRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        cardListRef.current.addEventListener('wheel', handleWheel);
    }, [])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardListRef}>
        {apiData.map((card, index) => {
            return <div className="card">
                <Link to={`/player/${card.id}`} key={index} className='card-link'>
                    <img src={'https://image.tmdb.org/t/p/w500' + card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
                <div className="expand-card">
                    <div className="icons">
                        <span><FaPlayCircle className='play'/></span>
                        <span><AiOutlinePlus className='plus'/></span>
                        <span><BsHandThumbsUp className='thumb'/></span>
                        <span><SlArrowDown className='dropdown'/></span>
                    </div>
                    <div className="info">
                        <span className="rating">R</span>
                        <span className="runtime">2h 3m</span>
                        <span className="hd"><BsBadgeHd /></span>
                    </div>
                    <ul className="tags">
                        <li><span>Witty</span></li>
                        <li><span>Emotional</span></li>
                        <li><span>Action</span></li>
                    </ul>
                </div>
            </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
