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
          name="item"
          required
          value={props.item}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Description"
          margin="dense"
          name="description"
          required
          value={props.description}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Quantity"
          margin="dense"
          name="quantity"
          type="number"
          inputProps={{ min: 1 }}
          value={props.quantity}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
      </div>
      <IconButton
        size="large"
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
