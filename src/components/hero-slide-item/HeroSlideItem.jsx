import React, {useEffect, useState} from 'react';

const HeroSlideItem = props => {
    const [isShortDescription, setIsShortDescription] = useState(false)
    const [isTabletVersion, setIsTabletVersion] = useState(false)
    const item = props.item;
    const background = item.backdrop.url;
    useEffect(() => {
        if(window.innerWidth <= 1024) {
            if(window.innerWidth <= 768) {
                setIsTabletVersion(true)
            }
            setIsShortDescription(true)
        } else {
            setIsShortDescription(false)
            setIsTabletVersion(false)
        }
    })
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${props.item.backdrop.url})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{props.item.name}</h2>
                    <div className="overview" style={{display: isTabletVersion && 'none'}}>{isShortDescription ? props.item.description.slice(0, props.item.description.length / 3 - 2) + "…" : props.item.description}</div>
                    <div className="btns">
                        <button className="movie__btn1" onClick={() => props.handleMovieClick(props.item)}>
                            <span>Подробнее</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlideItem;