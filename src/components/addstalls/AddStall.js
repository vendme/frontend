import React from 'react'

import styles from './addstalls.module.css'

const AddStall = props => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <label>
          QTY:
          <input
            type="number"
            min="1"
            max="99"
            name="quantity"
            required
            value={props.quantity}
            onChange={props.changeHandler}
          />
        </label>
        <label>
          Width (in):
          <input
            type="number"
            size="9"
            name="width"
            required
            value={props.width}
            onChange={props.changeHandler}
          />
        </label>
        <label>
          Length (in):
          <input
            type="number"
            size="9"
            name="length"
            required
            value={props.length}
            onChange={props.changeHandler}
          />
        </label>
      </div>
    </div>
  )
}

export default AddStall