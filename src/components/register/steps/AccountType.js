import React from 'react'
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
    marginBottom: theme.spacing(2)
  },
  workaround: {
    color:
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.87) !important'
        : 'inherit',
    background: `${theme.palette.primary.main} !important`
  }
})

const AccountType = props => {
  const { classes } = props

  const handleChange = (e, newAccount) => {
    if (newAccount !== null) {
      props.handleAccount(newAccount)
    }
  }

  return (
    <div className={classes.root}>
      <Typography
        component="h2"
        variant="subtitle1"
        align="center"
        className={classes.subtitle}>
        Choose what kind of account you want to use
      </Typography>
      <ToggleButtonGroup
        value={props.account}
        exclusive
        className={classes.buttons}
        onChange={handleChange}>
        <ToggleButton
          value="vendor"
          className={props.account === 'vendor' ? classes.workaround : ''}>
          Vendor
        </ToggleButton>
        <ToggleButton
          value="market"
          className={props.account === 'market' ? classes.workaround : ''}>
          Market
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
export default withStyles(styles)(AccountType)
