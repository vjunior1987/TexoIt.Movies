import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import YearsWithMultipleWinners from '../YearsWithMultipleWinners';
import TopThreeStudios from '../TopThreeStudios';
import WinIntervals from '../WinIntervals';
import WinnersByYear from '../WinnersByYear';

export function Dashboard() {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <YearsWithMultipleWinners />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={12} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TopThreeStudios />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12} md={12} lg={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <WinIntervals />
                    </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12} md={12} lg={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <WinnersByYear />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}