import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const [open, setOpen] = React.useState(false);
  
  const { classes } = props
  const data = props.stalls

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
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
          {data.map(data => (
            <TableRow key={"stall-" + data.id}>
              <TableCell className={classes.cell}>{data.stall_name}</TableCell>
              <TableCell className={classes.cell}>{data.width}</TableCell>
              <TableCell className={classes.cell}>{data.length}</TableCell>
              <TableCell className={classes.cell}>
                {data.length * data.width}
              </TableCell>
              <TableCell className={classes.cell}>{data.stall_price}</TableCell>
              <TableCell className={classes.cell}>
                <IconButton
                  // onClick={() => props.onEdit(data.id)}
                  onClick={handleClickOpen}
                  color="primary"
                  className={classes.button}
                  aria-label="Edit Stall">
                  <CreateIcon />
                </IconButton>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Edit Stall</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="stall_name"
                      label="Name"
                      type="text"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="width"
                      label="Width (in)"
                      type="number"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="length"
                      label="Length (in)"
                      type="number"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="stall_price"
                      label="Price"
                      type="number"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
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
    </Paper>
  )
}

EditStallsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditStallsTable)
