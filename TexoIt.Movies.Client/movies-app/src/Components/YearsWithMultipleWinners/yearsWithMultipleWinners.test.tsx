import React from 'react'
import { screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import YearsWithMultipleWinners from './YearsWithMultipleWinners'
import * as testUtils from '../../Utils/test-utils';
import store from '../../Services/store';

describe("render years with multiple winners", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should fetch and receive a list with the years where more than one movie has won", async () => {
        // Act
        testUtils.renderWithProviders(<Provider store={store}><YearsWithMultipleWinners /></Provider>)

        // Assert
        expect(await screen.findByText(/List years with multiple winners/i)).toBeInTheDocument()
        expect(await screen.findByText(/9999/i)).toBeInTheDocument()
        expect(await screen.findByText(/9998/i)).toBeInTheDocument()
    });
});