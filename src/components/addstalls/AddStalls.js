import React, { Component } from 'react'

import styles from './addstalls.module.css';

class AddStalls extends Component {
  constructor(props){
    super(props);
    this.state = {
      quantity: 1,
      size: ""
    };
  }
  changeHandler = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })

  }
  submitHandler = event => {
    event.preventDefault();
    const quantity = this.state.quantity;
    const size = this.state.size;
    if(size && quantity){
      alert('Your added Stall is: ' + quantity + " " + size );
      this.props.submitStallToAdd(this.state);
      this.setState({ quantity: 1, size: "" })
    }
    else {
      alert('Please enter a quantity and size');
    }
  }
  render(){
    const { quantity, size } = this.state;

    return(
      <div className={styles.container}>
        <form action="" onSubmit={this.submitHandler}>
          <label> 
            QTY:
            <input 
              type="number"
              placeholder={quantity} 
              min="1" 
              max="99" 
              name="quantity" 
              value={quantity} 
              onChange={this.changeHandler}
            />
          </label>
          <label>
            Size (in):
            <input 
              type="text"
              size= "9" 
              placeholder="e.x.: 72 x 108" 
              name="size" 
              value={size} 
              onChange={this.changeHandler}
            />
          </label>
          <input 
            type="submit" 
            value="Submit" 
          />
          <input 
            type="button" 
            value="X" 
            onClick={this.props.removeStall}
          />
        </form>
      </div>
    );
  } 
}

export default AddStalls
