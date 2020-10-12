import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage(props) {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImg, setMainMovieImg] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
        fetchMovies(endpoint);
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setMovies([...Movies, ...data.results]);
            setMainMovieImg(data.results[1]); // results[0] <- overview가 없어 1로 임시로 변경
            setCurrentPage(data.page)
        })
    }
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }
    return (
        <div style={styles.container}>
            {/* { main image} */}
            {MainMovieImg &&
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImg.backdrop_path}`} 
                    title = {MainMovieImg.original_title}
                    text = {MainMovieImg.overview}
                />
            }

            <div style={styles.card}>
                <h2>Movies by latest</h2>
                <hr />

                <Row gutter={16, 16}>
                    
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            {/* Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화 */}
                            <GridCards 
                                landingPage
                                image = {movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId = {movie.id}
                                movieName = {movie.original_title}
                            />

                        </React.Fragment>
                    ))}

                </Row>
            </div>
            <div style={styles.more}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

const styles = {
    container : {
        width : "100%",
        margin : "0"
    },
    card : {
        width : "85%",
        margin : "1rem auto"
    },
    more : {
        display : 'flex',
        justifyContent : 'center'
    }
}

export default withRouter(LandingPage)
