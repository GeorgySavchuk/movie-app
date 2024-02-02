import React, {useEffect, useState} from 'react';
import classes from './Input.module.css'
import {FaSearch} from "react-icons/fa";
import {useDebounce} from "../../../hooks/useDebounce";
import {getMovieByName} from "../../../API/mirkinoService";
import SearchMovieList from "../../SearchMoviesList/SearchMovieList";
import {useNavigate} from "react-router-dom";
import {useImageProps} from "../../../Context/useImageProps";
import {Oval} from "react-loader-spinner";
const Input = (props) => {
    let [input, setInput] = useState('')
    const debouncedSearch = useDebounce(input)
    let [searchedMovies, setSearchedMovies] = useState([])
    let [isVisible, setIsVisible] = useState('hidden')
    let [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const {currentProps} = useImageProps()
    useEffect(() => {
        setIsLoading(true)
        setSearchedMovies([]);
    }, [input]);
    useEffect(() => {
        setIsLoading(true)
        if(debouncedSearch !== '') {
            getMovieByName(debouncedSearch)
                .then(data => {
                    setSearchedMovies([...data])
                })
                .catch(err => {
                    console.log(err.message)
                })
                .finally(() => setIsLoading(false))
        }
    }, [debouncedSearch])
    const handleInput = (e) => {
        setInput(e.target.value)
        if (/\S/.test(e.target.value)) {
            setIsVisible('visible')
        } else {
            setIsVisible('hidden')
        }
    }
    const closeModal = () => {
        if(props.isModal) props.closeModal()
    }
    const handleSubmit = (props) => {
        setIsVisible('hidden')
        localStorage.setItem(`${props.name}`, JSON.stringify({
            ...props,
            src: props.poster.url ?? props.poster
        }))
        if(currentProps.hasOwnProperty("isPropsFromMoviePage")) currentProps.setImageProps(JSON.parse(localStorage.getItem(`${props.name}`)))
        const encodedName = encodeURIComponent(props.name)
        navigate(`/movies/${encodedName}`);
        setInput('')
        closeModal()
    }
    const clearInput = () => {
        setIsVisible('hidden')
        setInput('')
    }
    return (
        <>
            <div className={classes.inputWrapper}>
                <div className={classes.container}>
                    <label htmlFor="input" className={classes.inputLabel}><FaSearch id="search-icon" className={classes.searchIcon}/></label>
                    <input autoComplete="off" type="text" id="input" className={classes.myInput} value={input} onChange={handleInput} style={{color: props.isModal ? '#141414' : undefined}} placeholder={props.placeholder}/>
                    <div className={classes.clearBtn} style={{opacity: isVisible === 'visible' ? 1 : 0, color: props.isModal ? '#141414' : undefined}} onClick={clearInput}>
                        <svg viewBox="0 0 32 32" enableBackground="new 0 0 32 32"><path d="M10 23a1 1 0 0 1-.707-1.707l12-12a1 1 0 1 1 1.414 1.414l-12 12A.997.997 0 0 1 10 23z" fill="#49c5b6" className="fill-000000" style={{width: '100%', height: '100%'}}></path><path d="M22 23a.997.997 0 0 1-.707-.293l-12-12a1 1 0 1 1 1.414-1.414l12 12A1 1 0 0 1 22 23z" fill="#49c5b6" className="fill-000000"></path></svg>
                    </div>
                </div>
            </div>
            <div className={classes.searchList} style={{visibility: isVisible, background: props.isModal && 'transparent', height: props.isModal && `${window.screen.height - 235}px`}}>
                {
                    isLoading || debouncedSearch === '' || input !== debouncedSearch
                        ? <div style={{alignSelf: 'center', margin: '0 auto'}}>
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
                        : <SearchMovieList input={input} searchedMovies={searchedMovies} handleSubmit={handleSubmit} isModal={props.isModal}/>
                }
            </div>
        </>
    );
};

export default Input;