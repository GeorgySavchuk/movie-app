import React, {useEffect, useState} from 'react';
import {getNewMovies} from "../../API/mirkinoService";
import "react-multi-carousel/lib/styles.css";
import classes from './NewMovies.module.css'
import MovieSlider from "../UI/MovieSlider/MovieSlider";
import {Oval, TailSpin} from "react-loader-spinner";
const NewMovies = ({type}) => {
    let [listOfMovies, setListOfMovies] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getNewMovies(type,"Рекомендуемые")
            .then(data => {
                setListOfMovies(data)
            })
            .catch(err => {
                console.log(err.message)
            })
            .finally(() => setIsLoading(false))
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