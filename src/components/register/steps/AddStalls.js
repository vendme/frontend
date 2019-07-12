import React from 'react'

import {
  IconButton,
  withStyles,
  TextField,
  Typography
} from '@material-ui/core'
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
  const { classes, input, handleInput } = props
  const { quantity, width, length, comment } = input
  const {
    changeQuantity,
    changeWidth,
    changeLength,
    changeComment
  } = handleInput
  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h4" align="center">
        Add stalls
      </Typography>
      <div className={classes.form}>
        <TextField
          id="standard-dense"
          label="Quantity"
          margin="dense"
          name="quantity"
          type="number"
          inputProps={{ min: 1 }}
          value={quantity}
          onChange={e => changeQuantity(e.target.value)}
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
          value={width}
          onChange={e => changeWidth(e.target.value)}
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
          value={length}
          onChange={e => changeLength(e.target.value)}
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
        value={comment}
        onChange={e => changeComment(e.target.value)}
        className={classes.textFieldComment}
      />
      <div className={classes.addButton}>
        <IconButton size="medium" color="primary" aria-label="Add">
          <AddIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(AddStall)
