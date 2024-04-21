import React from 'react'
import { screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import TopThreeStudios from './TopThreeStudios'
import * as testUtils from '../../Utils/test-utils';
import store from '../../Services/store';

describe("render studios", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should fetch and receive top three studios when opening the page", async () => {
        // Act
        testUtils.renderWithProviders(<Provider store={store}><TopThreeStudios /></Provider>)
        
        // Assert
        expect(await screen.findByText(/Top three studios with winners/i)).toBeInTheDocument()
        expect(await screen.findByText(/Studio Name 1/i)).toBeInTheDocument()
        expect(await screen.findByText(/Studio Name 2/i)).toBeInTheDocument()
        expect(await screen.findByText(/Studio Name 3/i)).toBeInTheDocument()
        expect(screen.queryByText(/Studio Name 4/i)).not.toBeInTheDocument()
    });
});