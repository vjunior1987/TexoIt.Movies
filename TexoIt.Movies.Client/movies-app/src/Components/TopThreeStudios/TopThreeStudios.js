
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { getStudiosWithWinCount } from '../../Reducers/MoviesSlice';

// Generate Order Data
function createData(name, winCount) {
    return { name, winCount };
}

export default function TopThreeStudios() {
    const studiosWithWinCont = useSelector((state) => state.movies.studiosWithWinCont);
    const dispatch = useDispatch();

    const [rows, setRows] = React.useState([]);
    
    React.useEffect(() => {
        dispatch(getStudiosWithWinCount());
    }, [])

    React.useEffect(() => {
        setRows((studiosWithWinCont.studios ?? []).slice(0, 3).map((studio) => createData(studio.name, studio.winCount) ));
    }, [studiosWithWinCont])
    
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Top three studios with winners
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Win Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.winCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}