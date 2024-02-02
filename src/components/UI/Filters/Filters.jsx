import React, {useEffect, useState} from 'react';
import classes from "./Filters.module.css"
import {genres} from "../../../genres/genres";
import button from "../Button/Button";
const Filters = ({appendGenreToHeader, appendYearToHeader, setCurrentYear, setCurrentPage, setGenre, setRating, setSortType, setMobile, setMobileFiltersConfirmed, isMobileFiltersConfirmed}) => {
    const [isGenresSelectorsVisible, setIsGenresSelectorsVisible] = useState(false)
    const [isRatingsSelectorsVisible, setIsRatingsSelectorsVisible] = useState(false)
    const [isYearsReleaseSelectorsVisible, setIsYearsReleaseSelectorsVisible] = useState(false)
    const [isSortSelectorsVisible, setIsSortSelectorsVisible] = useState(false)
    const [currentGenre, setCurrentGenre] = useState("Все")
    const [currentRating, setCurrentRating] = useState("Любой рейтинг")
    const [currentYearsRelease, setCurrentYearsRelease] = useState("Все годы")
    const [currentSort, setCurrentSort] = useState('Рекомендуемые')
    const [ratingsList] = useState([
        "Любой рейтинг",
        "Больше 9",
        "Больше 8",
        "Больше 7",
        "Больше 6",
        "Больше 5",
        "Больше 4",
    ])
    const [yearsReleaseList] = useState([
        "Все годы",
        "2023-2024",
        "2021-2022",
        "2019-2020",
        "2017-2018",
        "2010-2016",
        "2000-2009",
        "1990-1999",
        "1980-1989",
        "1974-1979",
    ])
    const [sortList] = useState([
        "Рекомендуемые",
        "По рейтингу",
        "По году выпуска",
    ])
    const [isMobileFilters, setIsMobileFilters] = useState(false)
    useEffect(() => {
        if(window.innerWidth <= 768) {
            setMobile(true)
            if (isMobileFilters) {
                document.body.style.overflowY = 'hidden'
            } else {
                document.body.style.overflowY = 'auto'
                setIsMobileFilters(false)
            }
        } else {
            setMobile(false)
        }
    });
    const handleGenresFilterClick = () => {
        setIsRatingsSelectorsVisible(false)
        setIsYearsReleaseSelectorsVisible(false)
        setIsSortSelectorsVisible(false)
        setIsGenresSelectorsVisible(!isGenresSelectorsVisible)
    }
    const handleRatingsFilterClick = () => {
        setIsGenresSelectorsVisible(false)
        setIsYearsReleaseSelectorsVisible(false)
        setIsSortSelectorsVisible(false)
        setIsRatingsSelectorsVisible(!isRatingsSelectorsVisible)
    }
    const handleYearsReleaseFilterClick = () => {
        setIsGenresSelectorsVisible(false)
        setIsRatingsSelectorsVisible(false)
        setIsSortSelectorsVisible(false)
        setIsYearsReleaseSelectorsVisible(!isYearsReleaseSelectorsVisible)
    }
    const handleSortFilterClick = () => {
        setIsGenresSelectorsVisible(false)
        setIsRatingsSelectorsVisible(false)
        setIsYearsReleaseSelectorsVisible(false)
        setIsSortSelectorsVisible(!isSortSelectorsVisible)
    }
    const handleGenreChange = (genre, isConfirmed = false) => {
        setCurrentGenre(genre)
        setIsGenresSelectorsVisible(false)
        setCurrentPage(0)
        setGenre(genre)
        if(isMobileFilters) {
            if(isConfirmed) {
                appendGenreToHeader(genre)
            }
        } else {
            appendGenreToHeader(genre)
        }
    }
    const handleRatingChange = rating => {
        setCurrentRating(rating)
        setIsRatingsSelectorsVisible(false)
        setCurrentPage(0)
        rating === "Любой рейтинг"
            ? setRating("1-10")
            : setRating(`${rating.charAt(rating.length - 1)}-10`)
    }
    const handleYearsReleaseChange = (yearsRelease, isConfirmed = false) => {
        setCurrentYearsRelease(yearsRelease)
        setIsYearsReleaseSelectorsVisible(false)
        setCurrentPage(0)
        if(yearsRelease === "Все годы") {
            setCurrentYear("1874-2024")
        } else {
            setCurrentYear(yearsRelease)
        }
        if(isMobileFilters) {
            if (isConfirmed) {
                appendYearToHeader(yearsRelease)
            }
        } else {
            appendYearToHeader(yearsRelease)
        }
    }
    const handleSortChange = (sort) => {
        setCurrentSort(sort)
        setIsSortSelectorsVisible(false)
        setCurrentPage(0)
        setSortType(sort)
    }
    return (
        <>
            <div className={`${classes.filtersContainer} ${isMobileFilters ? classes.modal : ''}`}>
                {isMobileFilters && <h1 className={classes.title}>Фильтры</h1>}
                {isMobileFilters && <div className={classes.exit} onClick={() => {
                    setIsMobileFilters(!isMobileFilters)
                    setMobileFiltersConfirmed(false)
                }}>
                    <svg data-name="Capa 1" viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg"><path d="m10.17 10 3.89-3.89a.37.37 0 1 0-.53-.53L9.64 9.43 5.75 5.54a.37.37 0 1 0-.53.53L9.11 10l-3.89 3.85a.37.37 0 0 0 0 .53.34.34 0 0 0 .26.11.36.36 0 0 0 .27-.11l3.89-3.89 3.89 3.89a.34.34 0 0 0 .26.11.35.35 0 0 0 .27-.11.37.37 0 0 0 0-.53Z" fill="#49c5b6" className="fill-000000"></path></svg>
                </div>}
                <div className={classes.filters} >
                    {isMobileFilters && <span></span>}
                    <div className={classes.genresSelect} onClick={handleGenresFilterClick}>
                        {isMobileFilters && <span>Жанры</span>}
                        <div className={classes.select}>
                            {
                                isMobileFilters
                                    ? <span>{currentGenre}</span>
                                    : <span>{currentGenre === "Все" ? "Жанры" : currentGenre}</span>
                            }
                            <svg className={classes.icon} style={{transform: isGenresSelectorsVisible ? !isMobileFilters ? 'rotate(180deg)' : 'rotate(0deg)' : ''}} width="16" height="8" viewBox="0 0 16 8"><path d="M14.37.27a.97.97 0 011.35 0 .9.9 0 010 1.31L9.35 7.46c-.75.72-1.95.72-2.7 0L.28 1.58a.9.9 0 010-1.3.97.97 0 011.35 0L8 6.14 14.37.27z" fill="hsla(0,0%,100%,.6)" fillRule="nonzero"></path></svg>
                        </div>
                        <ul className={classes.menu} style={{maxHeight: isGenresSelectorsVisible && '290px'}}>
                            {genres.map((genre, index) =>
                                <li className={currentGenre === genre.name ? classes.active : ''} key={index} onClick={() => handleGenreChange(genre.name)}>{genre.name}</li>
                            )}
                        </ul>
                    </div>
                    {isMobileFilters && <span></span>}
                    <div className={classes.ratingSelect}>
                        {isMobileFilters && <span>Рейтинг</span>}
                        <div className={classes.select} onClick={handleRatingsFilterClick}>
                            {
                                isMobileFilters
                                    ? <span>{currentRating}</span>
                                    : <span>{currentRating === "Любой рейтинг" ? "Рейтинг" : currentRating}</span>
                            }
                            <svg className={classes.icon} style={{transform: isRatingsSelectorsVisible ? !isMobileFilters ? 'rotate(180deg)' : 'rotate(0deg)' : ''}} width="16" height="8" viewBox="0 0 16 8"><path d="M14.37.27a.97.97 0 011.35 0 .9.9 0 010 1.31L9.35 7.46c-.75.72-1.95.72-2.7 0L.28 1.58a.9.9 0 010-1.3.97.97 0 011.35 0L8 6.14 14.37.27z" fill="hsla(0,0%,100%,.6)" fillRule="nonzero"></path></svg>
                        </div>
                        <ul className={classes.menu} style={{maxHeight: isRatingsSelectorsVisible && '290px'}}>
                            {ratingsList.map((rating, index) =>
                                <li className={currentRating === rating ? classes.active : ''} key={index} onClick={() => handleRatingChange(rating)}>{rating}</li>
                            )}
                        </ul>
                    </div>
                    {isMobileFilters && <span></span>}
                    <div className={classes.yearsReleaseSelect}>
                        {isMobileFilters && <span>Годы выхода</span>}
                        <div className={classes.select} onClick={handleYearsReleaseFilterClick}>
                            {
                                isMobileFilters
                                    ? <span>{currentYearsRelease}</span>
                                    : <span>{currentYearsRelease === "Все годы" ? "Годы выхода" : currentYearsRelease}</span>
                            }
                            <svg className={classes.icon} style={{transform: isYearsReleaseSelectorsVisible ? !isMobileFilters ? 'rotate(180deg)' : 'rotate(0deg)' : ''}} width="16" height="8" viewBox="0 0 16 8"><path d="M14.37.27a.97.97 0 011.35 0 .9.9 0 010 1.31L9.35 7.46c-.75.72-1.95.72-2.7 0L.28 1.58a.9.9 0 010-1.3.97.97 0 011.35 0L8 6.14 14.37.27z" fill="hsla(0,0%,100%,.6)" fillRule="nonzero"></path></svg>
                        </div>
                        <ul className={classes.menu} style={{maxHeight: isYearsReleaseSelectorsVisible && '290px'}}>
                            {yearsReleaseList.map((yearsRelease, index) =>
                                <li className={currentYearsRelease === yearsRelease ? classes.active : ''} key={index} onClick={() => handleYearsReleaseChange(yearsRelease)}>{yearsRelease}</li>
                            )}
                        </ul>
                    </div>
                    {isMobileFilters && <span></span>}
                    {
                        isMobileFilters && <div className={classes.sortSelect}>
                            {isMobileFilters && <span>Сортировка</span>}
                            <div className={classes.select} onClick={handleSortFilterClick}>
                                <div className={classes.selectIconAndSortName}>
                                    <span>{currentSort}</span>
                                </div>
                                <svg className={classes.icon} style={{transform: isSortSelectorsVisible ? !isMobileFilters ? 'rotate(180deg)' : 'rotate(0deg)' : ''}} width="16" height="8" viewBox="0 0 16 8"><path d="M14.37.27a.97.97 0 011.35 0 .9.9 0 010 1.31L9.35 7.46c-.75.72-1.95.72-2.7 0L.28 1.58a.9.9 0 010-1.3.97.97 0 011.35 0L8 6.14 14.37.27z" fill="hsla(0,0%,100%,.6)" fillRule="nonzero"></path></svg>
                            </div>
                            <ul className={classes.menu} style={{maxHeight: isSortSelectorsVisible && '290px'}}>
                                {sortList.map((sort, index) =>
                                    <li className={currentSort === sort ? classes.active : ''} key={index} onClick={() => handleSortChange(sort)}>{sort}</li>
                                )}
                            </ul>
                        </div>
                    }
                    {isMobileFilters && <span></span>}
                    {isMobileFilters && <button onClick={() => {
                        setMobileFiltersConfirmed(true)
                        setIsMobileFilters(!isMobileFilters)
                        handleGenreChange(currentGenre, true)
                        handleYearsReleaseChange(currentYearsRelease, true)
                    }}>Показать результаты</button>}
                </div>
                <div className={classes.sort}>
                    {isMobileFilters && <span></span>}
                    <div className={classes.sortSelect}>
                        {isMobileFilters && <span>Сортировка</span>}
                        <div className={classes.select} onClick={handleSortFilterClick}>
                            <div className={classes.selectIconAndSortName}>
                                <span className={classes.selectIconContainer}>
                                    <svg fill="none" viewBox="0 0 24 24" className={classes.icon}><path d="M2 5.995c0-.55.446-.995.995-.995h8.01a.995.995 0 0 1 0 1.99h-8.01A.995.995 0 0 1 2 5.995ZM2 12c0-.55.446-.995.995-.995h18.01a.995.995 0 1 1 0 1.99H2.995A.995.995 0 0 1 2 12ZM2.995 17.01a.995.995 0 0 0 0 1.99h12.01a.995.995 0 0 0 0-1.99H2.995Z" fill="hsla(0,0%,100%,.6)" className="fill-000000"></path></svg>
                                </span>
                                <span>{currentSort}</span>
                            </div>
                            <svg className={classes.icon} style={{transform: isSortSelectorsVisible && !isMobileFilters && 'rotate(180deg)'}} width="16" height="8" viewBox="0 0 16 8"><path d="M14.37.27a.97.97 0 011.35 0 .9.9 0 010 1.31L9.35 7.46c-.75.72-1.95.72-2.7 0L.28 1.58a.9.9 0 010-1.3.97.97 0 011.35 0L8 6.14 14.37.27z" fill="hsla(0,0%,100%,.6)" fillRule="nonzero"></path></svg>
                        </div>
                        <ul className={classes.menu} style={{maxHeight: isSortSelectorsVisible && '290px'}}>
                            {sortList.map((sort, index) =>
                                <li className={currentSort === sort ? classes.active : ''} key={index} onClick={() => handleSortChange(sort)}>{sort}</li>
                            )}
                        </ul>
                    </div>
                    {isMobileFilters && <span></span>}
                </div>
            </div>
            <div className={classes.mobileAndTabletFilterContainer} onClick={() => {
                setIsMobileFilters(!isMobileFilters)
            }}>
                <svg><g data-name="Layer 2"><path d="M28 9H11a1 1 0 0 1 0-2h17a1 1 0 0 1 0 2ZM7 9H4a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2ZM21 17H4a1 1 0 0 1 0-2h17a1 1 0 0 1 0 2ZM11 25H4a1 1 0 0 1 0-2h7a1 1 0 0 1 0 2Z" fill="#ffffff" className="fill-000000"></path><path d="M9 11a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1ZM23 19a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1ZM13 27a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z" fill="#ffffff" className="fill-000000"></path><path d="M28 17h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2ZM28 25H15a1 1 0 0 1 0-2h13a1 1 0 0 1 0 2Z" fill="#ffffff" className="fill-000000"></path></g><path d="M0 0h32v32H0z" fill="none"></path></svg>
            </div>
        </>
    );
};

export default Filters;