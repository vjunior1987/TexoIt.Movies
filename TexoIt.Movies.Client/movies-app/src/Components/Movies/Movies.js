import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMovies } from '../../Services/Movies/MoviesSlice';
import { debounce } from '@mui/material';

export function Movies() {
    const moviesList = useSelector((state) => state.movies.moviesList);
    const dispatch = useDispatch();

    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [year, setYear] = React.useState('');
    const [winner, setWinner] = React.useState('');
    const [pageCount, setPageSize] = React.useState(0);

    React.useEffect(() => {
        dispatch(getAllMovies({ page: page - 1, pageSize: 12, year, winner }));
    }, [dispatch, page]);

    React.useEffect(() => {
        dispatch(getAllMovies({ page: page - 1, pageSize: 12, year, winner }));
    }, [year, winner])

    React.useEffect(() => {
        setPageSize(moviesList.totalPages);
        setRows((moviesList.content ?? []).map((movie) => ({ id: movie.id, year: movie.year, title: movie.title, winner: movie.winner })));
    }, [moviesList]);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Movies
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pb: 5.8 }}>ID</TableCell>
                                    <TableCell>Year
                                        <TextField fullWidth placeholder='Search by year'
                                            size='small' type='number' onChange={debounce((event) => setYear(event.target.value), 1000)} />
                                    </TableCell>
                                    <TableCell sx={{ pb: 5.8 }}>Title</TableCell>
                                    <TableCell>Winner
                                        <br />
                                        <Select size='small' type='boolean' onChange={(event) => setWinner(event.target.value)}>
                                            <MenuItem>N/A</MenuItem>
                                            <MenuItem value={'Yes'}>Yes</MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.year}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.winner ? "Yes" : "No"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Stack spacing={2}>
                            <Pagination color='primary' count={pageCount} onChange={(event, page) => setPage(page)} />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}