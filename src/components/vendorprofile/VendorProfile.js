import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import {
  Typography,
  withStyles,
  Paper,
  InputBase,
  IconButton
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Create from '@material-ui/icons/Create'
import InventoryTable from './inventorytable/InventoryTable'
import CardInfo from '../card/cardinfo/CardInfo'

import styles from './vendorprofile.styles.js'
import ItemListings from '../itemlistings/ItemListings'
import tokenDateChecker from '../../services/tokenDateChecker'

class VendorProfile extends Component {
  state = {
    user: {},
    id: null,
    user_id: null,
    user_vendor: null,
    vendor_name: 'Unnamed Vendor',
    market_name: 'Unnamed Market',
    market_id: null,
    bio: 'No bio',
    zip_code: '',
    address: 'No address',
    phone_number: 'No Number',
    state: 'No state',
    city: 'No city',
    inventory: []
  }

  componentDidMount = async _ => {
    if (tokenDateChecker()) {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/auth/verify'
      )
      this.setState({ user: data })
    } else {
      this.props.history.push('/login')
    }

    try {
      const vendor = await Axios.get(
        'https://vendme.herokuapp.com/api/vendor/' + this.props.match.params.id
      )
      const {
        vendor_name,
        id,
        bio,
        market_id,
        phone_number,
        user_vendor
      } = vendor.data
      if (market_id) {
        const market = await Axios.get(
          'https://vendme.herokuapp.com/api/market/' + market_id
        )
        const { market_name, address, city, state, zip_code } = market.data
        this.setState({ market_name, address, city, state, zip_code })
      }
      this.setState({
        vendor_name,
        id,
        bio,
        market_id,
        phone_number,
        user_vendor
      })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.editcontainer}>
          <CardInfo info={this.state} />
          {this.state.user.id && this.state.user.id === this.state.user_vendor && (
            <Link to={'/vendoredit/' + this.state.id} className={classes.edit}>
              <Create className={classes.editsymbol} />
            </Link>
          )}
        </div>
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
            variant="subtitle1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All items being sold by vendor
          </Typography>
          <div className={classes.products}>
            <ItemListings vendor={this.props.match.params.id} />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(VendorProfile)
