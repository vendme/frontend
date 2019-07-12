import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import {
  Typography,
  withStyles,
  Paper,
  InputBase,
  IconButton
} from '@material-ui/core'
import { Create } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import StallsTable from './stallstable/StallsTable'
import CardInfo from '../card/cardinfo/CardInfo'

import styles from './marketprofile.styles.js'

class MarketProfile extends Component {
  state = {
    id: null,
    market_name: 'Unnamed Market',
    bio: 'No bio',
    zip_code: 'No zip',
    address: 'No address',
    state: 'No state',
    city: 'No city',
    hours: 'No hours',
    submittedStallList: []
  }

  componentDidMount = async id => {
    try {
      const { data } = await Axios.get(
        `https://vendme.herokuapp.com/api/market/${this.props.match.params.id}`
      )
      const {
        market_name,
        id,
        address,
        city,
        state,
        zip_code,
        bio,
        hours_open
      } = data

      this.setState({
        market_name,
        id,
        address,
        city,
        state,
        zip_code,
        bio,
        hours: hours_open
      })
      try {
        const added = await Axios.get(
          `https://vendme.herokuapp.com/api/market/${id}/stalls`
        )
        this.setState({ submittedStallList: added.data })
      } catch (error) {
        console.log('message: ', error)
      }
    } catch (error) {
      console.log('message: ', error)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.editcontainer}>
          <CardInfo info={this.state} />
          <Link to="/marketedit" className={classes.edit}>
            <Create />
          </Link>
        </div>
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

export default withStyles(styles)(withRouter(MarketProfile))
