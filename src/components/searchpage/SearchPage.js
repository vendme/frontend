import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import {
  withStyles,
  Paper,
  InputBase,
  IconButton,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Card from '../card/Card'
import Map from '../map/Map'
import { withAuthorization } from '../session'

import styles from './searchpage.styles.js'

class SearchPage extends Component {
  state = {
    markets: []
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
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.searchbar} color="primary" elevation={1}>
          <InputBase className={classes.input} placeholder="Search..." />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
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
