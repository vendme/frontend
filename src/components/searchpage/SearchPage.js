import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { withStyles, Typography } from '@material-ui/core'
import Card from '../card/Card'
import Map from '../map/Map'
import { withAuthorization } from '../session'

import styles from './searchpage.styles.js'

var google = window.google
var service = new google.maps.DistanceMatrixService()

class SearchPage extends Component {
  state = {
    markets: [],
    markets_distances: [],
    origin: null
  }

  componentDidMount = async _ => {
    try {
      const markets = await Axios.get('https://vendme.herokuapp.com/api/market')
      this.setState({
        markets: markets.data
      })
    } catch (error) {
      console.log('Message: ', error)
    }
    this.sortByDistance()
  }

  sortByDistance = _ => {
    service.getDistanceMatrix(
      {
        origins: [this.state.origin],
        destinations: this.state.markets.map(market => {
          return new google.maps.LatLng({
            lat: parseFloat(market.lon),
            lng: parseFloat(market.lat)
          })
        }),
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      },
      (res, status) => {
        const distances = res.rows[0].elements.map((result, id) => {
          return {
            ...this.state.markets[id],
            distance: result.distance ? result.distance.value : Infinity
          }
        })
        this.setState({ markets_distances: distances })
        const sort = this.state.markets_distances.sort((a, b) => {
          return a.distance - b.distance
        })
        this.setState({ markets: sort })
      }
    )
  }

  render() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        origin: new google.maps.LatLng({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      })
    })
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography component="h6" variant="h4" className={classes.title}>
          Market Listings
        </Typography>
        <div className={classes.map}>
          <Map markets={this.state.markets} theme={this.props.theme} />
        </div>
        <Typography variant="h6" align="left" className={classes.titles}>
          Markets
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="left"
          className={classes.subtitles}>
          All Markets in your area
        </Typography>
        <div className={classes.markets}>
          {this.state.markets.map((market, id) => (
            <Link
              key={id + market.market_name}
              to={`/marketprofile/${market.id}`}>
              <div className={classes.market}>
                <Card info={market} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(withStyles(styles)(SearchPage))
