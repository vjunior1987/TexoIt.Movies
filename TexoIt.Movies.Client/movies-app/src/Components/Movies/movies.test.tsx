import React from 'react'
import { screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { Movies } from './Movies'
// Arrange
import { getAllMovies } from '../../Reducers/Slices/moviesSlice';
import * as testUtils from '../../Utils/test-utils';
import store from '../../Services/store';

describe("render movies", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should fetch and receive movies when opening the page", async () => {
        // Act
        await store.dispatch(getAllMovies({ page: 0, pageSize: 2, winner: '', year: '' }));
        testUtils.renderWithProviders(<Provider store={store}><Movies /></Provider>)

        // Assert
        expect(await screen.findByText(/Movies/i)).toBeInTheDocument()
        expect(await screen.findByText(/title 1/i)).toBeInTheDocument()
        expect(await screen.findByText(/title 2/i)).toBeInTheDocument()
    });

    it("should fetch and receive movies when filtering by year", async () => {
        // Act
        await store.dispatch(getAllMovies({ page: 0, pageSize: 2 }));
        testUtils.renderWithProviders(<Provider store={store}><Movies /></Provider>)

        // Assert
        expect(await screen.findByText(/title by year 1/i)).toBeInTheDocument()
    });

    it("should fetch and receive movies when filtering by winner", async () => {
        // Act
        await store.dispatch(getAllMovies({ page: 0, pageSize: 2, winner: 'Yes' }));
        testUtils.renderWithProviders(<Provider store={store}><Movies /></Provider>)

        // Assert
        expect(await screen.findByText(/title by winner 1/i)).toBeInTheDocument()
    });
});