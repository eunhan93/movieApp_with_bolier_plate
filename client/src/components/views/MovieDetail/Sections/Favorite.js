import Axios from 'axios'
import React, {useEffect} from 'react';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieTitle;
    useEffect(() => {
        let variables = {
            userFrom,
            movieId
         }
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success) {

            } else {
                alert('숫자 정보를 가져오는 데 실패 했습니다.')
            }
        })
    }, [])
    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
