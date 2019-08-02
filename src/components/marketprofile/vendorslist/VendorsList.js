import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { withStyles } from '@material-ui/core'
import Card from '../../card/Card'
import { withAuthorization } from '../../session'

import styles from './vendorslist.styles.js'

class VendorsList extends Component {
  state = {
    vendors: []
  }

  componentDidMount = async _ => {
    try {
      const vendors = await Axios.get(
        `https://vendme.herokuapp.com/api/market/${
          this.props.match.params.id
        }/vendors`
      )
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

export default withAuthorization(condition)(withStyles(styles)(VendorsList))
