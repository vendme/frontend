import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../../firebase'
import tokenDateChecker from '../../../services/tokenDateChecker'
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
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Snackbar from '../../snackbar/Snackbar'

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
  const { classes, firebase, history } = props

  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(5000);
  const [chosenStall, setChosenStall] = useState(null);
  const [user, setUser] = useState({})
  const [type, setType] = useState('')
  const [appear, setAppear] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [amount, setAmount] = useState(duration)

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAppear(false)
    setError(false)
  }

  useEffect(_ => {
    if (Object.keys(user).length === 0) {
      async function fetchData() {
        if (tokenDateChecker()) {
          const { data } = await Axios.get(
            'https://vendme.herokuapp.com/auth/verify'
          )
          setUser(data)
          firebase.getIdToken().then(idToken => {
            Axios.defaults.headers.common['Authorization'] = idToken
          })
        } else {
          history.push('/login')
        }
      }
      fetchData()
    }
    if (user.id)
      Axios
        .get('https://vendme.herokuapp.com/api/users/type/' + user.id)
        .then(res => setType(res.data.id))
  })

  const handleClickOpen = (stall) => {
    if (user.account_type === 2) setOpen(true)
    setChosenStall(stall)
    setAmount(parseInt(stall.stall_price * 100) + duration)
  }
  
  const handleClose = () => {
    setOpen(false)
  }
  
  const selectChange = e => {
    setDuration(e.target.value)
    setAmount(parseInt(chosenStall.stall_price * 100) + e.target.value)
    console.log(amount)
  }

  let days = 1;

  const expires = new Date();
  if(duration === 5000){
    days = 1
  }
  else if(duration === 10000){
    days = 2
  }
  else if(duration === 25000){
    days = 7
  }
  
  expires.setDate(expires.getDate()+days)

  return (
    <div>
      <Snackbar open={appear} onClose={onClose} error={error} message={message} />
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
            {props.stalls.map(data => (
              <TableRow key={data.id}>
                <TableCell className={classes.cell}>
                  {data.stall_name}
                </TableCell>
                <TableCell className={classes.cell}>{data.width}</TableCell>
                <TableCell className={classes.cell}>{data.length}</TableCell>
                <TableCell className={classes.cell}>
                  {data.length * data.width}
                </TableCell>
                <TableCell className={classes.cell}>
                  <IconButton
                    onClick={() => handleClickOpen(data)}
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
              onChange={selectChange}
              input={<Input id="duration" />}
            >
              <MenuItem value={5000}>One Day</MenuItem>
              <MenuItem value={10000}>Two Days</MenuItem>
              <MenuItem value={25000}>Seven Days</MenuItem>
            </Select>
            <span>Price: {amount}</span>  
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <StripeModule setAppear={setAppear} setMessage={setMessage} setError={setError} handleClose={handleClose} vendorId={type} expires={expires} stall={chosenStall} amount={amount}/>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withFirebase(withRouter(withStyles(styles)(StallsTable)))
