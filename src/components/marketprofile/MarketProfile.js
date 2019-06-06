import React, { Component } from 'react'
import Axios from 'axios'
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

class MarketProfile extends Component {
  state = {
    id: null,
    market_name: 'Unnamed Market',
    bio: 'No bio',
    zip_code: 'No zipcode',
    address: 'No address',
    state: 'No state',
    city: 'No city',
    submittedStallList: [
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

  componentDidMount = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/market/1'
      )
      const { market_name, id, address, city, state, zip_code, bio } = data

      this.setState({ market_name, id, address, city, state, zip_code, bio })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CardInfo info={this.state} />
        <Paper className={classes.searchbar} color="primary" elevation={1}>
          <InputBase className={classes.input} placeholder="Search..." />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className={classes.availinfo}>
          <Typography variant="h6" align="left" className={classes.titles}>
            Available Stalls
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All of your available stalls
          </Typography>
          <div className={classes.table}>
            <StallsTable
              stalls={this.state.submittedStallList}
              id={this.state.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MarketProfile)
