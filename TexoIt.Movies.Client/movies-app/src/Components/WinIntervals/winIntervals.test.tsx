import React from 'react'
import { screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import WinIntervals from './WinIntervals'
import * as testUtils from '../../Utils/test-utils';
import store from '../../Services/store';

describe("render win intervals", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should fetch and receive a list with the longest and the shortest intervals between producers wins", async () => {
        // Act
        testUtils.renderWithProviders(<Provider store={store}><WinIntervals /></Provider>)

        // Assert
        expect(await screen.findByText(/Producers with shortest and largest interval between wins/i)).toBeInTheDocument()
        expect(await screen.findByText(/Minimum/i)).toBeInTheDocument()
        expect(await screen.findByText(/Maximum/i)).toBeInTheDocument()
        expect(await screen.findByText(/Producer Name 1/i)).toBeInTheDocument()
        expect(await screen.findByText(/Producer Name 2/i)).toBeInTheDocument()
    });
});