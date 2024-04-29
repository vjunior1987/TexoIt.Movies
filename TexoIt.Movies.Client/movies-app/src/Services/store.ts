import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../Reducers/Slices/moviesSlice';

const reducer: any = {
    movies: moviesReducer
}

export const setupStore = (preloadedState: any) => configureStore({
    reducer: reducer,
    preloadedState
})

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;