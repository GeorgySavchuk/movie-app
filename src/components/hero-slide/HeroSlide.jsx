import React from 'react';
import SwiperCore, {Autoplay, Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "../hero-slide/HeroSlide.css";
import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"
import HeroSlideItem from "../hero-slide-item/HeroSlideItem";
import {heroSlideItems} from "../../hero-slide__items/index"
const HeroSlide = ({openModal, handleMovieClick}) => {
    SwiperCore.use([Autoplay, Navigation]);
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay, Navigation]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                autoplay={{delay: 7000}}
                speed={2000}
                style={{
                    width: '100vw',
                    height: '750px',
                    zIndex: 0,
                }}
            >
                {
                    heroSlideItems.map((item, i) => (
                        <SwiperSlide key={i} style={{width: '100%', height: '100%'}}>
                            {({isActive}) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} openModal={openModal} handleMovieClick={handleMovieClick}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default HeroSlide;