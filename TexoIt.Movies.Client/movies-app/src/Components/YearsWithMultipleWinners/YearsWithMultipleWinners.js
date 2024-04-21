
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { getYearsWithMultipleWinners } from '../../Reducers/MoviesSlice';


// Generate Order Data
function createData(year, winnerCount) {
  return { year, winnerCount };
}

export default function YearsWithMultipleWinners() {
  const yearsWithMultipleWinners = useSelector((state) => state.movies.yearsWithMultipleWinners);
  const dispatch = useDispatch();
  
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    dispatch(getYearsWithMultipleWinners());
  }, []);

  React.useEffect(() => {
    setRows((yearsWithMultipleWinners.years ?? []).map((year) => createData(year.year, year.winnerCount)));
  }, [yearsWithMultipleWinners]);


  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        List years with multiple winners
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Win Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.year}>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.winnerCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}