import React from 'react'
import {
  Typography,
  withStyles,
  Paper,
  InputBase,
  IconButton
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import StallsTable from './stallstable/StallsTable'
import CardInfo from '../card/cardinfo/CardInfo'

import styles from './marketprofile.styles.js'

const MarketProfile = props => {
  const { classes } = props

  const marketObj = {
    marketname: 'Vendme Market',
    marketaddress: {
      street: '123 MyMarket St',
      state: 'North, State 12345'
    },
    markethours: '9am-4:30pm',
    availableStalls: [
      {
        quantity: 1,
        width: 20,
        length: 189
      },
      {
        quantity: 3,
        width: 30,
        length: 89
      },
      {
        quantity: 5,
        width: 120,
        length: 109
      }
    ]
  }

  return (
    <div className={classes.root}>
      <CardInfo />
      <Paper className={classes.searchbar} color="primary" elevation={1}>
        <InputBase className={classes.input} placeholder="Search..." />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className={classes.availinfo}>
        <Typography component="h3" variant="h3">
          Available Stalls
        </Typography>
        <div className={classes.table}>
          <StallsTable stalls={marketObj.availableStalls} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(MarketProfile)
