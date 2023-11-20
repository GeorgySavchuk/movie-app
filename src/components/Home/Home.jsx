import React, {useEffect, useState} from 'react';
import NewMovies from "../NewMovies/NewMovies";
import classes from "./Home.module.css"
import Pagination from "react-bootstrap/Pagination";
import HeroSlide from "../hero-slide/HeroSlide";
import Footer from "../Footer/Footer";
import Modal from "../UI/Modal/Modal";
import {useProps} from "../../Context/useProps";
import {useNavigate} from "react-router-dom";
import {heroSlideItems} from "../../hero-slide__items";

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentTrailerItem, setCurrentTrailerItem] = useState(heroSlideItems[0])
    let navigate = useNavigate()
    const openModal = movie => {
        if (movie.videos.trailers.length) {
            setCurrentTrailerItem(movie)
            setIsModalVisible(!isModalVisible)
        } else {
            setIsModalVisible(false)
        }
    }
    const handleMovieClick = movie => {
        localStorage.setItem(`${movie.name}`, JSON.stringify({
            ...movie,
            src: movie.poster.url,
            alt: movie.name
        }))
        const encodedName = encodeURIComponent(movie.name)
        navigate(`/movie-app/movies/${encodedName}`);
    };
    useEffect(() => {
        document.title = `Мир Кино | Главная`
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <HeroSlide openModal={openModal} handleMovieClick={handleMovieClick}/>
            <div className={classes.home}>
                <h1 className={classes.title}>Новые фильмы</h1>
                <NewMovies type={'movie'}/>
                <h1 className={classes.title}>Новые сериалы</h1>
                <NewMovies type={'tv-series'}/>
            </div>
            <Footer/>
        </>
    );
};

export default Home;