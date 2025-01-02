import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import './MyList.css'

const MyList = () => {
  
    const {uid} = useParams();
    const [watchlistData, setWatchlistData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchWatchlistData = async () => {
            setIsLoading(true);
            try {
                await fetch(`http://localhost:8080/watchlist/${uid}`)
                .then(res => res.json())
                .then(res => setWatchlistData(res))
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            }
        }

        fetchWatchlistData();
    }, [])

    return (
        <div>
            <Navbar />
            {isLoading ? 
                (<p>Loading...</p>) :
                //(JSON.stringify(watchlistData))
                <>
                    {/*watchlistData.map((movie, index) => (
                        <div key={index}>
                            <span>{movie.title}</span>
                            <span>{movie.runtime}</span>
                        </div>
                    ))*/
                    watchlistData[0].title}
                </>
            }
        </div>
    )

}

export default MyList

