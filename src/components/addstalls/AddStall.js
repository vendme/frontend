import React from 'react'

import { IconButton, withStyles, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle';
import styles from './addstalls.module.css'

const AddStall = props => {
  const { classes } = props

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <TextField
          id="standard-dense"
          label="Quantity"
          margin="dense"
          name="quantity"
          type="number"
          min="1" //Min attribute not working. Find solution.
          value={props.quantity}
          onChange={props.changeHandler}
        />
        <TextField
          id="standard-dense"
          label="Width"
          margin="dense"
          name="width"
          type="number"
          min="1"
          required
          className={classes.textField}
          value={props.width}
          onChange={props.changeHandler}
        />
        <TextField
          id="standard-dense"
          label="Length"
          margin="dense"
          name="length"
          type="number"
          min="1"
          required
          value={props.length}
          onChange={props.changeHandler}
        />
        <IconButton size="small" color="primary" aria-label="Add" className={styles.addButton} onClick={props.submitStallToAdd}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(AddStall)