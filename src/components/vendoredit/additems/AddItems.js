import React from 'react'

import { IconButton, withStyles, TextField, Paper } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import styles from './additems.styles.js'

const AddItems = props => {
  const { classes } = props
  return (
    <Paper className={classes.container}>
      <div className={classes.form}>
        <TextField
          id="standard-dense"
          label="Item"
          margin="dense"
          name="product_name"
          required
          value={props.product_name}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Description"
          margin="dense"
          name="product_description"
          required
          value={props.product_description}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Price"
          margin="dense"
          name="product_price"
          type="number"
          inputProps={{ min: 1 }}
          value={props.product_price}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
      </div>
      <IconButton
        size="medium"
        color="primary"
        aria-label="Add"
        className={classes.addButton}
        onClick={props.submitItemToAdd}>
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default withStyles(styles)(AddItems)
