import React, {useRef, useState} from 'react';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import MovieCard from "../MovieCard/MovieCard";
import classes from './MovieSlider.module.css'
const MovieSlider = ({movies, setImageProps, isPropsFromMoviePage}) => {
    const slider = useRef()
    const newMovie = useRef(0)
    const leftArrow = useRef()
    const rightArrow = useRef()
    const [delta, setDelta] = useState(0)
    const handleNextClick = () => {
        slider.current.scrollLeft += newMovie.current.getBoundingClientRect().width + 15;
        setDelta(delta + 1)
    };

    const handlePrevClick = () => {
        slider.current.scrollLeft -= newMovie.current.getBoundingClientRect().width + 15;
        setDelta(delta - 1)
    };
    const showArrows = index => {
        const currentSliderWidth = slider.current.getBoundingClientRect().width;
        if(index % (Math.round(currentSliderWidth / (newMovie.current.getBoundingClientRect().width + 15)) + delta) !== delta
            && index % (Math.round(currentSliderWidth / (newMovie.current.getBoundingClientRect().width + 15)) + delta) !== Math.round(currentSliderWidth / (newMovie.current.getBoundingClientRect().width + 15)) - 1 + delta)
        {
            leftArrow.current.style.opacity = '1';
            rightArrow.current.style.opacity = '1';
        }
    }
    const hideArrows = () => {
        leftArrow.current.style.opacity = '0';
        rightArrow.current.style.opacity = '0';
    }
    const hoverLeftArrow = () => {
        leftArrow.current.style.opacity = '1';
    }
    const hoverRightArrow = () => {
        rightArrow.current.style.opacity = '1'
    }
    return (
        <>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <div className={classes.similarMoviesLeftArrowContainer} onClick={handlePrevClick} ref={leftArrow} onMouseEnter={hoverLeftArrow} onMouseLeave={hideArrows}>
                    <FaChevronLeft className={classes.similarMoviesLeftArrow}/>
                </div>
                <div className={classes.similarMoviesSlider} ref={slider}>
                    {movies.map((movie, index) =>
                        <div className={classes.similarMovie} ref={newMovie} key={movie.name} onMouseEnter={() => showArrows(index)} onMouseLeave={hideArrows}>
                            <MovieCard name={movie.name} src={movie.poster.url} rating={movie.rating} type={movie.type}
                                       year={movie.year} movieLength={movie.movieLength}
                                       key={`${movie.name}:${movie.id}:${movie.year}`} width={'100%'} height={'100%'} id={movie.id}
                                       alt={movie.name} backdrop={movie.backdrop} genres={movie.genres}
                                       shortDescription={movie.shortDescription} countries={movie.countries}
                                       budget={movie.budget} fees={movie.fees} similarMovies={movie.similarMovies}
                                       ageRating={movie.ageRating} videos={movie.videos}
                                       description={movie.description} persons={movie.persons} slogan={movie.slogan}
                                       seasonsInfo={movie.seasonsInfo} premiere={movie.premiere} logo={movie.logo}
                                       setImageProps={setImageProps} isPropsFromMoviePage={isPropsFromMoviePage} player={movie.watchability}
                            />
                        </div>
                    )}
                </div>
                <div className={classes.similarMoviesRightArrowContainer} onClick={handleNextClick} ref={rightArrow} onMouseEnter={hoverRightArrow} onMouseLeave={hideArrows}>
                    <FaChevronRight className={classes.similarMoviesRightArrow}/>
                </div>
            </div>
        </>
    );
};

export default MovieSlider;