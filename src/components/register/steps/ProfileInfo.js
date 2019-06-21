import React, { useState } from 'react'
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

const ProfileInfo = props => {
  const { classes } = props
  const [market_name, changeName] = useState('')
  const [address, changeAddress] = useState('')
  const [state, changeState] = useState('')
  const [city, changeCity] = useState('')
  const [zip_code, changeZip] = useState('')

  return (
    <div className={classes.root}>
      <TextField
        id="standard-dense"
        label="Market Name"
        margin="dense"
        name="market_name"
        value={market_name}
        inputProps={{ maxLength: 32 }}
        onChange={e => changeName(e.target.value)}
        className={classes.textFieldName}
      />
      <div className={classes.address}>
        <TextField
          id="standard-dense"
          label="Street"
          margin="dense"
          name="address"
          value={address}
          inputProps={{ maxLength: 32 }}
          onChange={e => changeAddress(e.target.value)}
          className={classes.textField}
        />
        <TextField
          id="standard-dense"
          label="State"
          margin="dense"
          name="state"
          value={state}
          inputProps={{ maxLength: 12 }}
          onChange={e => changeState(e.target.value)}
          className={classes.textField}
        />
        <TextField
          id="standard-dense"
          label="City"
          margin="dense"
          name="city"
          value={city}
          inputProps={{ maxLength: 24 }}
          onChange={e => changeCity(e.target.value)}
          className={classes.textField}
        />
        <TextField
          id="standard-dense"
          label="Zipcode"
          margin="dense"
          name="zip_code"
          value={zip_code}
          inputProps={{ maxLength: 10 }}
          onChange={e => changeZip(e.target.value)}
          className={classes.textField}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(ProfileInfo)
