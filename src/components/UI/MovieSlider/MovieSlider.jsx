import React, {useRef} from 'react';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import MovieCard from "../MovieCard/MovieCard";
import classes from './MovieSlider.module.css'
const MovieSlider = ({movies, setImageProps, isPropsFromMoviePage}) => {
    const slider = useRef()
    const newMovie = useRef(0)
    const leftArrow = useRef()
    const rightArrow = useRef()
    const handleNextClick = () => {
        slider.current.scrollLeft += newMovie.current.getBoundingClientRect().width + 15;
    };

    const handlePrevClick = () => {
        slider.current.scrollLeft -= newMovie.current.getBoundingClientRect().width + 15;
    };
    return (
        <>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <div className={classes.similarMoviesLeftArrowContainer} onClick={handlePrevClick} ref={leftArrow}>
                    <FaChevronLeft className={classes.similarMoviesLeftArrow}/>
                </div>
                <div className={classes.similarMoviesSlider} ref={slider}>
                    {movies.map(movie =>
                        <div className={classes.similarMovie} ref={newMovie}>
                            <MovieCard name={movie.name} src={movie.poster.url} rating={movie.rating} type={movie.type}
                                       year={movie.year} movieLength={movie.movieLength}
                                       key={`${movie.name}:${movie.id}:${movie.year}`} width={'100%'} height={'100%'} id={movie.id}
                                       alt={movie.name} backdrop={movie.backdrop} genres={movie.genres}
                                       shortDescription={movie.shortDescription} countries={movie.countries}
                                       budget={movie.budget} fees={movie.fees} similarMovies={movie.similarMovies}
                                       ageRating={movie.ageRating} videos={movie.videos}
                                       description={movie.description} persons={movie.persons} slogan={movie.slogan}
                                       seasonsInfo={movie.seasonsInfo} premiere={movie.premiere} logo={movie.logo}
                                       setImageProps={setImageProps} isPropsFromMoviePage={isPropsFromMoviePage}
                            />
                        </div>
                    )}
                </div>
                <div className={classes.similarMoviesRightArrowContainer} onClick={handleNextClick} ref={rightArrow}>
                    <FaChevronRight className={classes.similarMoviesRightArrow}/>
                </div>
            </div>
        </>
    );
};

export default MovieSlider;