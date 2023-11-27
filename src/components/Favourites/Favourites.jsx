import React, {useEffect, useState} from 'react';
import {useFavourites} from "../../hooks/useFavourites";
import classes from './Favourites.module.css'
import MovieCard from "../UI/MovieCard/MovieCard";
const Favourites = () => {
    const {favouriteMovies} = useFavourites()
    useEffect(() => {
        document.title = `Мир Кино | Избранное`
    }, []);
    return (
        <div className={classes.container}>
            <h1 style={{marginBottom: '20px', fontStyle: '30px'}}>Избранное</h1>
            {!favouriteMovies || favouriteMovies.length === 0 && <div style={{textAlign: 'center'}}>
                <span className={classes.empty}>Список избранного пуст</span>
            </div>}
            <div className={classes.favourites}>
                {
                    favouriteMovies && favouriteMovies.map(favouriteMovie =>
                        <MovieCard key={`${favouriteMovie.name}:${favouriteMovie.id}:${favouriteMovie.year}`} id={favouriteMovie.id} rating={favouriteMovie.rating}
                                   name={favouriteMovie.name} year={favouriteMovie.year}
                                   movieLength={favouriteMovie.movieLength} type={favouriteMovie.type} alt={favouriteMovie.name}
                                   height={'100%'} width={'100%'} src={favouriteMovie.src}
                                   backdrop={favouriteMovie.backdrop} genres={favouriteMovie.genres} shortDescription={favouriteMovie.shortDescription} countries={favouriteMovie.countries}
                                   budget={favouriteMovie.budget} fees={favouriteMovie.fees} similarMovies={favouriteMovie.similarMovies} ageRating={favouriteMovie.ageRating} videos={favouriteMovie.videos}
                                   description={favouriteMovie.description} persons={favouriteMovie.persons} slogan={favouriteMovie.slogan} seasonsInfo={favouriteMovie.seasonsInfo} logo={favouriteMovie.logo}
                                   premiere={favouriteMovie.premiere} isPropsFromMoviePage={false}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Favourites;