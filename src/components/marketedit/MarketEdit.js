import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Typography, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle';
import AddStall from '../addstalls/AddStall'
import EditStallsTable from './editstallstable/EditStallsTable'

import styles from './marketedit.style.js'

class MarketEdit extends Component {
  state = {
    submittedStallList: [],
    quantity: '',
    width: '',
    length: ''
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
      <div>
        <form action="" id="form1">
          <label>
            Market Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.changeHandler}
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.changeHandler}
            />
          </label>
        </form>
        <form action="">
          <h3>Available Stalls</h3>
          <EditStallsTable stalls={marketObj.availableStalls} />
          <AddStall
            mystate={this.state}
            changeHandler={this.changeHandler}
            submitStallToAdd={this.submitStallToAdd}
            removeStall={this.removeStall}
            quantity={this.state.quantity}
            width={this.state.width}
            length={this.state.length}
          />
          <div className={styles.addContainer}>
            <h3>Add Stall</h3>
            <Button type="button" size="small" color="primary" aria-label="Add" onClick={this.submitStallToAdd}>
              <AddIcon />
            </Button>
          </div>
        </form>
        <div>
          {this.state.submittedStallList.map(stall => (
            <div>
              Quantity: {stall.quantity}
              Size: {`${stall.width} x ${stall.length}`}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
MarketEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MarketEdit)
