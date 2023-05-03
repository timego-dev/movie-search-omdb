import { createAsyncThunk } from "@reduxjs/toolkit"
import instance from "../libs/agent"
import { OMDB_API_KEY, OMDB_URL } from "../constants"
import { get } from "lodash"
import { IMovie } from "../types/movie"

interface IFetchMoviesQuery {
    searchText: string,
    page?: number
}

export const fetchMovies = createAsyncThunk('movie/fetchMovie', async (params: IFetchMoviesQuery) => {
    const response = await instance.get(`${OMDB_URL}?s=${params.searchText}&page=${params.page}&type=movie&apikey=${OMDB_API_KEY}`)
    return {
        items: get(response, 'data.Search', []),
        total: Number(get(response, 'data.totalResults', 0))
    }
})

export const fetchMovieById = createAsyncThunk("movie/fetchMovieById", async (id: string) => {
    const response = await instance.get(`${OMDB_URL}?i=${id}&apikey=${OMDB_API_KEY}`)
    return response.data as unknown as IMovie
})