import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  withStyles,
  TextField,
  Paper,
  Button
} from '@material-ui/core'
import Axios from 'axios'
import AddItems from './additems/AddItems'
import EditItemsTable from './edititemstable/EditItemsTable'

import styles from './vendoredit.style.js'

class VendorEdit extends Component {
  state = {
    id: null,
    vendor_name: '',
    bio: '',
    zip_code: '',
    address: '',
    state: '',
    city: '',
    inventory: [],
    quantity: '',
    item: '',
    description: ''
  }

  componentDidMount = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/vendor/11'
      )
      const { vendor_name, id, address, city, state, zip_code, bio } = data
      console.log(data)
      this.setState({ vendor_name, id, address, city, state, zip_code, bio })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  changeHandler = event => {
    event.preventDefault()
    if (event.target.name === "quantity" && event.target.value > 0) {
      this.setState({ [event.target.name]: event.target.value })
    }
    else if (event.target.name !== "quantity"){
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  submitItemToAdd = () => {
    if (this.state.quantity && this.state.item && this.state.description) {
      const updatedList = this.state.inventory
      const add = {
        quantity: this.state.quantity,
        item: this.state.item,
        description: this.state.description
      }
      updatedList.push(add)
      this.setState({
        inventory: updatedList,
        item: '',
        quantity: '',
        description: ''
      })
    }
  }
  render() {
    const { classes } = this.props
    const marketObj = {
      id: null,
      vendor_name: 'Unnamed Vendor',
      bio: 'No bio',
      zip_code: 'No zipcode',
      address: 'No address',
      state: 'No state',
      city: 'No city',
      inventory: [
        {
          item: 'Ball Cap',
          description: 'Warm and pleasant to the eyes.',
          quantity: 7
        },
        {
          item: 'Handmade Tee',
          description: 'Also warm and pleasant to the eyes.',
          quantity: 10
        },
        {
          item: 'Nostalgic Hamburger Doily',
          description: 'Ah the good old days.',
          quantity: 25
        }
      ]
    }
    console.log(this.state)
    return (
      <div className={classes.root}>
        <Typography variant="h6" align="left" className={classes.titles}>
          Edit Vendor Profile
        </Typography>
        <Typography
          variant="subtitle-1"
          gutterBottom
          align="left"
          className={classes.subtitles}>
          Your profile information
        </Typography>
        <Paper className={classes.profile}>
          <Typography variant="h6" gutterBottom>
            Profile Info
          </Typography>
          <TextField
            id="standard-dense"
            label="Vendor Name"
            margin="dense"
            name="vendor_name"
            value={this.state.vendor_name}
            onChange={this.changeHandler}
            className={classes.textField}
          />
          <div className={classes.address}>
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
            <TextField
              id="standard-dense"
              label="Bio"
              margin="dense"
              name="bio"
              value={this.state.bio}
              onChange={this.changeHandler}
              className={classes.textField}
            />
            <div className={classes.buttons}>
              <Button variant="contained" className={classes.button}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}>
                Save
              </Button>
            </div>
          </div>
        </Paper>
        <>
          <Typography variant="h6" align="left" className={classes.titles}>
            Add Item
          </Typography>
          <Typography
            variant="subtitle-1"
            align="left"
            className={classes.subtitles}>
            Add a item to your inventory
          </Typography>
          <AddItems
            mystate={this.state}
            changeHandler={this.changeHandler}
            submitItemToAdd={this.submitItemToAdd}
            removeStall={this.removeStall}
            quantity={this.state.quantity}
            description={this.state.description}
            item={this.state.item}
          />
          <Typography variant="h6" align="left" className={classes.titles}>
            Current Inventory
          </Typography>
          <Typography
            variant="subtitle-1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All of your current listed items
          </Typography>
          <div className={classes.table}>
            <EditItemsTable
              items={[
                ...marketObj.inventory,
                ...this.state.inventory
              ]}
            />
          </div>
        </>
      </div>
    )
  }
}
VendorEdit.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(VendorEdit)
