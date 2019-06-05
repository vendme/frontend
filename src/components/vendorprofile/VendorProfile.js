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
import InventoryTable from './inventorytable/InventoryTable'
import CardInfo from '../card/cardinfo/CardInfo'

import styles from './VendorProfile.styles.js'

class VendorProfile extends Component {
  state = {
    id: null,
    user_vendor: '',
    bio: '',
    zip_code: '',
    address: '',
    state: '',
    city: '',
    inventory: [
      {
        item: "Ball Cap",
        description: "Warm and pleasant to the eyes.",
        quantity: 7
      },
      {
        item: "Handmade Tee",
        description: "Also warm and pleasant to the eyes.",
        quantity: 10
      },
      {
        item: "Nostalgic Hamburger Doily",
        description: "Ah the good old days.",
        quantity: 25
      }
    ]
  }

  componentDidMount = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/vendor/11'
      )
      const { user_vendor, id, address, city, state, zip_code, bio } = data

      this.setState({ user_vendor, id, address, city, state, zip_code, bio })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CardInfo Info={this.state} />
        <Paper className={classes.searchbar} color="primary" elevation={1}>
          <InputBase className={classes.input} placeholder="Search..." />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className={classes.availinfo}>
          <Typography variant="h6" align="left" className={classes.titles}>
            Inventory
          </Typography>
          <Typography
            variant="subtitle-1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All wares as noted by vendor
          </Typography>
          <div className={classes.table}>
            <InventoryTable
              items={this.state.inventory}
              id={this.state.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(VendorProfile)
