import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import {withRouter} from 'react-router-dom';
import MainImages from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd'

function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
        .then(response => response.json())
        .then(data => {
            setMovie(data);
        });
        fetch(endpointCrew)
        .then(response => response.json())
        .then(data => {
            setCasts(data.cast)
        });
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }
    return (
        <div>
            {/* header */}
            <MainImages 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title = {Movie.original_title}
                text = {Movie.overview}
            />
            
            {/* body */}
            <div style={styles.body}>
                <div style={styles.favorite}>
                    <Favorite movieInfo={Movie} movieId = {movieId} userFrom = {localStorage.getItem('userId')} />
                </div>

                {/* movie info */}
                <MovieInfo movie = {Movie}/>
                <hr />

                
                <div style={styles.buttonArea}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle && 
                    <Row gutter={16, 16}>
                        
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                {/* Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화 */}
                                <GridCards 
                                    image = {cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName = {cast.name}
                                />

                            </React.Fragment>
                        ))}

                    </Row>
                }

                


            </div>

            
        </div>
    )
}

const styles = {
    body : {
        width : '85%',
        margin : '1rem auto'
    }, 
    buttonArea : {
        display : 'flex',
        justifyContent : 'center',
        margin : '2rem'
    },
    favorite : {
        display : 'flex',
        justifyContent : 'flex-end'
    }
}

export default withRouter(MovieDetail)
