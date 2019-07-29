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
    id: this.props.match.params.id,
    market_id: null,
    vendor_name: '',
    bio: '',
    products: [],
    product_name: '',
    product_description: '',
    product_price: '',
    product_image: ''
  }

  componentDidMount = async id => {
    this.getVendor()
  }

  getVendor = async () => {
      try {
        const { data } = await Axios.get(
          `https://vendme.herokuapp.com/api/vendor/${this.state.id}`
        )
        const { vendor_name, bio, phone_number, vendor_logo, products } = data
        this.setState({
          vendor_name,
          bio,
          phone_number,
          vendor_logo,
          products
        })

        const add = [
          {
            product_name: 'iphone',
            product_description: 'iphone',
            product_price: '1000.00',
            product_image: ''
          },
          {
            product_name: 'Steak Board',
            product_description: 'Plate with wheels to roll steaks.',
            product_price: '27.00',
            product_image: ''
          }
        ];

        this.setState({products: add})
        
        // try {
        //   const added = await Axios.get(
        //     `https://vendme.herokuapp.com/api/vendor/${this.state.id}/products`
        //     )
        //     this.setState({ products: added.data })
        //     console.log("Got it!", this.state.products)
        // } catch (error) {
        //   console.log('message: ', error)
        // }
      } catch (error) {
        console.log('Message: ', error)
      }
  }

  getProducts = async () => {
    try {
      const added = await Axios.get(
        `https://vendme.herokuapp.com/api/vendor/${this.state.id}/products`
      )
      this.setState({ products: added.data })
    } catch (error) {
      console.log('message: ', error)
    }
  }
  
  changeHandler = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }
  updateProductHandler = (item) => {
    this.setState({ product_name: item.product_name, product_description: item.product_description, product_price: item.product_price })
  }

  submitItemToAdd = () => {
    if (
      this.state.product_name &&
      this.state.product_price &&
      this.state.product_description
    ) {
      const updatedList = this.state.products
      const add = {
        product_name: this.state.product_name,
        product_description: this.state.product_description,
        product_price: this.state.product_price,
        product_image: this.state.product_image
      }
      const postItem = {
        market_id: this.state.id,
        product_name: this.state.product_name,
        product_description: this.state.product_description,
        product_price: this.state.product_price,
        product_image: this.state.product_image,
        product_category: 1
      }
      console.log(postItem)
      Axios.post('https://vendme.herokuapp.com/api/products', postItem)
        .then(res => {
          console.log(res)
          updatedList.push(add)
          this.setState({
            products: updatedList,
            product_name: '',
            product_description: '',
            product_price: '',
            product_image: ''
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
  removeItem = pId => {
    Axios.delete(`https://vendme.herokuapp.com/api/products/${pId}`)
      .then(res => {
        console.log('message: ', res)
        const updated = this.state.products.filter(item => {
          return item.id !== pId ? item : null
        })
        this.setState({ products: updated })
      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
  }
  onEdit = itemId => {
    console.log("Item: ", itemId)
    const updated = {
      market_id: this.state.id,
      product_name: this.state.product_name,
      // vendor_id: this.state.id,
      product_description: this.state.product_description,
      product_price: this.state.product_price,
      product_image: this.state.product_image,
      category_id: 3,
    }
    console.log("Updated Data: ", updated)
    Axios.put(
      `https://vendme.herokuapp.com/api/product/${itemId}`,
      updated
    )
      .then(res => {
        this.getProducts()
        console.log(res)
        this.setState({
          product_name: '',
          // vendor_id: this.state.id,
          product_description: '',
          product_price: '',
          product_image: ''
        })
      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
  }
  render() {
    const { classes } = this.props

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
            submitItemToAdd ={this.submitItemToAdd}
            productInfo={this.state}
            changeHandler={this.changeHandler}
            removeStall={this.removeStall}
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
            <EditItemsTable
              itemsInfo={this.state}
              items={this.state.products}
              updateProductHandler={this.updateProductHandler}

              // items={itemsObj}
              removeItem={this.removeItem}
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
