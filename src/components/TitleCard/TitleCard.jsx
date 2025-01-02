import React, { useEffect, useState } from "react"
import './TitleCard.css'
import { Link } from 'react-router-dom'
import { FaPlayCircle } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsBadgeHd, BsHandThumbsUp } from 'react-icons/bs'
import { SlArrowDown } from 'react-icons/sl'
import GenreTags from "../GenreTags/GenreTags"
import { getMovieData } from "../../services/movies"

const TitleCard = (props) => {

    const [movieData, setMovieData] = useState("")

    useEffect(() => {
        getMovieData(props.id)
        .then(data => {
            setMovieData(data)
        })
    }, [])

    return (<div className="card"
             >
                <Link to={`/player/${props.id}`} className='card-link'>
                    <img src={'https://image.tmdb.org/t/p/w500' + movieData?.backdrop_path} alt="" />
                    <p>{movieData?.title}</p>
                </Link>
                <div className="expand-card">
                    <div className="icons">
                        <Link to={`/player/${props.id}`}>
                            <span><FaPlayCircle className='play'/></span>
                        </Link>
                        <span><AiOutlinePlus className='plus'/></span>
                        <span><BsHandThumbsUp className='thumb'/></span>
                        <span><SlArrowDown className='dropdown'/></span>
                    </div>
                    <div className="info">
                        <span className="rating">{movieData?.rating}</span>
                        <span className="runtime">{movieData?.runtime}</span>
                        <span className="hd"><BsBadgeHd /></span>
                    </div>
                    <ul className="tags">
                        <GenreTags genres={movieData?.genres} id={movieData?.id} />
                    </ul>
                </div>
                
            </div>)
}

export default TitleCard
