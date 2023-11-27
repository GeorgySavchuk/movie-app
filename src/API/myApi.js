import {KinopoiskDev} from "@openmoviedb/kinopoiskdev_client";
import {getCurrentYear} from "../utils/getCurrentYear";
import {genres} from "../genres/genres";
import axios from "axios";

const X_API_TOKEN="AG8E0HT-4QR49GW-QGXA4B8-TEKWJ5R"
const kp = new KinopoiskDev(X_API_TOKEN)
export const fetchNewMovies = async(type) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'poster', 'year', 'movieLength', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies', 'ageRating', 'videos', 'description', 'persons',
            'seasonsInfo', 'slogan', 'premiere', 'logo', 'watchability', 'premiere'
        ],
        year: getCurrentYear(),
        page: 1,
        limit: 30,
        type,
        'rating.kp': '7-10',
        'backdrop.url': '!null',
        'poster.url': '!null',
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}
export const fetchFilms = async(sortType, rating = "1-10",year = "1860-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies', 'ageRating', 'videos', 'description', 'persons','slogan', 'premiere', 'logo', 'watchability'],
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
export const fetchFilmsByGenre = async(sortType, genre, rating = "1-10",year = "1860-2024",page = 1) => {
    const query = {
        selectFields: ['id', 'name', 'rating', 'year', 'movieLength', 'poster', 'type',
            'backdrop', 'genres', 'shortDescription', 'countries', 'budget', 'fees', 'similarMovies', 'ageRating', 'videos', 'description', 'persons','slogan', 'premiere', 'logo', 'watchability'],
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
export const fetchSerialsByGenre = async(sortType, genre,rating = "1-10",year = "1860-2024",page = 1) => {
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
        'genres.name': genre.toLowerCase(),
        'rating.kp': rating,
        'sortField': sortType === "По рейтингу" ? 'rating.kp' : sortType === "По году выпуска" ? 'year' : '',
        'sortType': sortType === "По рейтингу" ? -1 : sortType === "По году выпуска" ? -1 : 0,
    }
    const {data} = await kp.movie.getByFilters(query)
    return data.docs
}
export const fetchFilmById = async(id) => {
    const {data} = await kp.movie.getById(id)
    return data
}
export const fetchFilmByName = async(name) => {
    const {data} = await kp.movie.getBySearchQuery({query: name, limit: 20});
    return data.docs
}
