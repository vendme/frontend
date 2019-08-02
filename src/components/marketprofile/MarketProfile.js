import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Typography, withStyles } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import StallsTable from './stallstable/StallsTable'
import CardInfo from '../card/cardinfo/CardInfo'
import tokenDateChecker from '../../services/tokenDateChecker'

import styles from './marketprofile.styles.js'
import VendorsList from './vendorslist/VendorsList'

class MarketProfile extends Component {
  state = {
    user_id: null,
    id: null,
    user_market: null,
    market_name: 'Unnamed Market',
    lon: '',
    lad: '',
    address: 'No address',
    state: 'No state',
    city: 'No city',
    zip_code: '',
    phone_num: 'No number',
    market_info: 'No bio',
    hours_open: 'No hours',
    market_map_file: '',
    agreement_file: '',
    created_at: '',
    submittedStallList: []
  }

  componentDidMount = async () => {
    if (tokenDateChecker()) {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/auth/verify'
      )
      this.setState({ user_id: data.id })
    } else {
      this.props.history.push('/login')
    }

    try {
      const { data } = await Axios.get(
        `https://vendme.herokuapp.com/api/market/${this.props.match.params.id}`
      )
      const {
        id,
        market_name,
        lon,
        lad,
        address,
        city,
        state,
        zip_code,
        phone_num,
        market_info,
        hours_open,
        market_map_file,
        agreement_file,
        created_at,
        user_market
      } = data

      this.setState({
        id,
        market_name,
        lon,
        lad,
        address,
        city,
        state,
        zip_code,
        phone_num,
        market_info,
        hours_open,
        market_map_file,
        agreement_file,
        created_at,
        user_market
      })
      try {
        this.getStalls(id)
      } catch (error) {
        console.log('message: ', error)
      }
    } catch (error) {
      console.log('message: ', error)
    }
  }
  getStalls = async id => {
    const added = await Axios.get(
      `https://vendme.herokuapp.com/api/market/${id}/stalls`
    )
    this.setState({ submittedStallList: added.data })
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.editcontainer}>
          <CardInfo info={this.state} />
          {this.state.user_id && this.state.user_id === this.state.user_market && (
            <Link to={'/marketedit/' + this.state.id} className={classes.edit}>
              <Create className={classes.editsymbol} />
            </Link>
          )}
        </div>
        <div className={classes.availinfo}>
          <Typography variant="h6" align="left" className={classes.titles}>
            Stalls
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
              getStalls={this.getStalls}
              stalls={this.state.submittedStallList}
              id={this.state.id}
            />
          </div>
          <Typography
            variant="h6"
            align="left"
            className={classes.vendorsTitle}>
            Vendors
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All vendors at this location from Vendme
          </Typography>
          <div className={classes.vendors}>
            <VendorsList />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(MarketProfile))
