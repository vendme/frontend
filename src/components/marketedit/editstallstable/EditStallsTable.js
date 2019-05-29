import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CreateIcon from '@material-ui/icons/Create';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(quantity, width, length) {
  id += 1;
  return { id, quantity, width, length };
}

function StallsTable(props) {
  const { classes } = props;
  const data = props.stalls.map(stall => {
    return createData(stall.quantity, stall.width, stall.length)
  })
  console.log(data)
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>QTY</TableCell>
            <TableCell>Width (in)</TableCell>
            <TableCell>Length (in)</TableCell>
            <TableCell>Size (in&sup2;)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(data => (
            <TableRow key={data.id}>
              <TableCell>{data.quantity}</TableCell>
              <TableCell>{data.width}</TableCell>
              <TableCell>{data.length}</TableCell>
              <TableCell>{data.length*data.width}</TableCell>
              <TableCell>
                <IconButton color="primary" className={classes.button} aria-label="Edit Stall">
                  <CreateIcon />
                </IconButton>
                <IconButton color="primary" className={classes.button} aria-label="Remove Stall">
                  <HighlightOffIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

StallsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StallsTable);