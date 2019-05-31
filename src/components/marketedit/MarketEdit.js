import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles, TextField, Paper } from '@material-ui/core'
import Axios from 'axios'
import AddStall from '../addstalls/AddStall'
import StallsTable from '../marketprofile/stallstable/StallsTable'

import styles from './marketedit.style.js'

class MarketEdit extends Component {
  state = {
    id: null,
    market_name: '',
    zip_code: '',
    address: '',
    state: '',
    city: '',
    submittedStallList: [],
    quantity: '',
    width: '',
    length: ''
  }

  componentDidMount = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/market/1'
      )
      const { market_name, id, address, city, state, zip_code } = data

      this.setState({ market_name, id, address, city, state, zip_code })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  submitStallToAdd = () => {
    if (this.state.quantity && this.state.width && this.state.length) {
      const updatedList = this.state.submittedStallList
      const add = {
        quantity: this.state.quantity,
        width: this.state.width,
        length: this.state.length
      }
      updatedList.push(add)
      this.setState({
        submittedStallList: updatedList,
        quantity: '',
        width: '',
        length: ''
      })
    }
  }
  render() {
    const { classes } = this.props

    const marketObj = {
      marketname: 'Vendme Market',
      marketaddress: {
        street: '123 MyMarket St',
        state: 'North, State 12345'
      },
      markethours: '9am-4:30pm',
      availableStalls: [
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

    return (
      <div className={classes.root}>
        <Paper className={classes.profile}>
          <Typography variant="h6" gutterBottom>
            Profile Info
          </Typography>
          <TextField
            id="standard-dense"
            label="Market Name"
            margin="dense"
            name="market_name"
            value={this.state.market_name}
            onChange={this.changeHandler}
          />
          <div>
            <TextField
              id="standard-dense"
              label="Street"
              margin="dense"
              name="address"
              value={this.state.address}
              onChange={this.changeHandler}
              className={classes.textField}
            />
            <TextField
              id="standard-dense"
              label="State"
              margin="dense"
              name="state"
              value={this.state.state}
              onChange={this.changeHandler}
              className={classes.textField}
            />
            <TextField
              id="standard-dense"
              label="City"
              margin="dense"
              name="city"
              value={this.state.city}
              onChange={this.changeHandler}
              className={classes.textField}
            />
            <TextField
              id="standard-dense"
              label="Zipcode"
              margin="dense"
              name="zip_code"
              value={this.state.zip_code}
              onChange={this.changeHandler}
              className={classes.textField}
            />
          </div>
        </Paper>
        <>
          <Typography variant="h6" gutterBottom align="center">
            Add Stalls
          </Typography>
          <AddStall
            mystate={this.state}
            changeHandler={this.changeHandler}
            submitStallToAdd={this.submitStallToAdd}
            removeStall={this.removeStall}
            quantity={this.state.quantity}
            width={this.state.width}
            length={this.state.length}
          />
          <Typography variant="h6" gutterBottom align="center">
            Available Stalls
          </Typography>
          <div className={classes.table}>
            <StallsTable stalls={marketObj.availableStalls} />
            {/* <StallsTable stalls={this.state.submittedStallList} /> */}
          </div>
        </>
      </div>
    )
  }
}
MarketEdit.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MarketEdit)
