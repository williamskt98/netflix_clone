import React, { useEffect, useState } from 'react'
import './Test.css'
import { getWatchlistData } from '../../services/watchlist';
import PropTypes from 'prop-types';

export default function MyTest( { uid } ) {
    const [watchlistData, setWatchlistData] = useState();

    useEffect(() => {
        let mounted = true;
        getWatchlistData(uid)
        .then(data =>{
            if (mounted) {
                setWatchlistData(data)
            }
        });
        return () => {
            mounted = false;
        }
    }, [uid])

    return (
        <div className='wrapper'>
            <h1>Watchlist Data</h1>
            {watchlistData?.map((movie, index) => (
                <ul key={index}>
                    <li>Title: {movie.title}</li>
                    <li>Runtime: {movie.runtime}</li>
                </ul>
            ))}
        </div>
    )

}

MyTest.propTypes = {
    uid: PropTypes.string.isRequired
}

