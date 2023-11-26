import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./MovieCard.css"
const MovieCard = (props) => {
    const navigate = useNavigate()
    const [color, setColor] = useState('')
    const [rating, setRating] = useState(0)
    const [isTextNotFull, setIsTextNotFull] = useState(false)
    useEffect(() => {
        const calculatedRating = props.rating.kp
            ? parseFloat(props.rating.kp.toFixed(1))
            : parseFloat(props.rating.toFixed(1));

        if(calculatedRating >= 7.5 && calculatedRating <= 10) {
            setColor("#49c5b6")
        } else if(calculatedRating >= 6 && calculatedRating < 7.5) {
            setColor("#FEFE22")
        } else {
            setColor("lightcoral")
        }
        setRating(calculatedRating);
    },[props])
    const handleImageClick = () => {
        window.scroll(0, 0)
        localStorage.setItem(`${props.name}`, JSON.stringify(props))
        if(props.isPropsFromMoviePage) props.setImageProps(JSON.parse(localStorage.getItem(`${props.name}`)))
        const encodedName = encodeURIComponent(props.name)
        navigate(`/movie-app/movies/${encodedName}`);
    };
    return (
        <div className="movie__card" style={{width: props.width, height: props.height}}>
            <img src={props.src} loading="lazy" style={{width: props.width, height: props.height}}/>
            <div className="movie__info">
                <span style={{color, display: 'flex', justifyContent:'center', alignItems: 'center'}}>{rating}</span>
                <h3>{`${props.name}(${props.year})`}</h3>
                {props.shortDescription ? <p>{window.innerWidth > 425 &&window.innerWidth <= 1340 ? props.description.slice(0, props.shortDescription.length / 3) + "…" : props.shortDescription}</p> : <br/>}
                <a className="movie__btn" onClick={handleImageClick}>
                    Подробнее
                </a>
            </div>
            <div className="tabletAndMobileVersion" onClick={handleImageClick}></div>
        </div>
    );
};

export default MovieCard;