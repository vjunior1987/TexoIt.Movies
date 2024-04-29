export type movie = {
    id: number,
    year: number,
    title: string,
    winner: boolean
}

export type year = {
    year: number,
    winnerCount: number
  }
  
export type yearsWithMultipleWinners = {
    years: year[]
  }
  
export type winnerByYear = { id: number, year: number, title: string }

export type IntervalWithWins = {
    producer: string,
    interval: number,
    previousWin: number,
    followingWin: number
}

export type maxMinIntervalsWithWins = {
    max: IntervalWithWins[],
    min: IntervalWithWins[]
}


export type studio = {
    name: string,
    winCount: number
}

export type studiosWithWinCount = {
    studios: studio[]
}
