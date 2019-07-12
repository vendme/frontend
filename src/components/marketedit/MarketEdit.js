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
import AddStall from '../addstalls/AddStall'
import EditStallsTable from './editstallstable/EditStallsTable'

import styles from './marketedit.style.js'

class MarketEdit extends Component {
  state = {
    id: 1,
    market_name: '',
    bio: '',
    zip_code: '',
    address: '',
    state: '',
    city: '',
    submittedStallList: [],
    stall_name: '',
    width: '',
    length: '',
    description: '',
    stall_price: ''
  }

  componentDidMount = () => {
    this.getStalls()
  }

  getStalls = async id => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/market/1'
      )
      const {
        market_name,
        id,
        address,
        city,
        state,
        zip_code,
        bio,
        stall_price
      } = data

      this.setState({
        market_name,
        id,
        address,
        city,
        state,
        zip_code,
        bio,
        stall_price
      })

      try {
        const added = await Axios.get(
          `https://vendme.herokuapp.com/api/market/${id}/stalls`
        )
        this.setState({ submittedStallList: added.data })
      } catch (error) {
        console.log('message: ', error)
      }
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  submitStallToAdd = () => {
    if (this.state.stall_name && this.state.width && this.state.length) {
      const updatedList = this.state.submittedStallList
      const add = {
        stall_name: this.state.stall_name,
        width: this.state.width,
        length: this.state.length,
        description: this.state.description,
        stall_price: this.state.stall_price
      }
      const postStall = {
        market_id: this.state.id,
        vendor_id: 1,
        category_id: 3,
        // stall_name: this.state.stall_name,
        width: this.state.width,
        length: this.state.length,
        availability: true,
        description: this.state.description,
        stall_photo: {},
        stall_price: this.state.stall_price,
        rent_message: true
      }
      Axios.post('https://vendme.herokuapp.com/api/stalls', postStall)
        .then(res => {
          updatedList.push(add)
          this.setState({
            submittedStallList: updatedList,
            stall_name: '',
            width: '',
            length: '',
            description: '',
            stall_price: ''
          })
          this.getStalls()
        })
        .catch(error => {
          console.log(JSON.stringify(error))
        })
    }
  }

  updateProfile = () => {
    const updated = {
      market_name: this.state.market_name,
      address: this.state.address,
      state: this.state.state,
      city: this.state.city,
      zip_code: this.state.zip_code
    }
    Axios.put(
      `https://vendme.herokuapp.com/api/market/${this.state.id}`,
      updated
    )
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
  }

  removeStall = cats => {
    Axios.delete(`https://vendme.herokuapp.com/api/stalls/${cats}`)
      .then(res => {
        console.log('message: ', res)
        const updated = this.state.submittedStallList.filter(stall => {
          return stall.id !== cats ? stall : null
        })
        this.setState({ submittedStallList: updated })
      })
      .catch(error => {
        console.log(JSON.stringify(error))
      })
  }

  onEdit = stallsId => {}

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography variant="h6" align="left" className={classes.titles}>
          Edit Profile
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
            label="Market Name"
            margin="dense"
            name="market_name"
            value={this.state.market_name}
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
            Add Stalls
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            className={classes.subtitles}>
            Add a stall for vendors to rent
          </Typography>
          <AddStall
            mystate={this.state}
            changeHandler={this.changeHandler}
            submitStallToAdd={this.submitStallToAdd}
            stall_name={this.state.stall_name}
            width={this.state.width}
            length={this.state.length}
            description={this.state.description}
            stall_price={this.state.stall_price}
          />
          <Typography variant="h6" align="left" className={classes.titles}>
            Available Stalls
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            align="left"
            className={classes.subtitles}>
            All of your available stalls
          </Typography>
          <div className={classes.table}>
            <EditStallsTable
              removeStall={this.removeStall}
              onEdit={this.onEdit}
              stalls={this.state.submittedStallList}
            />
          </div>
        </>
      </div>
    )
  }
}
MarketEdit.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MarketEdit)
