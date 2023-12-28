import React, {useEffect, useState} from 'react';
import {
    fetchFilms, fetchFilmsByFilters
} from "../../API/myApi";
import classes from "./Films.module.css"
import MovieCard from "../UI/MovieCard/MovieCard";
import {ClipLoader, PulseLoader} from "react-spinners";
import Filters from "../UI/Filters/Filters";
import {Oval} from "react-loader-spinner";

const Films = () => {
    const [listOfFilms, setListOfFilms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const [currentHeader, setCurrentHeader] = useState('Фильмы')
    const [currentYear, setCurrentYear] = useState('1860-2024')
    const [currentGenre, setCurrentGenre] = useState("Все")
    const [currentRating, setCurrentRating] = useState("1-10")
    const [sortType, setSortType] = useState("Рекомендуемые")
    const [isMobile, setIsMobile] = useState(false)
    const [isMobileFiltersConfirmed, setIsMobileFiltersConfirmed] = useState(false)
    const [isMobileLoad, setIsMobileLoad] = useState(false)
    useEffect(() => {
        document.title = `Мир Кино | Фильмы`
        window.scroll(0, 0)
    }, [])
    useEffect(() => {
        if (isMobile) {
            if (isMobileFiltersConfirmed) {
                setIsLoading(true)
                if (currentGenre === "Все") {
                    fetchFilms(sortType, currentRating, currentYear, currentPage + 1)
                        .then(data => {
                            if (currentPage === 0) setListOfFilms([...data])
                            else setListOfFilms([...listOfFilms, ...data])
                            setIsLoading(false)
                        })
                        .catch(err => {
                            console.log(err.message)
                            setIsLoading(false)
                        })
                        .finally(() => {
                            setIsMobileFiltersConfirmed(false)
                        })
                } else {
                    fetchFilmsByFilters(sortType, currentGenre, currentRating, currentYear, currentPage + 1)
                        .then(data => {
                            if (currentPage === 0) setListOfFilms([...data])
                            else setListOfFilms([...listOfFilms, ...data])
                            setIsLoading(false)
                        })
                        .catch(err => {
                            console.log(err.message)
                            setIsLoading(false)
                        })
                        .finally(() => {
                            setIsMobileFiltersConfirmed(false)
                        })
                }
            } else if(isMobileLoad) {
                setIsLoading(true)
                if (currentGenre === "Все") {
                    fetchFilms(sortType, currentRating, currentYear, currentPage + 1)
                        .then(data => {
                            if (currentPage === 0) setListOfFilms([...data])
                            else setListOfFilms([...listOfFilms, ...data])
                            setIsLoading(false)
                        })
                        .catch(err => {
                            console.log(err.message)
                            setIsLoading(false)
                        })
                        .finally(() => {
                            setIsMobileFiltersConfirmed(false)
                            setIsMobileLoad(false)
                        })
                } else {
                    fetchFilmsByFilters(sortType, currentGenre, currentRating, currentYear, currentPage + 1)
                        .then(data => {
                            if (currentPage === 0) setListOfFilms([...data])
                            else setListOfFilms([...listOfFilms, ...data])
                            setIsLoading(false)
                        })
                        .catch(err => {
                            console.log(err.message)
                            setIsLoading(false)
                        })
                        .finally(() => {
                            setIsMobileFiltersConfirmed(false)
                            setIsMobileLoad(false)
                        })
                }
            }
        } else {
            setIsLoading(true)
            if (currentGenre === "Все") {
                fetchFilms(sortType, currentRating, currentYear, currentPage + 1)
                    .then(data => {
                        if (currentPage === 0) setListOfFilms([...data])
                        else setListOfFilms([...listOfFilms, ...data])
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.log(err.message)
                        setIsLoading(false)
                    })
            } else {
                fetchFilmsByFilters(sortType, currentGenre, currentRating, currentYear, currentPage + 1)
                    .then(data => {
                        if (currentPage === 0) setListOfFilms([...data])
                        else setListOfFilms([...listOfFilms, ...data])
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.log(err.message)
                        setIsLoading(false)
                    })
            }
        }
    }, [currentPage, currentYear, currentRating, sortType, currentGenre, isMobile, isMobileFiltersConfirmed]);
    const appendGenreToHeader = (genre) => {
        if (genre === "Все") {
            if (currentYear === "1860-2024") {
                setCurrentHeader("Фильмы")
            } else {
                setCurrentHeader(`Фильмы: ${currentYear}`)
            }
        } else {
            if (currentYear === "1860-2024") {
                setCurrentHeader(`Фильмы: ${genre}`)
            } else {
                setCurrentHeader(`Фильмы: ${genre}, ${currentYear}`)
            }
        }
    }
    const appendYearToHeader = (year) => {
        if (year === "Все годы") {
            if (currentGenre === "Все") {
                setCurrentHeader("Фильмы")
            } else {
                setCurrentHeader(`Фильмы: ${currentGenre}`)
            }
        } else {
            if (currentGenre === "Все") {
                setCurrentHeader(`Фильмы: ${year}`)
            } else {
                setCurrentHeader(`Фильмы: ${currentGenre}, ${year}`)
            }
        }
    }
    return (
        <div className={classes.container}>
            <h1 style={{color: 'white', marginBottom: '2px'}}>{currentHeader}</h1>
            <Filters appendGenreToHeader={appendGenreToHeader} appendYearToHeader={appendYearToHeader}
                     setCurrentYear={setCurrentYear}
                     setCurrentPage={setCurrentPage} setGenre={setCurrentGenre} setRating={setCurrentRating}
                     setSortType={setSortType}
                     setMobile={setIsMobile} setMobileFiltersConfirmed={setIsMobileFiltersConfirmed}
                     isMobileFiltersConfirmed={isMobileFiltersConfirmed}
            />
            {isLoading && currentPage === 0
                ? <div style={{textAlign: 'center', height: '100vh', marginTop: '30vh', display: 'flex'}}>
                    <div style={{justifySelf: 'center', margin: '0 auto'}}>
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
                </div>
                :
                <>
                    {
                        listOfFilms.length === 0
                            ? <div style={{textAlign: 'center', height: '100vh'}}>
                                <span style={{fontSize: '25px'}}>По заданными фильтрам ничего не нашлось</span>
                            </div>
                            : <>
                                <div className={classes.films}>
                                    {listOfFilms.map(film =>
                                        <MovieCard key={`${film.name}:${film.id}:${film.year}`} id={film.id}
                                                   type={film.type}
                                                   movieLength={film.movieLength} year={film.year} name={film.name}
                                                   src={film.poster.url}
                                                   rating={film.rating} alt={film.name} width={'100%'} height={'100%'}
                                                   backdrop={film.backdrop} genres={film.genres}
                                                   shortDescription={film.shortDescription} countries={film.countries}
                                                   budget={film.budget} fees={film.fees} similarMovies={film.similarMovies}
                                                   ageRating={film.ageRating} videos={film.videos}
                                                   description={film.description} persons={film.persons}
                                                   slogan={film.slogan} premiere={film.premiere} logo={film.logo}
                                                   isPropsFromMoviePage={false} player={film.watchability}
                                        />
                                    )}
                                </div>
                                {listOfFilms.length >= 36 && <div className={classes.loadNextMoviesBtn}>
                                    <button onClick={() => {
                                        if (isMobile) setIsMobileLoad(true)
                                        setCurrentPage(currentPage + 1)
                                    }
                                    }>
                                        {isLoading
                                            ? <PulseLoader
                                                color="hsla(0,0%,100%,.6)"
                                                size={8}
                                            />
                                            : 'Показать больше'
                                        }
                                    </button>
                                </div>}
                            </>
                    }
                </>
            }
        </div>
    );
};

export default Films;