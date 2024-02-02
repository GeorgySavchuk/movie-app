import React, {useEffect, useState} from 'react';
import {getSerials} from "../../API/mirkinoService";
import classes from "./Serials.module.css"
import MovieCard from "../UI/MovieCard/MovieCard";
import {PulseLoader} from "react-spinners";
import Filters from "../UI/Filters/Filters";
import {Oval} from "react-loader-spinner";
const Serials = () => {
    const [listOfSerials, setListOfSerials] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentHeader, setCurrentHeader] = useState("Сериалы")
    const [currentYear, setCurrentYear] = useState("1874-2024")
    const [currentGenre, setCurrentGenre] = useState("Все")
    const [currentRating, setCurrentRating] = useState("1-10")
    const [sortType, setSortType] = useState("Рекомендуемые")
    const [isMobile, setIsMobile] = useState(false)
    const [isMobileFiltersConfirmed, setIsMobileFiltersConfirmed] = useState(false)
    const [isMobileLoad, setIsMobileLoad] = useState(false)
    useEffect(() => {
        document.title = `Мир Кино | Сериалы`
        window.scroll(0, 0)
    }, [])
    useEffect(() => {
        let isNeedToFetch = isMobile && (isMobileFiltersConfirmed || isMobileLoad) || !isMobile
        if(isNeedToFetch) {
            setIsLoading(true)
            getSerials(sortType, currentGenre, currentRating, currentYear, currentPage + 1)
                .then(data => {
                    if (currentPage === 0) setListOfSerials([...data])
                    else setListOfSerials([...listOfSerials, ...data])
                })
                .catch(err => {
                    console.log(err.message)
                })
                .finally(() => {
                    setIsLoading(false)
                    if(isMobileFiltersConfirmed) setIsMobileFiltersConfirmed(false)
                    if(isMobileLoad) setIsMobileLoad(false)
                })
        }
    }, [currentPage, currentYear, currentRating, sortType, currentGenre, isMobile, isMobileFiltersConfirmed]);
    const appendGenreToHeader = (genre) => {
        if(genre === "Все") {
            if(currentYear === "1874-2024") {
                setCurrentHeader("Сериалы")
            } else {
                setCurrentHeader(`Сериалы: ${currentYear}`)
            }
        } else {
            if(currentYear === "1874-2024") {
                setCurrentHeader(`Сериалы: ${genre}`)
            } else {
                setCurrentHeader(`Сериалы: ${genre}, ${currentYear}`)
            }
        }
    }
    const appendYearToHeader = (year) => {
        if(year === "Все годы") {
            if(currentGenre === "Все") {
                setCurrentHeader("Сериалы")
            } else {
                setCurrentHeader(`Сериалы: ${currentGenre}`)
            }
        } else {
            if(currentGenre === "Все") {
                setCurrentHeader(`Сериалы: ${year}`)
            } else {
                setCurrentHeader(`Сериалы: ${currentGenre}, ${year}`)
            }
        }
    }
    return (
        <div className={classes.container}>
            <h1 style={{color: 'white', marginBottom: '2px'}}>{currentHeader}</h1>
            <Filters appendGenreToHeader={appendGenreToHeader} appendYearToHeader={appendYearToHeader} setCurrentYear={setCurrentYear}
                     setCurrentPage={setCurrentPage} setGenre={setCurrentGenre} setRating={setCurrentRating} setSortType={setSortType}
                     setMobile={setIsMobile} setMobileFiltersConfirmed={setIsMobileFiltersConfirmed} isMobileFiltersConfirmed={isMobileFiltersConfirmed}
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
                        listOfSerials.length === 0
                            ? <div style={{textAlign: 'center', height: '100vh'}}>
                                <span style={{fontSize: '25px'}}>По заданными фильтрам ничего не нашлось</span>
                            </div>
                            : <>
                                <div className={classes.serials}>
                                    {listOfSerials.map(serial =>
                                        <MovieCard key={`${serial.name}:${serial.id}:${serial.year}`} id={serial.id} type={serial.type}
                                                   movieLength={serial.movieLength} year={serial.year} name={serial.name}
                                                   src={serial.poster.url} rating={serial.rating} width={'100%'} height={'100%'}
                                                   alt={serial.name} backdrop={serial.backdrop} genres={serial.genres} shortDescription={serial.shortDescription} countries={serial.countries}
                                                   budget={serial.budget} fees={serial.fees} similarMovies={serial.similarMovies} ageRating={serial.ageRating} videos={serial.videos}
                                                   description={serial.description} persons={serial.persons} seasonsInfo={serial.seasonsInfo} slogan={serial.slogan} premiere={serial.premiere}
                                                   logo={serial.logo} isPropsFromMoviePage={false} player={serial.watchability}
                                        />
                                    )}
                                </div>
                                {listOfSerials.length >= 36 && <div className={classes.loadNextMoviesBtn}>
                                    <button onClick={() => {
                                        if (isMobile) setIsMobileLoad(true)
                                        setCurrentPage(currentPage + 1)
                                    }}>
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

export default Serials;