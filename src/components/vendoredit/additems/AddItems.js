import React, { useState } from 'react'
import Axios from 'axios'
import {
  Button,
  IconButton,
  withStyles,
  TextField,
  Paper
} from '@material-ui/core'
import { Attachment, Save } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/AddCircle'
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
  submitFile
}) => {
  return (
    <Paper className={classes.container}>
      <Snackbar open={open} onClose={onClose} error={error} message={message} />
      {file && <img className={classes.picture} src={file} alt="Picked File" />}
      <div className={classes.form}>
        <TextField
          id="standard-dense"
          label="Item"
          margin="dense"
          name="product_name"
          required
          value={productInfo.product_name}
          onChange={changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Description"
          margin="dense"
          name="product_description"
          required
          value={productInfo.product_description}
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
          value={productInfo.product_price}
          onChange={changeHandler}
          className={classes.textFieldStalls}
        />
      </div>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ display: 'block' }}
          onClick={_ => fileSelectedHandler()}>
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
