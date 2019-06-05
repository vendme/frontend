import React from 'react'

import { IconButton, withStyles, TextField, Paper } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import styles from './addstalls.styles.js'

const AddStall = props => {
  const { classes } = props
  return (
    <Paper className={classes.container}>
      <div className={classes.form}>
        <TextField
          id="standard-dense"
          label="Quantity"
          margin="dense"
          name="quantity"
          type="number"
          min="1" //Min attribute not working. Find solution.
          value={props.quantity}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Width(in.)"
          margin="dense"
          name="width"
          type="number"
          min="1"
          required
          value={props.width}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Length(in.)"
          margin="dense"
          name="length"
          type="number"
          min="1"
          required
          value={props.length}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
      </div>
      <IconButton
        size="large"
        color="primary"
        aria-label="Add"
        className={classes.addButton}
        onClick={props.submitStallToAdd}>
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default withStyles(styles)(AddStall)
