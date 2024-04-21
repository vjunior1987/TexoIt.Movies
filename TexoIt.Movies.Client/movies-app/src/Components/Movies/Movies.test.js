import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/test-utils'
import { Movies } from './Movies'
import moviesDataService from '../../Services/Movies/Movies.service';

const content = [
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

const mockMovieDataService = jest.spyOn(moviesDataService, 'getAllMovies');
mockMovieDataService.mockResolvedValue({
    totalPages: 1,
    content: content
})

test('fetches & receives movies when opening the page', async () => {
    renderWithProviders(<Movies />, {
        preloadedState: {
            movies: {
                moviesList: content
            }
        }
    })
    expect(await screen.findByText(/Movies/i)).toBeInTheDocument()
    // expect(await screen.findByText(/title 1/i)).toBeInTheDocument()
    // expect(await screen.findByText(/title 2/i)).toBeInTheDocument()
})