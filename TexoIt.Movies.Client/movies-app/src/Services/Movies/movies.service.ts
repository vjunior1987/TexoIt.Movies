import http from '../../http-common';

class MoviesDataService {
    getAllMovies = async (page: number, pageSize: number, year?: string, winner?: string) => await http.get(`?page=${page}&size=${pageSize}${year ?? ''}${winner ?? ''}`)

    getYearsWithMultipleWinners = async () => await http.get('?projection=years-with-multiple-winners')

    getStudiosWithWinCount = async () => await http.get('?projection=studios-with-win-count')

    getMaxMinWinIntervalForProducers = async () => await http.get('?projection=max-min-win-interval-for-producers')

    getWinnersByYear = async (year: string) => await http.get(`?winner=true&year=${year}`)
}

export default new MoviesDataService();