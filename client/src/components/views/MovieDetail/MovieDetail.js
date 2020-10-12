import React, { useEffect } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import {withRouter} from 'react-router-dom';

function MovieDetail(props) {
    let movieId = props.match.params.movieId

    useEffect(() => {
        // fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default withRouter(MovieDetail)
