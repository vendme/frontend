import React from 'react'
import { Button, withStyles, TextField, Paper } from '@material-ui/core'
import Snackbar from '../../snackbar/Snackbar'
import styles from './additems.styles.js'

const AddItems = ({
  classes,
  open,
  onClose,
  error,
  message,
  file,
  fileSelectedHandler,
  changeHandler,
  productInfo,
  submitFile,
  editing
}) => {
  return (
    <Paper className={classes.container}>
      <Snackbar open={open} onClose={onClose} error={error} message={message} />
      {!editing
        ? file && (
            <img className={classes.picture} src={file} alt="Picked File" />
          )
        : ''}
      <div className={classes.form}>
        <TextField
          id="standard-dense"
          label="Item"
          margin="dense"
          name="product_name"
          required
          value={!editing ? productInfo.product_name : ''}
          onChange={changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Description"
          margin="dense"
          name="product_description"
          required
          value={!editing ? productInfo.product_description : ''}
          onChange={changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Price"
          margin="dense"
          name="product_price"
          type="number"
          inputProps={{ min: 1 }}
          value={!editing ? productInfo.product_price : ''}
          onChange={changeHandler}
          className={classes.textFieldStalls}
        />
      </div>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ display: 'block' }}
          onClick={fileSelectedHandler}>
          Add image
        </Button>
        <Button
          size="medium"
          color="primary"
          aria-label="Add"
          variant="outlined"
          className={classes.button}
          style={{ display: 'block' }}
          onClick={submitFile}>
          Add Product
        </Button>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(AddItems)
