import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MyCarousel.css";
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import NewMovieCard from "../NewMovieCard/NewMovieCard";

let slidesToShow = 5;
const PreviousBtn = (props) => {
    const {className, onClick, currentSlide} = props;
    return (
        <>
            {currentSlide !== 0 && (
                <div className={className} onClick={onClick}>
                    <ArrowBackIos style={{color: '#49c5b6', fontSize: '30px'}}/>
                </div>
            )}
        </>
    );
};
const NextBtn = (props) => {
    const {className, onClick, slideCount, currentSlide} = props;
    return (
        <>
            {currentSlide !== slideCount - slidesToShow && (
                <div className={className} onClick={onClick}>
                    <ArrowForwardIos style={{color: '#49c5b6', fontSize: '30px'}}/>
                </div>
            )}
        </>
    );
};

function MyCarousel({listOfMovies, setImageProps, isPropsFromMoviePage}) {
    const settings = {
        infinite: false,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextBtn/>,
        prevArrow: <PreviousBtn/>,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='carousel'>
            <Slider {...settings}>
                {listOfMovies.map((movie) =>
                    <NewMovieCard name={movie.name} src={movie.poster.url} rating={movie.rating} type={movie.type}
                                  year={movie.year} movieLength={movie.movieLength}
                                  key={`${movie.name}:${movie.id}:${movie.year}`} width={254} height={381} id={movie.id}
                                  alt={movie.name} backdrop={movie.backdrop} genres={movie.genres}
                                  shortDescription={movie.shortDescription} countries={movie.countries}
                                  budget={movie.budget} fees={movie.fees} similarMovies={movie.similarMovies}
                                  ageRating={movie.ageRating} videos={movie.videos}
                                  description={movie.description} persons={movie.persons} slogan={movie.slogan}
                                  seasonsInfo={movie.seasonsInfo} premiere={movie.premiere} logo={movie.logo}
                                  setImageProps={setImageProps} isPropsFromMoviePage={isPropsFromMoviePage}
                    />
                )}
            </Slider>
        </div>
    );
}

export default MyCarousel;