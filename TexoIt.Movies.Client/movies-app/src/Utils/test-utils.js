import http from '../http-common';
import MockAdapter from 'axios-mock-adapter';
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../Services/store'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

const getAllMoviesResponse = {
  totalPages: 5,
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
};

const getAllMoviesByYearResponse = {
  totalPages: 1,
  content: [
    {
      id: 2,
      year: 1998,
      title: 'title by year 1',
      studios: ['studio 1', 'studio 2'],
      producers: ['producer 1', 'producer 2'],
      winner: false,
    }
  ]
};

const getAllMoviesByWinnerResponse = {
  totalPages: 1,
  content: [
    {
      id: 1,
      year: 1992,
      title: 'title by winner 1',
      studios: ['studio 1', 'studio 2'],
      producers: ['producer 1', 'producer 2'],
      winner: true,
    }
  ]
};

const getYearsWithMultipleWinnersResponse = {
  years: [
    {
      year: 9999,
      winnerCount: 99
    },
    {
      year: 9998,
      winnerCount: 98
    }
  ]
};

const getStudiosWithWinCountResponse = {
  studios: [
    {
      name: "Studio Name 1",
      winCount: 9
    },
    {
      name: "Studio Name 2",
      winCount: 9
    },
    {
      name: "Studio Name 3",
      winCount: 9
    },
    {
      name: "Studio Name 4",
      winCount: 9
    }
  ]
};

const getmaxMinWinIntervalForProducersResponse = {
  min: [
    {
      producer: "Producer Name 1",
      interval: 9,
      previousWin: 2018,
      followingWin: 2019
    }
  ],
  max: [
    {
      producer: "Producer Name 2",
      interval: 99,
      previousWin: 1900,
      followingWin: 1999
    }
  ]
}

const getWinnersByYearResponse = [{
  id: 1,
  year: 1992,
  title: 'title 1',
  studios: ['studio 1', 'studio 2'],
  producers: ['producer 1', 'producer 2'],
  winner: true,
}]
// Adding mock network response that is used in tests

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(http);

  mock.onGet(`?page=0&size=2`).reply(200, getAllMoviesResponse);
  mock.onGet(`?page=0&size=2&year=1998`).reply(200, getAllMoviesByYearResponse);
  mock.onGet(`?page=0&size=2&winner=true`).reply(200, getAllMoviesByWinnerResponse);
  mock.onGet(`?projection=years-with-multiple-winners`).reply(200, getYearsWithMultipleWinnersResponse);
  mock.onGet(`?projection=studios-with-win-count`).reply(200, getStudiosWithWinCountResponse);
  mock.onGet(`?projection=max-min-win-interval-for-producers`).reply(200, getmaxMinWinIntervalForProducersResponse);
  mock.onGet(`?winner=true&year=1992`).reply(200, getWinnersByYearResponse);
};

export {
  mockNetWorkResponse,
  getAllMoviesResponse,
  getYearsWithMultipleWinnersResponse,
  getStudiosWithWinCountResponse,
  getmaxMinWinIntervalForProducersResponse,
  getWinnersByYearResponse,
  getAllMoviesByYearResponse,
  getAllMoviesByWinnerResponse
};