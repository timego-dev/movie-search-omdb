import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie } from '../types/movie'
import { OMDB_API_KEY, OMDB_URL } from '../constants'

interface IQuery {
    searchText: string,
    page?: number
}

interface IGetMoviesResponseFromUrl {
    Response: string,
    Search: any[],
    totalResults: string
}

interface IGetMoviesResponse {
    items: IMovie[],
    total: number
}


export const movieApis = createApi({
    reducerPath: 'movieQuery',
    baseQuery: fetchBaseQuery({ baseUrl: `${OMDB_URL}` }),
    endpoints: (builder) => ({
        getMovies: builder.query<IGetMoviesResponse, IQuery>({
            query: ({ searchText = "", page = 1 }) => `?s=${searchText}&page=${page}&type=movie&apikey=${OMDB_API_KEY}`,
            transformResponse: (response: IGetMoviesResponseFromUrl) => ({
                items: response.Search,
                total: Number(response.totalResults)
            })
        }),
        getMovieById: builder.query<IMovie, string>({
            query: (id) => `?i=${id}&apikey=${OMDB_API_KEY}`,
        })
    }),
})


export const { useGetMoviesQuery, useGetMovieByIdQuery } = movieApis