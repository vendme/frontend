import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { renderComponent } from 'recompose';

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
    padding: '0.5rem 1.5vw',
    '&:nth-of-type(1)': {
      paddingLeft: '30px'
    }
  }
})

function EditStallsTable(props) {
  const { classes } = props
  
  console.log("This is it!: ", props.stallInfo)

  const [open, setOpen] = useState(false);
  const [editedId, setEditedId] = useState(null);
  
  const handleClickOpen = (stall) => {
    setOpen(true);
    setEditedId(stall.id)
    props.updateStallHandler(stall)
  }
  
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Name</TableCell>
            <TableCell className={classes.cell}>Width (in)</TableCell>
            <TableCell className={classes.cell}>Length (in)</TableCell>
            <TableCell className={classes.cell}>Size (in&sup2;)</TableCell>
            <TableCell className={classes.cell}>Price</TableCell>
            <TableCell className={classes.cell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.stalls.map(data => (
            <TableRow key={'stall-' + data.id}>
              <TableCell className={classes.cell}>{data.stall_name}</TableCell>
              <TableCell className={classes.cell}>{data.width}</TableCell>
              <TableCell className={classes.cell}>{data.length}</TableCell>
              <TableCell className={classes.cell}>
                {data.length * data.width}
              </TableCell>
              <TableCell className={classes.cell}>{data.stall_price}</TableCell>
              <TableCell className={classes.cell}>
                <IconButton
                  onClick={() => handleClickOpen(data)}
                  color="primary"
                  className={classes.button}
                  aria-label="Edit Stall">
                  <CreateIcon />
                </IconButton>
                <IconButton
                  onClick={() => props.removeStall(data.id)}
                  color="primary"
                  className={classes.button}
                  aria-label="Remove Stall">
                  <CancelIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Stall</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="stall_name"
            value={props.stallInfo.stall_name}
            onChange={props.changeHandler}
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="width"
            value={props.stallInfo.width}
            onChange={props.changeHandler}
            label="Width (in)"
            type="number"
          />
          <TextField
            autoFocus
            margin="dense"
            name="length"
            value={props.stallInfo.length}
            onChange={props.changeHandler}
            label="Length (in)"
            type="number"
          />
          <TextField
            autoFocus
            margin="dense"
            name="stall_price"
            value={props.stallInfo.stall_price}
            onChange={props.changeHandler}
            label="Price"
            type="number"
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            value={props.stallInfo.description}
            onChange={props.changeHandler}
            label="Description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary"> */}
          <Button onClick={() => props.onEdit(editedId)} onClick={handleClose} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

EditStallsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditStallsTable)
