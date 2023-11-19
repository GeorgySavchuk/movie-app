import React, {useEffect, useState} from 'react';
import {fetchFilmById, fetchNewMovies} from "../../API/myApi";
import "react-multi-carousel/lib/styles.css";
import classes from './NewMovies.module.css'
import {RotatingLines} from "react-loader-spinner";
import MyCarousel from "../UI/MyCarousel/MyCarousel";
import Pagination from 'react-bootstrap/Pagination';
import {ClipLoader} from "react-spinners";
import MovieSlider from "../UI/MovieSlider/MovieSlider";
const NewMovies = ({type, currentPage}) => {
    let [listOfMovies, setListOfMovies] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    const fetchNewMoviesById = async newMovies => {
        let fetchedMovies = []
        for(let i = 0; i < newMovies.length; ++i) {
            const fetchedMovie = await fetchFilmById(newMovies[i].id)
            fetchedMovies.push(fetchedMovie)
        }
        return fetchedMovies
    }
    useEffect(() => {
        fetchNewMovies(type)
            .then(data => {
                setListOfMovies(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                setIsLoading(false)
            })

    }, [])
    return (
        <div className={classes.newMovies}>
            {isLoading ?
                <div style={{textAlign: 'center'}}>
                    <ClipLoader
                        color="#49c5b6"
                        size={75}
                    />
                </div>
                : <MovieSlider movies={listOfMovies} isPropsFromMoviePage={false}/>
            }
        </div>

    );
};

export default NewMovies;