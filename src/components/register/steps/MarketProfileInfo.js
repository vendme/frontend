import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import LocationSearch from '../../locationsearch/LocationSearch'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  address: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: theme.spacing(2)
  },
  textFieldName: {
    width: '100%'
  },
  textField: {
    width: `calc(50% - ${theme.spacing(2)}px)`
  }
})

const MarketProfileInfo = props => {
  const { classes, input, handleInput } = props
  const { market_name, address, state, city, zip_code } = input
  const {
    changeMarket_name,
    changeAddress,
    changeState,
    changeCity,
    changeZip
  } = handleInput
  const updateLocation = location => {
    changeAddress(location.street)
    changeState(location.state)
    changeCity(location.city)
    changeZip(location.zip_code)
  }

  return (
    <div className={classes.root}>
      <TextField
        id="standard-dense"
        label="Market Name"
        margin="dense"
        name="market_name"
        value={market_name}
        inputProps={{ maxLength: 32 }}
        onChange={e => changeMarket_name(e.target.value)}
        className={classes.textFieldName}
      />
      <div className={classes.address}>
        <LocationSearch updateLocation={updateLocation} />
      </div>
    </div>
  )
}

export default withStyles(styles)(MarketProfileInfo)
