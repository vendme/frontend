import React, { Component } from 'react'

import styles from './addstalls.module.css';

const AddStall = (props) => {
  console.log(props)

    return(
      <div className={styles.container}>
        <div className={styles.form}>
          <label> 
            QTY:
            <input 
              type="number"
              placeholder={props.quantity}
              min="1" 
              max="99" 
              name="quantity" 
              value={props.quantity} 
              onChange={props.changeHandler}
            />
          </label>
          <label>
            Size (in):
            <input 
              type="text"
              size= "9" 
              placeholder="e.x.: 72 x 108" 
              name="size" 
              value={props.size} 
              onChange={props.changeHandler}
            />
          </label>
        </div>
      </div>
    );

}

export default AddStall