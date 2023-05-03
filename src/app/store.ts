import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { movieApis } from '../services/movies';

export const store = configureStore({
  reducer: {
    [movieApis.reducerPath]: movieApis.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(movieApis.middleware)
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
