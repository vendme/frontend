import React, { Component } from 'react'
import AddStall from "../addstalls/AddStall";
import styles from "./marketedit.module.css";

class MarketEdit extends Component {
  constructor() {
    super();
    this.state = {
      addStallList: [],
      submittedStallList: []
    };
  }

  addStall = event => {
    event.preventDefault();
    const addNewStall = [];
    addNewStall.push(this.state.addStallList);
    addNewStall.push(<AddStall key={Math.random()} submitStallToAdd={this.submitStallToAdd} removeStall={this.removeStall}/>);
    this.setState({ addStallList: addNewStall })
  };
  // addStall = event => {  ORIGINAL
  //   event.preventDefault();
  //   const addNewStall = [];
  //   addNewStall.push(this.state.addStallList);
  //   addNewStall.push(<AddStalls key={Math.random()} submitStallToAdd={this.submitStallToAdd} removeStall={this.removeStall}/>);
  //   this.setState({ addStallList: addNewStall })
  // };

  submitStallToAdd = added => {
    const updatedList = this.state.submittedStallList;
    const add = {
      id: Math.random(),
      quantity: added.quantity,
      size: added.size
    }

    updatedList.push(add);
    this.setState({ submittedStallList: updatedList })
    this.state.props.update(this.state);
  }
  // removeStall = event => {
  //   const remove = [];
  //   remove.push(this.state.addStallList);
  //   remove.unshift(event.target);
  //   this.setState({ addStallList: remove })
  // }
  render() {
    return ( 
      <div>
        <form action="">
          <label>
            Market Name
            <input type="text"/>
          </label>
          <label>
            Address
            <input type="text"/>
          </label>
        </form>
        <h3>Available Stalls</h3>
        <div>
          <div>{this.state.submitedStallList}</div>
          {this.state.addStallList}
        </div>
        <div className={styles.addContainer}>
          <h3>Add Stalls</h3>
          <button type="button" className={styles.add} onClick={this.addStall}>+</button>
        </div>
        <button type="button">{"<"} Back</button>
        <button type="submit" onClick={this.submitStallToAdd}>Submit</button>
      </div>
    );
  }
}

export default MarketEdit
