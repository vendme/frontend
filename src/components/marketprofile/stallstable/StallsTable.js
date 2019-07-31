import React, { useState } from 'react'
import PropTypes from 'prop-types'
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'
import StripeModule from '../stripe/StripeModule'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  cell: {
    padding: '0.5rem 2vw',
    '&:nth-of-type(1)': {
      paddingLeft: '30px'
    }
  }
})

let id = 0
function createData(stall_name, width, length) {
  id += 1
  return { id, stall_name, width, length }
}

function StallsTable(props) {
  const { classes } = props
  
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(5000);
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const data = props.stalls.map(stall => {
    return createData(stall.stall_name, stall.width, stall.length)
  })
  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Name</TableCell>
              <TableCell className={classes.cell}>Width (in)</TableCell>
              <TableCell className={classes.cell}>Length (in)</TableCell>
              <TableCell className={classes.cell}>Size (in&sup2;)</TableCell>
              <TableCell className={classes.cell}>Rent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(data => (
              <TableRow key={data.id}>
                <TableCell className={classes.cell}>{data.stall_name}</TableCell>
                <TableCell className={classes.cell}>{data.width}</TableCell>
                <TableCell className={classes.cell}>{data.length}</TableCell>
                <TableCell className={classes.cell}>
                  {data.length * data.width}
                </TableCell>
                <TableCell className={classes.cell}>
                  <IconButton
                    onClick={handleClickOpen}
                    color="primary"
                    className={classes.button}
                    aria-label="Add to shopping cart">
                    <ShoppingCartIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Rent Stall Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a time duration from below.
        </DialogContentText>
        <form>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="duration">Duration</InputLabel>
            <Select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              input={<Input id="duration" />}
            >
              <MenuItem value={5000}>One Day</MenuItem>
              <MenuItem value={10000}>Two Days</MenuItem>
              <MenuItem value={25000}>Seven Days</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <StripeModule amount={duration}/>
        {/* <Button onClick={handleClose} color="primary">
          Rent
        </Button> */}
      </DialogActions>
    </Dialog>
  </div>
  )
}

StallsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StallsTable)
