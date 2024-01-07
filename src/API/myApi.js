import {KinopoiskDev} from "@openmoviedb/kinopoiskdev_client";
import {getCurrentYear} from "../utils/getCurrentYear";
import {genres} from "../genres/genres";
const kp = new KinopoiskDev(process.env.REACT_APP_X_API_TOKEN)
console.log(process.env.REACT_APP_X_API_TOKEN)
export const fetchNewMovies = async(movieType,sortType, rating = "7-10",year = "2023-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies',
            'ageRating', 'videos', 'description', 'persons','slogan', 'premiere', 'logo', 'watchability'],
        type: movieType,
        page,
        year,
        limit: 36,
        'poster.url': '!null',
        'backdrop.url': '!null',
        'name': '!null',
        'rating.kp': rating,
        'sortField': sortType === "По рейтингу" ? 'rating.kp' : sortType === "По году выпуска" ? 'year' : '',
        'sortType': sortType === "По рейтингу" ? -1 : sortType === "По году выпуска" ? -1 : 0,
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}
export const fetchFilms = async(sortType, rating = "1-10",year = "1860-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies',
            'ageRating', 'videos', 'description', 'persons','slogan', 'premiere', 'logo', 'watchability'],
        type: 'movie',
        page,
        year,
        limit: 36,
        'poster.url': '!null',
        'backdrop.url': '!null',
        'name': '!null',
        'rating.kp': rating,
        'sortField': sortType === "По рейтингу" ? 'rating.kp' : sortType === "По году выпуска" ? 'year' : '',
        'sortType': sortType === "По рейтингу" ? -1 : sortType === "По году выпуска" ? -1 : 0,
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}
export const fetchFilmsByFilters = async(sortType, genre, rating = "1-10",year = "1860-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies',
            'ageRating', 'videos', 'description', 'persons','slogan', 'premiere', 'logo', 'watchability'],
        type: 'movie',
        page,
        year,
        limit: 36,
        'poster.url': '!null',
        'backdrop.url': '!null',
        'name': '!null',
        'genres.name': genre.toLowerCase(),
        'rating.kp': rating,
        'sortField': sortType === "По рейтингу" ? 'rating.kp' : sortType === "По году выпуска" ? 'year' : '',
        'sortType': sortType === "По рейтингу" ? -1 : sortType === "По году выпуска" ? -1 : 0,
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}

export const fetchSerials = async(sortType, rating = "1-10",year = "1860-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies', 'ageRating', 'videos', 'description', 'persons',
            'seasonsInfo', 'slogan', 'premiere', 'logo', 'watchability'
        ],
        type: 'tv-series',
        page,
        year,
        limit: 36,
        'poster.url': '!null',
        'backdrop.url': '!null',
        'name': '!null',
        'rating.kp': rating,
        'sortField': sortType === "По рейтингу" ? 'rating.kp' : sortType === "По году выпуска" ? 'year' : '',
        'sortType': sortType === "По рейтингу" ? -1 : sortType === "По году выпуска" ? -1 : 0,
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}
export const fetchSerialsByFilters = async(sortType, genre,rating = "1-10",year = "1860-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies',
            'ageRating', 'videos', 'description', 'persons',
            'seasonsInfo', 'slogan', 'premiere', 'logo', 'watchability'
        ],
        type: 'tv-series',
        page,
        year,
        limit: 36,
        'poster.url': '!null',
        'backdrop.url': '!null',
        'name': '!null',
        'genres.name': genre.toLowerCase(),
        'rating.kp': rating,
        'sortField': sortType === "По рейтингу" ? 'rating.kp' : sortType === "По году выпуска" ? 'year' : '',
        'sortType': sortType === "По рейтингу" ? -1 : sortType === "По году выпуска" ? -1 : 0,
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}
export const fetchMovieById = async(id) => {
    const {data} = await kp.movie.getById(id)
    return data
}
export const fetchMovieByName = async(name) => {
    const {data} = await kp.movie.getBySearchQuery({query: name, limit: 20});
    return data.docs
}
export const fetchActorById = async(actorID) => {
    const {data} = await kp.person.getById(actorID)
    return data
}