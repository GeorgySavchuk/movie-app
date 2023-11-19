import React from 'react';

const HeroSlideItem = props => {
    const item = props.item;
    const background = item.backdrop.url;
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.name}</h2>
                    <div className="overview">{item.description}</div>
                    <div className="btns">
                        <button className="movie__btn1" onClick={() => props.handleMovieClick(item)}>
                            <span>Подробнее</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlideItem;