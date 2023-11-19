import React, {useEffect, useState} from 'react';
import SearchItem from "../SearchItem/SearchItem";
import classes from "./SearchMovieList.module.css"
const SearchMovieList = ({searchedMovies, input, handleSubmit, isModal}) => {
    const [searchList] = useState(searchedMovies.map(movie =>
        (movie.poster !== null || movie.name !== null  || movie.backdrop !== null) && movie.name.includes(input) && <SearchItem searchedMovie={movie} handleSubmit={handleSubmit} key={`${movie.name}:${movie.id}:${movie.year}`}/>)
    )
    return (
        <div className={classes.searchMovieList}>
            {
                searchList.length === 0
                    ? <div style={{height: isModal ? '30px' : '415px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', bottom: '10px'}}>
                        <span style={{color: '#ffffff', fontSize: '20px'}}>Ничего не найдено</span>
                    </div>
                    : searchedMovies.map(movie =>
                        movie.poster != null && <SearchItem searchedMovie={movie} handleSubmit={handleSubmit} key={`${movie.name}:${movie.id}:${movie.year}`} isModal={isModal}/>)
            }
        </div>
    );
};

export default SearchMovieList;