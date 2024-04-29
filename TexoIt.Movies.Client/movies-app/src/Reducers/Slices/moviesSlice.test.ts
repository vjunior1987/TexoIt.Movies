// Arrange
import reducer, {
    initialState,
    getAllMovies,
    getYearsWithMultipleWinners,
    getStudiosWithWinCount,
    getMaxMinWinIntervalForProducers,
    getWinnersByYear,
} from './moviesSlice';
import * as testUtils from '../../Utils/test-utils';
import store from '../../Services/store';

test("Should return initial state", () => {
    expect(
        reducer(undefined, {
            type: '',
        })
    ).toEqual(initialState);
});

describe("List all movies", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should be able to fetch the movies list", async () => {
        // Act
        const result = await store.dispatch(getAllMovies({ page: 0, pageSize: 2  }));
        const movies = result.payload;
        const state = store.getState();

        // Arrange
        expect(result.type).toBe("movies/getAll/fulfilled");
        expect(movies).toEqual(testUtils.getAllMoviesResponse);
        expect(state.movies.moviesList).toEqual(testUtils.getAllMoviesResponse);
    });

    it("should receive error when fetch fails", async () => {
        // Act
        const result = await store.dispatch(getAllMovies({ page: 0, pageSize: -1 })) as any;
        const err = result.error;
        const state = store.getState();

        // Arrange
        expect(result.type).toBe("movies/getAll/rejected");
        expect(err.message).toEqual(testUtils.getBadRequestResponse.message);
        expect(state.movies.error.name).toEqual(testUtils.getBadRequestResponse.name);
    });
});

describe("List all years with multiple winners mocked", () => {
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should be able to fetch a list of years with multiple winners", async () => {
        // Act
        const result = await store.dispatch(getYearsWithMultipleWinners());
        const yearsWithMultipleWinners = result.payload;
        const state = store.getState();

        // Assert
        expect(result.type).toBe("movies/getYearsWithMultipleWinners/fulfilled");
        expect(yearsWithMultipleWinners).toEqual(testUtils.getYearsWithMultipleWinnersResponse);
        expect(state.movies.yearsWithMultipleWinners).toEqual(testUtils.getYearsWithMultipleWinnersResponse);
    });
});

describe("List all years with multiple winners", () => {
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should be able to fetch a list of years with multiple winners", async () => {
        // Act
        const result = await store.dispatch(getYearsWithMultipleWinners());
        const yearsWithMultipleWinners = result.payload;
        const state = store.getState();

        // Assert
        expect(result.type).toBe("movies/getYearsWithMultipleWinners/fulfilled");
        expect(yearsWithMultipleWinners).toEqual(testUtils.getYearsWithMultipleWinnersResponse);
        expect(state.movies.yearsWithMultipleWinners).toEqual(testUtils.getYearsWithMultipleWinnersResponse);
    });
});

describe("List all studios with most wins", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should be able to fetch a list of studios with multiple winners", async () => {
        // Act
        const result = await store.dispatch(getStudiosWithWinCount());
        const studiosWithWinCount = result.payload;
        const state = store.getState();

        // Assert
        expect(result.type).toBe("movies/getStudiosWithWinCount/fulfilled");
        expect(studiosWithWinCount).toEqual(testUtils.getStudiosWithWinCountResponse);
        expect(state.movies.studiosWithWinCount).toEqual(testUtils.getStudiosWithWinCountResponse);
    });
});

describe("List max min intervals between producers wins", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should be able to fetch the lists with shortest and largest gaps between producers winning", async () => {
        // Act
        const result = await store.dispatch(getMaxMinWinIntervalForProducers());
        const maxMinIntervalsWithWins = result.payload;
        const state = store.getState();

        // Assert
        expect(result.type).toBe("movies/getMaxMinWinIntervalForProducers/fulfilled");
        expect(maxMinIntervalsWithWins).toEqual(testUtils.getmaxMinWinIntervalForProducersResponse);
        expect(state.movies.maxMinIntervalsWithWins).toEqual(testUtils.getmaxMinWinIntervalForProducersResponse);
    });
});

describe("List winners by year", () => {
    // Arrange
    beforeAll(() => {
        testUtils.mockNetWorkResponse();
    });

    it("should be able to fetch the lists of winners by year", async () => {
        // Act
        const result = await store.dispatch(getWinnersByYear('1992'));
        const winnersByYear = result.payload;
        const state = store.getState();

        // Assert
        expect(result.type).toBe("movies/getWinnersByYear/fulfilled");
        expect(winnersByYear).toEqual(testUtils.getWinnersByYearResponse);
        expect(state.movies.winnersByYear).toEqual(testUtils.getWinnersByYearResponse);
    });
});