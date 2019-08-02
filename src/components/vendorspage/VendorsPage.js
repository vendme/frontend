import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { withStyles, Typography } from '@material-ui/core'
import Card from '../card/Card'
import { withAuthorization } from '../session'

import styles from './vendorspage.styles'

class VendorsPage extends Component {
  state = {
    vendors: []
  }

  componentDidMount = async _ => {
    try {
      const vendors = await Axios.get('https://vendme.herokuapp.com/api/vendor')
      this.setState({
        vendors: vendors.data
      })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="h6" align="left" className={classes.titles}>
          Vendors
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="left"
          className={classes.subtitles}>
          All Vendors in your area
        </Typography>
        <div className={classes.vendors}>
          {this.state.vendors.map((vendor, id) => (
            <Link
              key={id + vendor.vendor_name}
              to={`/vendorprofile/${vendor.id}`}>
              <div className={classes.vendor}>
                <Card info={vendor} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(withStyles(styles)(VendorsPage))
