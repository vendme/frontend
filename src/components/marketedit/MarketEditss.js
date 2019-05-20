import React, { Component } from 'react'
import AddStall from "../addstalls/AddStall";
import styles from "./marketedit.module.css";

class MarketEdit extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      addStallList: [],
      submittedStallList: [],
      quantity: null,
      size: null,
      name: "",
      address: ""
    };
  }

  changeHandler = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })

    console.log(this.state)
  }
  
  addStall = event => {
    event.preventDefault();
    const idValue = Math.floor(Math.random()*10);

    if(this.state.quantity || this.state.size){
      this.submitStallToAdd();
    }
    else {
      const addNewStall = [];
      addNewStall.push(this.state.addStallList);
      addNewStall.push(<AddStall  key={idValue} id={idValue} mystate={this.state} changeHandler={this.changeHandler} submitStallToAdd={this.submitStallToAdd} removeStall={this.removeStall}/>);
      this.setState({ addStallList: addNewStall });
    }
  };

  submitStallToAdd = () => {

    const updatedList = this.state.submittedStallList;
    const add = {
      id: this.state.id,
      quantity: this.state.quantity,
      size: this.state.size,
      name: this.state.name,
      address: this.state.address
    }
    console.log("This worked")
    updatedList.push(add);
    this.setState({ submittedStallList: updatedList })
    this.setState({ quantity: "", size: "", })
    // this.state.props.update(this.state);
  }
  render() {
    return ( 
      <div>
        <form action="" id="from1">
          <label>
            Market Name
            <input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/>
          </label>
          <label>
            Address
            <input type="text" name="address" value={this.state.address} onChange={this.changeHandler}/>
          </label>
        </form>
        <h3>Available Stalls</h3>
        <div>
          {this.state.addStallList}
        </div>
        <div className={styles.addContainer}>
          <h3>Add Stalls</h3>
          <button type="button" className={styles.add} onClick={this.addStall}>+</button>
        </div>
        <input type="button" form="form1" onClick={this.submitStallToAdd}/>
      </div>
    );
  }
}

export default MarketEdit
