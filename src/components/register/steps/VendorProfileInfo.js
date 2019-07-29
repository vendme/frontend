import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  address: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textFieldName: {
    width: '100%'
  },
  textField: {
    width: `calc(50% - ${theme.spacing(2)}px)`
  }
})

const VendorProfileInfo = props => {
  const { classes, input, handleInput } = props
  const { vendor_name, vendor_logo, bio, phone_number } = input
  const {
    changeVendor_name,
    changeVendor_logo,
    changeBio,
    changePhone_number
  } = handleInput

  return (
    <div className={classes.root}>
      <TextField
        id="standard-dense"
        label="Vendor Name"
        margin="dense"
        name="vendor_name"
        value={vendor_name}
        inputProps={{ maxLength: 32 }}
        onChange={e => changeVendor_name(e.target.value)}
        className={classes.textFieldName}
      />
      <TextField
        id="standard-dense"
        label="Bio"
        margin="dense"
        multiline
        name="bio"
        value={bio}
        inputProps={{ maxLength: 200 }}
        onChange={e => changeBio(e.target.value)}
        className={classes.textFieldName}
      />
    </div>
  )
}

export default withStyles(styles)(VendorProfileInfo)
