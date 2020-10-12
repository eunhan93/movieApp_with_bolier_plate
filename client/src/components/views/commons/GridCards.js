import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
    console.log(props.image);
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{position:'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width:'100%', height : 'auto'}} src={props.image} alt={props.movieName} />
                </a>
            </div>
        </Col>
    )
}

export default GridCards
