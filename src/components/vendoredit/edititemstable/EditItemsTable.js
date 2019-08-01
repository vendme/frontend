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
import cloudinaryUpload from '../../../services/cloudinary'
import { renderComponent } from 'recompose'

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
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1)
  },
  edit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  picture: {
    maxWidth: 80,
    height: 80,
    margin: theme.spacing(1)
  }
})

class EditItemsTable extends React.Component {
  state = {
    data: this.props.items,
    itemsInfo: this.props.itemsInfo,
    open: false,
    editedId: null
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      data: nextProps.items,
      itemsInfo: nextProps.itemsInfo
    })
  }

  handleClickOpen = item => {
    this.props.editing(true)
    this.setState({ open: true, editedId: item.id })
    this.props.updateProductHandler(item)
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.closeEdit()
  }
  handleUpdate = () => {
    this.props.onEdit(this.state.editedId)
    this.handleClose()
  }
  render() {
    const { classes } = this.props
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
            {this.state.data &&
              this.state.data.map(data => (
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
                      onClick={_ => this.handleClickOpen(data)}
                      aria-label="Edit Item">
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      className={classes.button}
                      onClick={_ => this.props.removeItem(data.id)}
                      aria-label="Remove Item">
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
          <DialogContent className={classes.edit}>
            <TextField
              autoFocus
              margin="dense"
              name="product_name"
              value={this.props.itemsInfo.product_name}
              onChange={this.props.changeHandler}
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="product_description"
              value={this.props.itemsInfo.product_description}
              onChange={this.props.changeHandler}
              label="Description"
              type="text"
            />
            <TextField
              autoFocus
              margin="dense"
              name="product_price"
              value={this.props.itemsInfo.product_price}
              onChange={this.props.changeHandler}
              label="Price"
              type="number"
            />
            <img
              className={classes.picture}
              src={this.props.file || this.props.itemsInfo.product_image}
            />
            <Button
              variant="outlined"
              className={classes.button}
              style={{ display: 'block' }}
              onClick={this.props.fileSelectedHandler}>
              Change Image
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}

EditItemsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditItemsTable)
