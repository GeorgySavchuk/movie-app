import React, {useEffect, useRef, useState} from 'react';
import classes from './Image.module.css'
import {minutesToHoursAndMinutes} from "../../../utils/minutesToHoursAndMinutes";
import favourite from '../images/favorite.png'
import favourite__active from '../images/favorite__active.png'
import {useFavourites} from "../../../hooks/useFavourites";
import {useNavigate} from "react-router-dom";
import {useProps} from "../../../Context/useProps";
const Image = (props) => {
    const navigate = useNavigate()
    const {isFavourite, toggleFavourite } = useFavourites();
    const {setImageProps} = useProps()
    const setFavourite = (e) => {
        e.stopPropagation()
        toggleFavourite(props)
    };
    const handleImageClick = () => {
        setImageProps(props);
        navigate(`/movie-app/movies/${props.name}`);
    };


    return (
            <div className={!props.isMoviePage ? classes.gridItemInner : ''} onClick={handleImageClick}>
                <img src={props.src} alt={props.alt} width={props.width} height={props.height} className={classes.image}/>
                {!props.isMoviePage &&
                    <div className={classes.overlay}>
                        <div className={classes.top}>
                            <span>{props.rating?.kp ? props.rating.kp.toFixed(1) : props.rating.toFixed(1)}</span>
                            {!props.isFavouritePage &&
                                <div onClick={setFavourite}>
                                    {isFavourite(props)
                                        ? <img src={favourite__active}/>
                                        : <img src={favourite}/>
                                    }
                                </div>
                            }
                        </div>
                        <div className={classes.bottomInfo}>
                            <h3 className={classes.bottomTop}>{props.name}</h3>
                            <div className={classes.bottom}>
                                <span>{props.year}</span>
                                {props.type === "movie" && <span>{minutesToHoursAndMinutes(props.movieLength)}</span>}
                            </div>
                        </div>
                    </div>
                }
            </div>
    )};

export default Image;
