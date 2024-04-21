import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieDataService from './Movies.service';

export const getAllMovies = createAsyncThunk('movies/getAll', async ({ page, pageSize, year, winner }) => {
    if (year && year !== '') {
        year = `&year=${year}`;
    }
    if (winner && winner !== '') {
        winner = winner === 'Yes' ? '&winner=true' : '&winner=false'
    }
    const response = await movieDataService.getAllMovies(page, pageSize, year, winner);
    return response.data;
});

export const getYearsWithMultipleWinners = createAsyncThunk('movies/getYearsWithMultipleWinners', async () => {
    const response = await movieDataService.getYearsWithMultipleWinners();
    return response.data;
});

export const getStudiosWithWinCount = createAsyncThunk('movies/getStudiosWithWinCount', async () => {
    const response = await movieDataService.getStudiosWithWinCount();
    return response.data;
});


export const getMaxMinWinIntervalForProducers = createAsyncThunk('movies/getMaxMinWinIntervalForProducers', async () => {
    const response = await movieDataService.getMaxMinWinIntervalForProducers();
    return response.data;
});

export const getWinnersByYear = createAsyncThunk('movies/getWinnersByYear', async (year) => {
    const response = await movieDataService.getWinnersByYear(year);
    return response.data;
});


export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesList: {},
        yearsWithMultipleWinners: {},
        studiosWithWinCont: {},
        maxMinIntervalsWithWins: {},
        winnersByYear: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMovies.fulfilled, (state, action) => {
            state.moviesList = action.payload;
        });
        builder.addCase(getYearsWithMultipleWinners.fulfilled, (state, action) => {
            state.yearsWithMultipleWinners = action.payload;
        });
        builder.addCase(getStudiosWithWinCount.fulfilled, (state, action) => {
            state.studiosWithWinCont = action.payload;
        });
        builder.addCase(getMaxMinWinIntervalForProducers.fulfilled, (state, action) => {
            state.maxMinIntervalsWithWins = action.payload;
        });
        builder.addCase(getWinnersByYear.fulfilled, (state, action) => {
            state.winnersByYear = [...action.payload];
        });
    }
})

export default moviesSlice.reducer