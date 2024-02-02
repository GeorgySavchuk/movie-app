import React, {useEffect, useState} from 'react';
import classes from "./SearchItem.module.css"
import {getMovieById} from "../../API/mirkinoService";
const SearchItem = ({searchedMovie, handleSubmit, isModal}) => {
    let [dataProps, setDataProps] = useState({})
    useEffect(() => {
        getMovieById(searchedMovie.id)
            .then(data => setDataProps({...data}))
            .catch(err => console.log(err.message))
    }, []);
    return (
        <div className={classes.searchedMovies} onClick={() => handleSubmit(dataProps)}>
            <img src={searchedMovie.poster.previewUrl} alt={searchedMovie.name} width={50} height={75} style={{borderRadius: '10px'}} loading="lazy"/>
            <div className={classes.movieInfo}>
                <h4>{searchedMovie.name}</h4>
                <span>{searchedMovie.year}</span>
            </div>
        </div>
    );
};

export default SearchItem;