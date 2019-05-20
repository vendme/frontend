import React, { Component } from 'react'
import AddStall from '../addstalls/AddStall'
import styles from './marketedit.module.css'

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
            <button
              type="button"
              className={styles.add}
              onClick={this.submitStallToAdd}>
              +
            </button>
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

export default MarketEdit
