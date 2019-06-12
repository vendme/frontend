import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { withStyles, Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Card from '../card/Card'

import styles from './searchpage.styles.js'

class SearchPage extends Component {
  state = {
    markets: [],
    inventory: [
      {
        item: 'Ball Cap',
        description: 'Warm and pleasant to the eyes.',
        quantity: 7
      },
      {
        item: 'Handmade Tee',
        description: 'Also warm and pleasant to the eyes.',
        quantity: 10
      },
      {
        item: 'Nostalgic Hamburger Doily',
        description: 'Ah the good old days.',
        quantity: 25
      }
    ]
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
        <div className={classes.markets}>
          {this.state.markets.map((market, id) => (
            <Link to="/marketprofile">
              <div className={classes.market}>
                <Card key={id + market.market_name} info={market} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SearchPage)
