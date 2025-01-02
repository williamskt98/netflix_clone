import React, { useEffect, useState } from "react"
import './TitleCard.css'
import { Link } from 'react-router-dom'
import { FaPlayCircle } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsBadgeHd, BsHandThumbsUp } from 'react-icons/bs'
import { SlArrowDown } from 'react-icons/sl'
import GenreTags from "../GenreTags/GenreTags"

const TitleCard = (props) => {

    const [movieData, setMovieData] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            setIsLoading(true);

            try {
                await fetch(`http://localhost:8080/movie/${props.card.id}`)
                .then(res => res.json())
                .then(res => setMovieData(res))
            } catch(error) {
                console.error(err)
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            }
        }

        fetchMovieData()
    }, [])

    return (<div className="card"
            //onMouseEnter={fetchCardData(card.id)}
            //onMouseLeave={clearCardData()}
             >
                <Link to={`/player/${props.card.id}`} className='card-link'>
                    <img src={'https://image.tmdb.org/t/p/w500' + props.card.backdrop_path} alt="" />
                    <p>{props.card.title}</p>
                </Link>
                {isLoading ? (
                    < ></>
                ) : (
                    <div className="expand-card">
                    <div className="icons">
                        <Link to={`/player/${props.card.id}`}>
                            <span><FaPlayCircle className='play'/></span>
                        </Link>
                        <span><AiOutlinePlus className='plus'/></span>
                        <span><BsHandThumbsUp className='thumb'/></span>
                        <span><SlArrowDown className='dropdown'/></span>
                    </div>
                    <div className="info">
                        <span className="rating">{movieData.rating}</span>
                        <span className="runtime">{movieData.runtime}</span>
                        <span className="hd"><BsBadgeHd /></span>
                    </div>
                    <ul className="tags">
                        <GenreTags genres={movieData.genres} id={movieData.id} />
                    </ul>
                </div>
                )}
                
            </div>)
}

export default TitleCard
