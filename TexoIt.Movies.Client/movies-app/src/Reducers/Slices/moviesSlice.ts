import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieDataService from '../../Services/Movies/movies.service';

type getAllMoviesArgs = {
    page: number,
    pageSize: number,
    year?: string,
    winner?: string
}

export type moviesState = {
    error: {},
    moviesList: {},
    yearsWithMultipleWinners: {},
    studiosWithWinCount: {},
    
    maxMinIntervalsWithWins: {},
    winnersByYear: [],
}
export const getAllMovies = createAsyncThunk('movies/getAll', async (args: getAllMoviesArgs) => {
    if (args?.year && args.year !== '') {
        args.year = `&year=${args.year}`;
    }
    if (args?.winner && args.winner !== '') {
        args.winner = args.winner === 'Yes' ? '&winner=true' : '&winner=false'
    }
    const response = await movieDataService.getAllMovies(args.page, args.pageSize, args.year, args.winner);
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

export const getWinnersByYear = createAsyncThunk('movies/getWinnersByYear', async (year: string) => {
    const response = await movieDataService.getWinnersByYear(year);
    return response.data;
});

export const initialState = {
    error: {},
    moviesList: {},
    yearsWithMultipleWinners: {},
    studiosWithWinCount: {},
    maxMinIntervalsWithWins: {},
    winnersByYear: [],
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {
        resetError: (state) => {
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMovies.fulfilled, (state, action) => {
            state.moviesList = action.payload;
        });
        builder.addCase(getAllMovies.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(getYearsWithMultipleWinners.fulfilled, (state, action) => {
            state.yearsWithMultipleWinners = action.payload;
        });
        builder.addCase(getYearsWithMultipleWinners.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(getStudiosWithWinCount.fulfilled, (state, action) => {
            state.studiosWithWinCount = action.payload;
        });
        builder.addCase(getStudiosWithWinCount.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(getMaxMinWinIntervalForProducers.fulfilled, (state, action) => {
            state.maxMinIntervalsWithWins = action.payload;
        });
        builder.addCase(getMaxMinWinIntervalForProducers.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(getWinnersByYear.fulfilled, (state, action) => {
            state.winnersByYear = [...action.payload] as Array<never>;
        });
        builder.addCase(getWinnersByYear.rejected, (state, action) => {
            state.error = action.error;
        });
    }
})

export const { resetError } = moviesSlice.actions;
export default moviesSlice.reducer