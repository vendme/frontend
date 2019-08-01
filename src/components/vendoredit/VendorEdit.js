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
import Snackbar from '../snackbar/Snackbar'

import cloudinaryUpload from '../../services/cloudinary'
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
    product_image: '',
    file: null,
    open: false,
    message: null,
    error: false
  }

  componentDidMount = async id => {
    this.getVendor()
  }

  fileSelectedHandler = _ => {
    cloudinaryUpload(f => this.setState({ file: f }))
  }
  submitFile = _ => {
    if (
      this.state.product_name &&
      this.state.product_price &&
      this.state.product_description
    ) {
      const updatedList = this.state.products
      const add = {
        product_image: this.state.file,
        product_name: this.state.product_name,
        product_description: this.state.product_description,
        product_price: this.state.product_price
      }
      const postItem = {
        market_id: this.state.market_id,
        vendor_id: this.state.id,
        product_image: this.state.file,
        product_name: this.state.product_name,
        product_description: this.state.product_description,
        product_price: this.state.product_price,
        product_category: 1
      }
      console.log(postItem)
      Axios.post('https://vendme.herokuapp.com/api/products', postItem)
        .then(res => {
          updatedList.push(add)
          this.setState({
            products: updatedList,
            product_name: '',
            product_description: '',
            product_price: '',
            product_image: '',
            open: true,
            message: 'Succesfully added item.',
            setError: false,
            file: null
          })
          this.getProducts()
        })
        .catch(error => {
          this.setState({
            open: true,
            message:
              'There was an error saving your changes, please try again later.',
            setError: true
          })
        })
    }
  }
  onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false, setError: false })
  }

  getVendor = async () => {
    try {
      const { data } = await Axios.get(
        `https://vendme.herokuapp.com/api/vendor/${this.state.id}`
      )
      const { market_id, vendor_name, bio, phone_number, vendor_logo } = data
      this.setState({
        market_id,
        vendor_name,
        bio,
        phone_number,
        vendor_logo
      })
      this.getProducts()
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  getProducts = async () => {
    try {
      const added = await Axios.get(
        `https://vendme.herokuapp.com/api/products/vendor/${this.state.id}`
      )
      this.setState({
        products: added.data.sort((a, b) => a.id - b.id)
      })
    } catch (error) {
      console.log('message: ', error)
    }
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  updateProductHandler = item => {
    this.setState({
      product_name: item.product_name,
      product_description: item.product_description,
      product_price: item.product_price
    })
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
        this.setState({open: true})
        this.setState({message:'Update was Successful'})
        this.setState({error: false})
        console.log(res)
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        this.setState('There was an error updating your profile, please try again.')
        this.setState(true)
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
    console.log('Item: ', itemId)
    const updated = {
      market_id: this.state.market_id,
      vendor_id: this.state.id,
      product_name: this.state.product_name,
      product_description: this.state.product_description,
      product_price: this.state.product_price,
      product_image: this.state.product_image,
      product_category: 3
    }
    console.log('Updated Data: ', updated)
    Axios.put(`https://vendme.herokuapp.com/api/products/${itemId}`, updated)
      .then(res => {
        this.getProducts()
        console.log(res)
        this.setState({
          product_name: '',
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
        <Snackbar open={this.state.open} onClose={this.onClose} error={this.state.error} message={this.state.message} />
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
            submitItemToAdd={this.submitItemToAdd}
            productInfo={this.state}
            changeHandler={this.changeHandler}
            removeStall={this.removeStall}
            file={this.state.file}
            fileSelectedHandler={this.fileSelectedHandler}
            onClose={this.onClose}
            submitFile={this.submitFile}
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
              changeHandler={this.changeHandler}
              updateProductHandler={this.updateProductHandler}
              onEdit={this.onEdit}
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
