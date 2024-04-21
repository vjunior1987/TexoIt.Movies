import reducer, { getAllMovies } from './MoviesSlice'
import moviesDataService from './Movies.service';

const mockData = {
    totalPages: 11,
    content: [
        {
            id: 1,
            year: 1992,
            title: 'title 1',
            studios: ['studio 1', 'studio 2'],
            producers: ['producer 1', 'producer 2'],
            winner: true,
        },
        {
            id: 2,
            year: 1993,
            title: 'title 2',
            studios: ['studio 3', 'studio 4'],
            producers: ['producer 3', 'producer 4'],
            winner: false,
        }
    ]
}

const mockMovieDataService = jest.spyOn(moviesDataService, 'getAllMovies');
mockMovieDataService.mockImplementation(() => Promise.resolve({mockData}))

test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ "moviesList": [] })
})

test('should return movie list', () => {
    const previousState = []

    expect(reducer(previousState, getAllMovies())).toEqual({ "moviesList": mockData })
})