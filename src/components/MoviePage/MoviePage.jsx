import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import classes from './MoviePage.module.css'
import {minutesToHoursAndMinutes} from "../../utils/minutesToHoursAndMinutes";
import {fetchFilmById} from "../../API/myApi";
import MovieCard from "../UI/MovieCard/MovieCard";
import {useFavourites} from "../../hooks/useFavourites";
import ToastNotification from "../UI/ToastNotification/ToastNotification";
import Modal from "../UI/Modal/Modal";
import {useImageProps} from "../../Context/useImageProps";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import {Oval} from "react-loader-spinner";
const MoviePage = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [imageProps, setImageProps] = useState(JSON.parse(localStorage.getItem(`${decodeURIComponent(window.location.pathname).split('/').slice(3).join('/')}`)))
    const {setCurrentProps} = useImageProps()
    const {isFavourite, toggleFavourite} = useFavourites();
    const [similarMovies, setSimilarMovies] = useState([])
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isArrowsVisible, setIsArrowsVisible] = useState(true)
    const slider = useRef()
    const similarMovie = useRef(0)
    const leftArrow = useRef()
    const rightArrow = useRef()
    const [delta, setDelta] = useState(0)
    const fetchSimilarMovies = async similarMovies => {
        let fetchedMovies = []
        for (let i = 0; i < similarMovies.length; ++i) {
            const fetchedMovie = await fetchFilmById(similarMovies[i].id)
            fetchedMovies.push(fetchedMovie)
        }
        return fetchedMovies
    }
    useEffect(() => {
        document.title = `Мир Кино | ${params.name}`
        window.scroll(0, 0)
    }, [])
    useEffect(() => {
     setImageProps(JSON.parse(localStorage.getItem(`${decodeURIComponent(window.location.pathname).split('/').slice(3).join('/')}`)))
    }, [params.name]);
    useEffect(() => {
        setIsLoading(true)
        setCurrentProps({
            ...imageProps,
            isPropsFromMoviePage: true,
            setImageProps
        })
        fetchSimilarMovies(imageProps.similarMovies)
            .then(data => {
                if(data.length < 4) {
                    setIsArrowsVisible(false)
                } else {
                    setIsArrowsVisible(true)
                }
                setSimilarMovies([...data])
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                setIsLoading(false)
            })
    }, [imageProps])
    const setFavourite = () => {
        toggleFavourite(imageProps)
        window.scroll(0, 0)
        if (!isFavourite(imageProps)) setIsToastVisible(true)
        else setIsToastVisible(false)
    };
    const printCountOfSeasons = (seasonsCount) => {
        if (seasonsCount % 10 === 1) {
            return `${seasonsCount} сезон`
        } else if (seasonsCount % 10 >= 2 && seasonsCount % 10 <= 4) {
            return `${seasonsCount} сезона`
        } else {
            return `${seasonsCount} сезонов`
        }
    }
    const printDirector = (persons) => {
        let director;
        persons.forEach(person => {
            if (person.enProfession === "director") {
                director = person.name
            }
        })
        return director
    }
    const printActors = (persons) => {
        let actors = persons.slice(0, 4);
        return actors.reduce((acc, actor, index) => {
            return index === 0
                ? acc += actor.name
                : acc += `, ${actor.name}`
        }, '')
    }
    const openModal = () => {
        if (imageProps?.videos?.trailers?.length) {
            setIsModalVisible(!isModalVisible)
        } else {
            setIsModalVisible(false)
        }
    }
    const handleNextClick = () => {
        slider.current.scrollLeft += similarMovie.current.getBoundingClientRect().width + 15;
        setDelta(delta + 1)
    };

    const handlePrevClick = () => {
        slider.current.scrollLeft -= similarMovie.current.getBoundingClientRect().width + 15;
        setDelta(delta - 1)
    };
    const showArrows = index => {
        const currentSliderWidth = slider.current.getBoundingClientRect().width;
        if(index % (Math.round(currentSliderWidth / (similarMovie.current.getBoundingClientRect().width + 15)) + delta) !== delta
            && index % (Math.round(currentSliderWidth / (similarMovie.current.getBoundingClientRect().width + 15)) + delta) !== Math.round(currentSliderWidth / (similarMovie.current.getBoundingClientRect().width + 15)) - 1 + delta)
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
            {isLoading
                ? <div style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                : <div className={classes.moviePageContainer} style={{height: '100%', paddingBottom: !similarMovies.length && '20px'}}>
                    <Modal visible={isModalVisible} trailers={imageProps?.videos?.trailers}
                           setVisible={setIsModalVisible}/>
                    <ToastNotification isActive={isToastVisible} onClose={() => setIsToastVisible(false)}
                                       type={imageProps.type === "movie" ? "Фильм" : "Сериал"}/>
                    <div className={classes.backdropContainer}>
                        <div
                            className={classes.imageContainer}>
                            <img src={imageProps.backdrop?.url ? imageProps.backdrop.url : imageProps.backdrop} style={{objectFit: 'cover', width: '100%', height: '100%'}} loading={"eager"} onError={e => e.target.style.display = 'none'}/>
                        </div>
                        <div className={classes.exitBtns}>
                            <div className={classes.exitArrow} onClick={() => navigate("/")}>
                                <p style={{color: '#49c5b6'}}>Главная</p>
                                <svg className={classes.arrowIcon} xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24" width="32" height="32" onClick={() => window.history.back()}>
                                    <path
                                        d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                        fill="rgba(73,197,182,1)"></path>
                                </svg>
                            </div>
                            <div className={classes.exitArrow}
                                 onClick={() => imageProps.type === 'movie' ? navigate("/movie-app/films") : navigate("/movie-app/serials")}>
                                {imageProps.type === 'movie'
                                    ? <>
                                        <p style={{color: '#49c5b6'}}>Фильмы</p>
                                        <svg className={classes.arrowIcon} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24" width="32" height="32"
                                             onClick={() => window.history.back()}>
                                            <path
                                                d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                                fill="rgba(73,197,182,1)"></path>
                                        </svg>
                                    </>
                                    : <>
                                        <p style={{color: '#49c5b6'}}>Сериалы</p>
                                        <svg className={classes.arrowIcon} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24" width="32" height="32"
                                             onClick={() => window.history.back()}>
                                            <path
                                                d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                                fill="rgba(73,197,182,1)"></path>
                                        </svg>
                                    </>
                                }
                            </div>
                            <div className={classes.exitArrow}>
                                <p style={{color: '#49c5b6'}}>{imageProps.name}</p>
                            </div>
                        </div>
                        <div className={classes.infoContainer}>
                            <div className={classes.backdropMovieLogo}>
                                {imageProps.logo?.url
                                    ? <img src={imageProps.logo?.url ? imageProps.logo.url : imageProps.logo} alt="Лого"
                                           className={classes.logo} loading={'eager'}/>
                                    : <span style={{
                                        color: "hsla(0,0%,100%,.9)",
                                        fontSize: "47px",
                                        alignSelf: 'flex-end'
                                    }}>{imageProps.name}</span>
                                }
                            </div>
                            <div className={classes.movieInfo}>
                                <span
                                    className={classes.movieInfoRating}>{imageProps.rating !== null ? imageProps.rating?.kp !== null || true ? imageProps.rating.kp.toFixed(1) : imageProps.rating.toFixed(1) : 6.0}</span>
                                <span
                                    className={classes.movieInfoItem}>{imageProps?.year ? imageProps.year : '2023'}</span>
                                <span
                                    className={classes.movieInfoItem}>{imageProps.genres.length !== 0 ? imageProps.genres[0].name.charAt(0).toUpperCase() + imageProps.genres[0].name.slice(1) : " "}</span>
                                <span
                                    className={classes.movieInfoItem}>{imageProps.ageRating ? `${imageProps.ageRating}+` : "16+"}</span>
                                <span
                                    className={classes.movieInfoItem}>{imageProps.countries.length !== 0 ? imageProps.countries[0].name.charAt(0).toUpperCase() + imageProps.countries[0].name.slice(1) : " "}</span>
                                {imageProps.type === "tv-series"
                                    ? <span
                                        className={classes.movieInfoItem}>{printCountOfSeasons(imageProps.seasonsInfo.length)}</span>
                                    : <span
                                        className={classes.movieInfoItem}>{minutesToHoursAndMinutes(imageProps.movieLength)}</span>

                                }
                            </div>
                            <div className={classes.movieDescription}>
                                <span className={classes.movieDescriptionItem}>{imageProps.description}</span>
                                <span
                                    className={classes.mobileMovieDescriptionItem}>{imageProps.shortDescription ?? imageProps.description.slice(0, imageProps.description.length / 5) + "…"}</span>
                                <div className={classes.director}>
                                    <span className={classes.movieInfoItem}>{"Режиссер: "}</span>
                                    <span
                                        className={classes.movieDirectorItem}>{printDirector(imageProps.persons)}</span>
                                </div>
                                <div className={classes.actors}>
                                    <span className={classes.movieInfoItem}>{"Актеры: "}</span>
                                    <span className={classes.movieActorsItem}>{printActors(imageProps.persons)}</span>
                                </div>
                                <div className={classes.buttons}>
                                    <button
                                        className={classes.movieBtn1}>{`Смотреть ${imageProps.type === "movie" ? "Фильм" : imageProps.type === "tv-series" ? "Сериал" : ""}`}</button>
                                    <button className={classes.movieBtn2} onClick={openModal}>{"Трейлер"}</button>
                                    <button className={classes.mobileMovieBtn2} onClick={openModal}>
                                        <svg enableBackground="new 0 0 24 24" version="1.1" viewBox="0 0 24 24"
                                             fill="#ffffff">
                                            <g id="info"/>
                                            <g id="icons">
                                                <path
                                                    d="M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z"
                                                    id="play"/>
                                            </g>
                                        </svg>
                                    </button>
                                    <button className={classes.movieBtn3} onClick={setFavourite}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-bookmark"
                                             fill={isFavourite(imageProps) ? "#49c5b6" : "transparent"}
                                             stroke={isFavourite(imageProps) ? "#49c5b6" : "#ffffff"}
                                             strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={"2"}
                                             viewBox="0 0 24 24">
                                            <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {imageProps.similarMovies.length !== 0 &&
                        <div className={classes.similarMovies}>
                            <h1>Похожее</h1>
                            <div className={classes.similarMoviesLeftArrowContainer} onClick={handlePrevClick} style={{display: !isArrowsVisible && 'none'}} ref={leftArrow} onMouseEnter={hoverLeftArrow} onMouseLeave={hideArrows}>
                                <FaChevronLeft className={classes.similarMoviesLeftArrow}/>
                            </div>
                            <div className={classes.similarMoviesSlider} ref={slider}>
                                {similarMovies.map((movie, index) =>
                                    <div className={classes.similarMovie} ref={similarMovie} key={`${movie.name}/${movie.year}`}  onMouseEnter={() => showArrows(index)} onMouseLeave={hideArrows}>
                                        <MovieCard name={movie.name} src={movie.poster.previewUrl} rating={movie.rating}
                                                   type={movie.type}
                                                   year={movie.year} movieLength={movie.movieLength}
                                                   key={`${movie.name}:${movie.id}:${movie.year}`} width={'100%'}
                                                   height={'100%'} id={movie.id}
                                                   alt={movie.name} isMoviePage={imageProps.isMoviePage}
                                                   isFavouritePage={imageProps.isFavouritePage}
                                                   isNewMoviesPage={imageProps.isNewMoviesPage}
                                                   isSerialsPage={imageProps.isSerialsPage}
                                                   backdrop={movie.backdrop} genres={movie.genres}
                                                   shortDescription={movie.shortDescription} countries={movie.countries}
                                                   budget={movie.budget} fees={movie.fees}
                                                   similarMovies={movie.similarMovies} ageRating={movie.ageRating}
                                                   videos={movie.videos}
                                                   description={movie.description} persons={movie.persons}
                                                   slogan={movie.slogan} seasonsInfo={movie.seasonsInfo}
                                                   premiere={movie.premiere} logo={movie.logo}
                                                   setImageProps={setImageProps} isPropsFromMoviePage={true}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={classes.similarMoviesRightArrowContainer} onClick={handleNextClick} style={{display: !isArrowsVisible && 'none'}} ref={rightArrow} onMouseEnter={hoverRightArrow} onMouseLeave={hideArrows}>
                                <FaChevronRight className={classes.similarMoviesRightArrow}/>
                            </div>
                        </div>
                    }
                </div>
            }

        </>
    );
};

export default MoviePage;