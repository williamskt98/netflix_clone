import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

/*
    Returns trailer among video list, or teaser if trailer not found
    Input: List of video objects
*/
function fetchTrailer(results) {
    var teaser = null;
    for (const result of results){
        if (result.type === "Trailer") {
            return result;
        } else if (result.type === "Teaser" && teaser === null) {
            teaser = result;
        }
    }
    // Reached end of loop and no trailer found, return teaser if present, else return first video
    if (teaser != null) {
        return teaser;
    }
    return results[0];
}

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTEyYjExN2JiMjU2NWZiYzIwYTQwMTBjYjc2NzExOSIsIm5iZiI6MTczMzY5MTI4MC42MTc5OTk4LCJzdWIiOiI2NzU2MDc5MDZlMGJlZDI2NmI3ZjhjOTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nBbPdS0Cr_4xaIEYLwhF-zk6u16AjfUElAP42kizidY'
        }
      };
      
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(fetchTrailer(res.results)))
        //.then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));
      }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate('/')}}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`} frameBorder="0" 
      title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
