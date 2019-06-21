import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  subtitle: {
    marginBottom: theme.spacing.unit * 2
  }
})

const AccountType = props => {
  const { classes } = props
  const [account, setAccount] = useState('customer')

  const handleChange = (e, newAccount) => {
    newAccount !== null && setAccount(newAccount)
  }

  return (
    <div className={classes.root}>
      <Typography
        component="subtitle2"
        align="center"
        className={classes.subtitle}>
        Choose what kind of account you want to use
      </Typography>
      <ToggleButtonGroup
        value={account}
        exclusive
        className={classes.buttons}
        onChange={handleChange}>
        <ToggleButton color="primary" value="customer">
          Customer
        </ToggleButton>
        <ToggleButton color="primary" value="vendor">
          Vendor
        </ToggleButton>
        <ToggleButton color="primary" value="market">
          Market
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default withStyles(styles)(AccountType)
