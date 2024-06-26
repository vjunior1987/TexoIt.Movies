
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { getMaxMinWinIntervalForProducers } from '../../Reducers/Slices/moviesSlice';
import { maxMinIntervalsWithWins, IntervalWithWins } from '../../Utils/customDataTypes';

function createData(producer: string, interval: number, previousWin: number, followingWin: number): IntervalWithWins {
    return { producer, interval, previousWin, followingWin };
}

export default function WinIntervals() {
    const maxMinIntervalsWithWins = useSelector((state: any) => state.movies.maxMinIntervalsWithWins) as maxMinIntervalsWithWins;
    const dispatch = useDispatch();

    const [rowsMax, setRowsMax] = React.useState(Array<IntervalWithWins>);
    const [rowsMin, setRowsMin] = React.useState(Array<IntervalWithWins>);

    React.useEffect(() => {
        dispatch(getMaxMinWinIntervalForProducers() as any);
    }, []);

    React.useEffect(() => {
        setRowsMax((maxMinIntervalsWithWins?.max ?? []).map((producer) => createData(producer.producer, producer.interval, producer.previousWin, producer.followingWin)));
        setRowsMin((maxMinIntervalsWithWins?.min ?? []).map((producer) => createData(producer.producer, producer.interval, producer.previousWin, producer.followingWin)))
    }, [maxMinIntervalsWithWins]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Producers with shortest and largest interval between wins
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <b>
                Maximum
            </b>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Producer</TableCell>
                        <TableCell>Interval</TableCell>
                        <TableCell>Previous year</TableCell>
                        <TableCell>Current year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsMax.map((row) => (
                        <TableRow key={row.producer}>
                            <TableCell>{row.producer}</TableCell>
                            <TableCell>{row.interval}</TableCell>
                            <TableCell>{row.previousWin}</TableCell>
                            <TableCell>{row.followingWin}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Divider sx={{ mb: 2 }} />
            <b>
                Minimum
            </b>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Producer</TableCell>
                        <TableCell>Interval</TableCell>
                        <TableCell>Previous year</TableCell>
                        <TableCell>Current year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsMin.map((row) => (
                        <TableRow key={row.producer}>
                            <TableCell>{row.producer}</TableCell>
                            <TableCell>{row.interval}</TableCell>
                            <TableCell>{row.previousWin}</TableCell>
                            <TableCell>{row.followingWin}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}