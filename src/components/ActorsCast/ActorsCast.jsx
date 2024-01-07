import React, {useRef, useState} from 'react';
import classes from './ActorsCast.module.css';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {fetchActorById} from "../../API/myApi";
const ActorsCast = ({actors}) => {
    const navigate = useNavigate()
    const handleImageClick = async (actor) => {
        window.scroll(0, 0)
        const actorInfo = await fetchActorById(actor.id)
        localStorage.setItem(`${actor.name}`, JSON.stringify(actorInfo))
        const encodedName = encodeURIComponent(actor.name)
        navigate(`/${encodedName}`);
    }
    return (
        <div style={{position: "relative", width: "100%", height: '100%'}}>
            <div className={classes.actorsCastSlider}>
                {actors.map(actor =>
                        actor.enProfession === "actor" &&
                        <div className={classes.actorItem} key={actor.name} onClick={() => handleImageClick(actor)}>
                            <div className={classes.actorInfo}>
                                <div className={classes.actorPhoto}>
                                    <img src={actor.photo} loading={"lazy"} draggable={false}/>
                                </div>
                                <div className={classes.actorName}>
                                    <span>{actor.name}</span>
                                </div>
                                <div className={classes.profession}>
                                    <span>{actor.description}</span>
                                </div>
                            </div>
                        </div>
                )}
            </div>
        </div>
    );
};

export default ActorsCast;