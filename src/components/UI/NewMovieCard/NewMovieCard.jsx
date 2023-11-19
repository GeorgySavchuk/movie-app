import {useNavigate} from "react-router-dom";
import {useFavourites} from "../../../hooks/useFavourites";
import {useProps} from "../../../Context/useProps";
import React, {useEffect, useState} from "react";
import "./NewMovieCard.css"

const NewMovieCard = (props) => {
    const navigate = useNavigate()
    const [color, setColor] = useState('')
    const [rating, setRating] = useState(0)
    useEffect(() => {
        const calculatedRating = props.rating.kp
            ? parseFloat(props.rating.kp.toFixed(1))
            : parseFloat(props.rating.toFixed(1));

        if (calculatedRating >= 7.5 && calculatedRating <= 10) {
            setColor("#49c5b6")
        } else if (calculatedRating >= 6 && calculatedRating < 7.5) {
            setColor("#FEFE22")
        } else {
            setColor("lightcoral")
        }
        setRating(calculatedRating);
    }, [props])
    const handleImageClick = () => {
        window.scroll(0, 0)
        localStorage.setItem(`${props.name}`, JSON.stringify(props))
        // localStorage.setItem('imageProps', JSON.stringify(props))
        // if (props.isPropsFromMoviePage) props.setImageProps(JSON.parse(localStorage.getItem('imageProps')))
        if (props.isPropsFromMoviePage) props.setImageProps(JSON.parse(localStorage.getItem(`${props.name}`)))
        const encodedName = encodeURIComponent(props.name)
        navigate(`/movies/${encodedName}`);
    };
    return (
        <div className="newmovie__card" style={{width: props.width, height: props.height}}>
            <img src={props.src} alt={props.name} style={{width: props.width, height: props.height}}/>
            <div className="newmovie__info">
                <span style={{color, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{rating}</span>
                <h3>{`${props.name}(${props.year})`}</h3>
                {props.shortDescription ? <p>{props.shortDescription}</p> : <br/>}
                <a className="newmovie__btn" onClick={handleImageClick}>
                    Подробнее
                </a>
            </div>
        </div>
    );
}
export default NewMovieCard;