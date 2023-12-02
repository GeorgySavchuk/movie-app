import React, {useEffect, useState} from 'react';
import {fetchMovieById, fetchNewMovies} from "../../API/myApi";
import "react-multi-carousel/lib/styles.css";
import classes from './NewMovies.module.css'
import {ClipLoader} from "react-spinners";
import MovieSlider from "../UI/MovieSlider/MovieSlider";
import {Oval, TailSpin} from "react-loader-spinner";
const NewMovies = ({type, currentPage}) => {
    let [listOfMovies, setListOfMovies] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    const fetchNewMoviesById = async newMovies => {
        let fetchedMovies = []
        for(let i = 0; i < newMovies.length; ++i) {
            const fetchedMovie = await fetchMovieById(newMovies[i].id)
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
                    <Oval
                        height={55}
                        width={55}
                        color="#49c5b6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="rgba(86,92,103,.24)"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>
                : <MovieSlider movies={listOfMovies} isPropsFromMoviePage={false}/>
            }
        </div>

    );
};

export default NewMovies;