import React, { useEffect, useState } from "react"
import './GenreTags.css'

const GenreTags = function(props) {

    const { genres, id } = props;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [props.genres])

    return (
        <ul className="tags">
            {!isLoaded ? (
                < ></>
            ) : (
               genres.slice(0,3).map((genre, index) => {
                return <li className={index}><span>{genre}</span></li>
               }
            ))}
        </ul>
    )

}

export default GenreTags