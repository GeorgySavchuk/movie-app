import axios from "axios";
export const getNewMovies = async(movieType,sortType, rating = "7-10",year = "2023-2024",page = 1) => {
    const {data} = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?type=${movieType}&page=${page}&year=${year}&limit=${36}&rating.kp=${rating}&${sortType === "По рейтингу" ? "sortField=rating.kp&" : sortType === "По году выпуска" ? "sortField=year&" : ""}${sortType === "По рейтингу" ? "sortType=-1" : sortType === "По году выпуска" ? "sortType=-1" : ""}&selectFields=id&selectFields=name&selectFields=description&selectFields=shortDescription&selectFields=type&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=backdrop&selectFields=logo&selectFields=videos&selectFields=persons&selectFields=similarMovies&notNullFields=poster.url&notNullFields=backdrop.url&token=${process.env.REACT_APP_X_API_TOKEN}`)
    return data.docs
}
export const getFilms = async(sortType, genre, rating = "1-10",year = "1874-2024",page = 1) => {
    const {data} = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?type=movie&page=${page}&year=${year}&limit=${36}&rating.kp=${rating}${genre === 'Все' ? "" : `&genres.name=${genre.toLowerCase()}`}&${sortType === "По рейтингу" ? "sortField=rating.kp&" : sortType === "По году выпуска" ? "sortField=year&" : ""}${sortType === "По рейтингу" ? "sortType=-1" : sortType === "По году выпуска" ? "sortType=-1" : ""}&selectFields=id&selectFields=name&selectFields=description&selectFields=shortDescription&selectFields=type&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=backdrop&selectFields=logo&selectFields=videos&selectFields=persons&selectFields=similarMovies&notNullFields=poster.url&notNullFields=backdrop.url&notNullFields=name&token=${process.env.REACT_APP_X_API_TOKEN}`)
    return data.docs
}
export const getSerials = async(sortType, genre, rating = "1-10",year = "1874-2024",page = 1) => {
    const {data} = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?type=tv-series&page=${page}&year=${year}&limit=${36}&rating.kp=${rating}${genre === 'Все' ? "" : `&genres.name=${genre.toLowerCase()}`}&${sortType === "По рейтингу" ? "sortField=rating.kp&" : sortType === "По году выпуска" ? "sortField=year&" : ""}${sortType === "По рейтингу" ? "sortType=-1" : sortType === "По году выпуска" ? "sortType=-1" : ""}&selectFields=id&selectFields=name&selectFields=description&selectFields=shortDescription&selectFields=type&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=backdrop&selectFields=logo&selectFields=videos&selectFields=persons&selectFields=similarMovies&notNullFields=poster.url&notNullFields=backdrop.url&notNullFields=name&token=${process.env.REACT_APP_X_API_TOKEN}`)
    return data.docs
}
export const getMovieById = async(id) => {
    const {data} = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}?token=${process.env.REACT_APP_X_API_TOKEN}`)
    return data
}
export const getMovieByName = async(name) => {
    const {data} = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=20&query=${name}&token=${process.env.REACT_APP_X_API_TOKEN}`)
    return data.docs
}
export const getActorById = async(actorID) => {
    const {data} = await axios.get(`https://api.kinopoisk.dev/v1.4/person/${actorID}?token=${process.env.REACT_APP_X_API_TOKEN}`)
    return data
}