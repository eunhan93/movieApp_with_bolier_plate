import React  from 'react';

const MainImage = (props) => {
    return (
        <div style={{background : `url(${props.image}) no-repeat center center / cover`,width : '100%', height : '500px', position: 'relative'}}>
            <div>
                <div style={styles.movies}>
                    <h2 style={styles.movie_h2}>{props.title}</h2>
                    <p style={styles.movie_p}>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    movies : {
        position : "absolute",
        maxWidth : "500px",
        bottom : '2rem',
        marginLeft : '2rem'
    },
    movie_h2 : {
        color : 'white'
    },
    movie_p : {
        color : 'white',
        fontsize : '1rem'
    }
}

export default MainImage;