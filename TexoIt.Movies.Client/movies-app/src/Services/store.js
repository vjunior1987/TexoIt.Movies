import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../Reducers/MoviesSlice';

const reducer = {
    movies: moviesReducer
}

export const setupStore = (preloadedState) => configureStore({
    reducer: reducer,
    preloadedState
})

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;