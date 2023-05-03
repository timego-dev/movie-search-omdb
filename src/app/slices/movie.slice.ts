import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IMovie } from '../../types/movie'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchMovieById, fetchMovies } from '../../api/movie'



interface MovieState {
    movies: IMovie[]
    currentMovie?: IMovie | null
    currentPage: number
    moviesStatus: 'fetching' | 'success' | 'error',
    currentMovieStatus: 'fetching' | 'success' | 'error'
    total: number
}

const initialState: MovieState = {
    movies: [],
    currentPage: 1,
    moviesStatus: 'success',
    currentMovieStatus: 'success',
    total: 0
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.movies = action.payload
        },
        setCurrentMovie: (state, action: PayloadAction<IMovie | null>) => {
            state.currentMovie = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.moviesStatus = 'fetching'
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.moviesStatus = 'success'
            state.movies = action.payload.items
            state.total = action.payload.total
        })
        builder.addCase(fetchMovieById.pending, (state, action) => {
            state.currentMovieStatus = 'fetching'
        })
        builder.addCase(fetchMovieById.fulfilled, (state, action) => {
            state.currentMovieStatus = 'success'
            state.currentMovie = action.payload
        })
    }
})

export const { setMovies, setCurrentMovie, setPage } = movieSlice.actions

export default movieSlice.reducer