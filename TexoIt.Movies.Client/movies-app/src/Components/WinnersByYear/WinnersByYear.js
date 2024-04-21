
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { getWinnersByYear } from '../../Reducers/MoviesSlice';

// Generate Order Data
function createData(id, year, title) {
    return { id, year, title };
}

export default function WinnersByYear() {
    const winnersByYear = useSelector((state) => state.movies.winnersByYear);
    const dispatch = useDispatch();

    const [rows, setRows] = React.useState([]);
    const [year, setYear] = React.useState('');

    const searchWinnersByYear = () => {
        if (year && year !== '') {
            dispatch(getWinnersByYear(year));
        }
    }

    React.useEffect(() => {
        setRows((winnersByYear ?? []).map((winner) => createData(winner.id, winner.year, winner.title) ));
    }, [winnersByYear]);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                List moviers by year
            </Typography>
            <Divider />
            <Grid container>
                <Grid item xs={9} sm={10} sx={{ padding: 2 }} >
                    <TextField fullWidth placeholder='Search by year' size='small' type='number'
                        onChange={(event) => setYear(event.target.value)} />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        sx={{ mt: 2.2, mb: 2 }}
                        onClick={searchWinnersByYear}
                    ><SearchIcon />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.year}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}