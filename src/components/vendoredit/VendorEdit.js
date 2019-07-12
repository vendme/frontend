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
    market_id: null,
    vendor_name: '',
    bio: '',
    products: [],
    product_name: '',
    product_description: '',
    product_price: '',
    product_img: '',
  }

  componentDidMount = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/vendor/1'
      )
      const { vendor_name, id, bio, phone_number, vendor_logo, market_id, products } = data
      this.setState({ vendor_name, id, bio, phone_number, vendor_logo, market_id, products })
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  getProducts = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/vendor/1'
      )
      const { vendor_name, id, bio, phone_number, vendor_logo, products } = data
      this.setState({ vendor_name, id, bio, phone_number, vendor_logo, products })

      try {
        const added = await Axios.get(
          `https://vendme.herokuapp.com/api/vendor/${id}/products`
        )
        console.log(added)
        this.setState({ products: added.data })
      } catch (error) {
        console.log('message: ', error)
      }
    } 
    catch (error) {
      console.log('Message: ', error)
    }
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  submitItemToAdd = () => {
    if (this.state.product_name && this.state.product_price && this.state.product_description) {
      const updatedList = this.state.products
      const add = {
        product_name: this.state.product_name,
        product_description: this.state.product_description,
        product_price: this.state.product_price,
        product_img: this.state.product_img,
      }
      const postItem = {
        market_id: this.state.id,
        product_name: this.state.product_name,
        product_description: this.state.product_description,
        product_price: this.state.product_price,
        product_img: this.state.product_img,
        product_category: 1
      }
      Axios.post('https://vendme.herokuapp.com/api/products', postItem)
        .then(res => {
          console.log(res)
          updatedList.push(add)
          this.setState({
            products: updatedList,
            product_name: '',
            product_description: '',
            product_price: '',
            product_img: '',
          })
          this.getProducts()
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })
    }
  }
  updateProfile = () => {
    const updated = {
      vendor_name: this.state.vendor_name,
      bio: this.state.bio
    }
    Axios.put(
      `https://vendme.herokuapp.com/api/vendor/${this.state.id}`,
      updated
    )
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
  }
  render() {
    const { classes } = this.props
    const marketObj = {
      id: null,
      vendor_name: 'Unnamed Vendor',
      bio: 'No bio',
      products: [
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
    return (
      <div className={classes.root}>
        <Typography variant="h6" align="left" className={classes.titles}>
          Edit Vendor Profile
        </Typography>
        <Typography
          variant="subtitle1"
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
              label="Bio"
              multiline
              margin="dense"
              inputProps={{ maxLength: 500 }}
              name="bio"
              value={this.state.bio}
              onChange={this.changeHandler}
              className={classes.textFieldArea}
            />
            <div className={classes.buttons}>
              <Button variant="contained" className={classes.button}>
                Cancel
              </Button>
              <Button
                onClick={this.updateProfile}
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
            variant="subtitle1"
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
            variant="subtitle1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All of your current listed items
          </Typography>
          <div className={classes.table}>
            {/* <EditItemsTable
              items={[...marketObj.products, ...this.state.products]}
            /> */}
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
