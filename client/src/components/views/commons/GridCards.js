import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
    if (props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width:'100%', height : 'auto', marginBottom: '1rem'}} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                    <img style={{width:'100%', height : 'auto', marginBottom: '0.5rem'}} src={props.image} alt={props.characterName} />
                    <p style={{textAlign : "center", marginBottom : '1.5rem'}}>{props.characterName}</p>
                </div>
            </Col>
        )
    }
    
}

export default GridCards
