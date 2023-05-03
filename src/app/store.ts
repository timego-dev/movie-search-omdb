import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieReducer from './slices/movie.slice'

export const store = configureStore({
  reducer: {
    movie: movieReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
