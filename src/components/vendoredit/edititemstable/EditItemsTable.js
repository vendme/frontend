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
    padding: theme.spacing(2)
  },
  button: {
    padding: 0,
    margin: theme.spacing(0, 1)
  }
})

function EditItemsTable(props) {
  const { classes } = props
  const data = props.items

  const [open, setOpen] = useState(false)
  const [editedId, setEditedId] = useState(null)

  const handleClickOpen = item => {
    setOpen(true)
    setEditedId(item.id)
    console.log(item.id)
    props.updateProductHandler(item)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    props.onEdit(editedId)
    handleClose()
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Item</TableCell>
            <TableCell className={classes.cell}>Description</TableCell>
            <TableCell className={classes.cell}>Price</TableCell>
            <TableCell className={classes.cell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map(data => (
              <TableRow key={'items-' + data.id}>
                <TableCell className={classes.cell}>
                  {data.product_name}
                </TableCell>
                <TableCell className={classes.cell}>
                  {data.product_description}
                </TableCell>
                <TableCell className={classes.cell}>
                  {data.product_price}
                </TableCell>
                <TableCell
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  className={classes.cell}>
                  <IconButton
                    color="primary"
                    className={classes.button}
                    onClick={() => handleClickOpen(data)}
                    aria-label="Edit Item">
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    className={classes.button}
                    onClick={() => props.removeItem(data.id)}
                    aria-label="Remove Item">
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
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="product_name"
            value={props.itemsInfo.product_name}
            onChange={props.changeHandler}
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="product_description"
            value={props.itemsInfo.product_description}
            onChange={props.changeHandler}
            label="Description"
            type="text"
          />
          <TextField
            autoFocus
            margin="dense"
            name="product_price"
            value={props.itemsInfo.product_price}
            onChange={props.changeHandler}
            label="Price"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate()} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

EditItemsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditItemsTable)
