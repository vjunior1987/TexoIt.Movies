import React from 'react'
import { screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import WinnersByYear from './WinnersByYear'
// Arrange
import { getWinnersByYear } from '../../Reducers/Slices/moviesSlice';
import * as testUtils from '../../Utils/test-utils';
import store from '../../Services/store';

describe("render winners by year", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should fetch and receive a list of years filtered by informed year", async () => {
        // Act
        await store.dispatch(getWinnersByYear('1992'));
        testUtils.renderWithProviders(<Provider store={store}><WinnersByYear /></Provider>)
        expect(await screen.findByText(/List movie winners by year/i)).toBeInTheDocument()
    });
});