import React from 'react'

import { IconButton, withStyles, TextField, Paper } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textFieldName: {
    width: '100%'
  },
  textField: {
    width: `calc(33% - ${theme.spacing(2)}px)`
  },
  textFieldComment: {
    width: '100%'
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const AddStall = props => {
  const { classes } = props
  return (
    <React.Fragment className={classes.root}>
      <div className={classes.form}>
        <TextField
          id="standard-dense"
          label="Quantity"
          margin="dense"
          name="quantity"
          type="number"
          inputProps={{ min: 1 }}
          value={props.quantity}
          onChange={props.changeHandler}
          className={classes.textField}
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
          className={classes.textField}
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
          className={classes.textField}
        />
      </div>
      <TextField
        id="standard-dense"
        label="Comment"
        multiline
        margin="dense"
        inputProps={{ maxLength: 500 }}
        name="comment"
        value={props.comment}
        onChange={props.changeHandler}
        className={classes.textFieldComment}
      />
      <div className={classes.addButton}>
        <IconButton
          size="large"
          color="primary"
          aria-label="Add"
          onClick={props.submitStallToAdd}>
          <AddIcon />
        </IconButton>
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles)(AddStall)
