import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './ActorPage.module.css'
import {getMovieById} from "../../API/mirkinoService";
import {Oval} from "react-loader-spinner";
import classes from "../Films/Films.module.css";
import MovieCard from "../UI/MovieCard/MovieCard";
import {PulseLoader} from "react-spinners";
const ActorPage = () => {
    const params = useParams()
    const [actor, setActor] = useState(JSON.parse(localStorage.getItem(params.actorName)))
    const [isLoading, setIsLoading] = useState(true)
    const [actorMovies, setActorMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastIndex, setLastIndex] = useState(0)
    const printActorCareer = () => {
        return actor.profession.reduce((acc, prof, index) => {
            return index === 0
                ? acc += prof.value
                : acc += `, ${prof.value}`
        }, '')
    }
    const printDateOfBirth = () => {
        const dateOfBirth = new Date(actor.birthday);
        return dateOfBirth.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    const fetchActorMovies = async(movies) => {
        let fetchedMovies = []
        let total = 0
        for (let i = lastIndex; i < movies.length && total < 36; ++i) {
            const fetchedMovie = await getMovieById(movies[i].id)
            fetchedMovie.poster !== null && fetchedMovie.poster.url !== null && fetchedMovies.push(fetchedMovie)
            fetchedMovie.poster !== null && fetchedMovie.poster.url !== null && total++
            setLastIndex(i + 1)
        }

        return fetchedMovies
    }
    useEffect(() => {
        document.title = `Мир Кино | ${params.actorName}`
        window.scroll(0, 0)
    }, []);
    useEffect(() => {
        setIsLoading(true)
        fetchActorMovies(actor.movies)
            .then(data => {
                if(currentPage === 0) setActorMovies([...data])
                else setActorMovies([...actorMovies, ...data])
                setIsLoading(false)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [currentPage]);
    return (
        <div className={styles.actorPage}>
            <div className={styles.actorInfo}>
                <div className={styles.actorItem} key={actor.name}>
                    <div className={styles.actorPhoto}>
                        <img src={actor.photo} loading={"lazy"} draggable={false}/>
                    </div>
                </div>
                <div className={styles.mainInfoContainer}>
                    <div className={styles.title}>
                        <h1>{actor.name}</h1>
                        <span>{actor.enName}</span>
                    </div>
                    <div className={styles.mainInfo}>
                        <div className={styles.actorCareer}>
                            <span style={{color: "hsla(0,0%,100%,.6)", minWidth: '145px', fontSize: '14px'}}>Карьера: </span>
                            <span style={{color: "hsla(0,0%,100%,.9)", fontSize: '14px'}}>{printActorCareer()}</span>
                        </div>
                        <div className={styles.dateOfBirth}>
                            <span style={{color: "hsla(0,0%,100%,.6)", minWidth: '145px', fontSize: '14px'}}>Дата рождения: </span>
                            <span style={{color: "hsla(0,0%,100%,.9)", fontSize: '14px'}}>{printDateOfBirth()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.actorFilmography}>
                <h1>Фильмография</h1>
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
                            actorMovies.length === 0
                                ? <div>
                                    <span style={{fontSize: '25px'}}>Ничего не нашлось(</span>
                                </div>
                                : <>
                                    <div className={styles.movies}>
                                        {actorMovies.map(movie =>
                                            <MovieCard key={`${movie.name}:${movie.id}:${movie.year}`} id={movie.id} type={movie.type}
                                                       movieLength={movie.movieLength} year={movie.year} name={movie.name}
                                                       src={movie.poster.url} rating={movie.rating} width={'100%'} height={'100%'}
                                                       alt={movie.name} backdrop={movie.backdrop} genres={movie.genres} shortDescription={movie.shortDescription} countries={movie.countries}
                                                       budget={movie.budget} fees={movie.fees} similarMovies={movie.similarMovies} ageRating={movie.ageRating} videos={movie.videos}
                                                       description={movie.description} persons={movie.persons} seasonsInfo={movie.seasonsInfo} slogan={movie.slogan} premiere={movie.premiere}
                                                       logo={movie.logo}
                                            />
                                        )}
                                    </div>
                                    {actorMovies.length >= 36 && <div className={classes.loadNextMoviesBtn}>
                                        <button onClick={() => {
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
        </div>
    );
};

export default ActorPage;