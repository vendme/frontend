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
          label="Name"
          margin="dense"
          name="stall_name"
          value={props.stall_name}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
        <TextField
          id="standard-dense"
          label="Width(in.)"
          margin="dense"
          name="width"
          type="number"
          inputProps={{ min: 1 }}
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
          inputProps={{ min: 1 }}
          required
          value={props.length}
          onChange={props.changeHandler}
          className={classes.textFieldStalls}
        />
      </div>
      <TextField
        id="standard-dense"
        label="Description"
        multiline
        margin="dense"
        inputProps={{ maxLength: 500 }}
        name="description"
        value={props.description}
        onChange={props.changeHandler}
        className={classes.textFieldArea}
      />
      <IconButton
        size="medium"
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
