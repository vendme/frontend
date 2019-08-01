import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
import tokenDateChecker from '../../services/tokenDateChecker'

import styles from './marketedit.style.js'

class MarketEdit extends Component {
  state = {
    id: null,
    user_id: null,
    user_market: null,
    market_name: '',
    lon: '',
    lad: '',
    address: '',
    state: '',
    city: '',
    zip_code: '',
    phone_num: '',
    market_info: '',
    hours_open: '',
    market_map_file: '',
    agreement_file: null,
    created_at: '',
    user_market: '',
    submittedStallList: [],
    stall_name: '',
    width: '',
    length: '',
    description: '',
    stall_price: ''
  }

  componentDidMount = async () => {
    this.getMarket()
    if (tokenDateChecker()) {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/auth/verify'
      )
      if (data.id === this.state.user_market) {
        this.setState({ user_id: data.id })
        this.getStalls()
      } else {
        this.props.history.push('/404')
      }
    } else {
      this.props.history.push('/login')
    }
  }

  getMarket = async _ => {
    try {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/api/market/' + this.props.match.params.id
      )
      const {
        id,
        market_name,
        lon,
        lad,
        address,
        city,
        state,
        zip_code,
        phone_num,
        market_info,
        hours_open,
        market_map_file,
        agreement_file,
        created_at,
        user_market
      } = data

      this.setState({
        id,
        market_name,
        lon,
        lad,
        address,
        city,
        state,
        zip_code,
        phone_num,
        market_info,
        hours_open,
        market_map_file,
        agreement_file,
        created_at,
        user_market
      })
      try {
        const added = await Axios.get(
          `https://vendme.herokuapp.com/api/market/${id}/stalls`
        )
        console.log(added)
        this.setState({ submittedStallList: added.data })
      } catch (error) {
        console.log('message: ', error)
      }
    } catch (error) {
      console.log('Message: ', error)
    }
  }

  getStalls = async () => {
    try {
      const added = await Axios.get(
        `https://vendme.herokuapp.com/api/market/${
          this.props.match.params.id
        }/stalls`
      )
      this.setState({ submittedStallList: added.data })
    } catch (error) {
      console.log('message: ', error)
    }
  }

  changeHandler = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }
  updateStallHandler = stall => {
    this.setState({
      stall_name: stall.stall_name,
      width: stall.width,
      length: stall.length,
      description: stall.description,
      stall_price: stall.stall_price
    })
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
        stall_name: this.state.stall_name,
        market_id: this.state.id,
        vendor_id: null,
        category_id: null,
        length: this.state.length,
        width: this.state.width,
        availability: true,
        description: this.state.description,
        stall_photo: null,
        contract_expires: null,
        stall_price: this.state.stall_price,
        rent_message: true
      }
      console.log(postStall)
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
      id: this.state.id,
      market_name: this.state.market_name,
      lon: this.state.lon,
      lad: this.state.lad,
      address: this.state.address,
      state: this.state.state,
      city: this.state.city,
      zip_code: this.state.zip_code,
      phone_num: this.state.phone_num,
      market_info: this.state.market_info,
      hours_open: this.state.hours_open,
      market_map_file: this.state.market_map_file,
      agreement_file: this.state.agreement_file,
      created_at: this.state.created_at,
      user_market: this.state.user_market
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

  onEdit = stallsId => {
    console.log('Stalls: ', stallsId)
    const updated = {
      stall_name: this.state.stall_name,
      market_id: this.state.id,
      vendor_id: null,
      category_id: 3,
      length: this.state.length,
      width: this.state.width,
      availability: true,
      description: this.state.description,
      stall_photo: null,
      contract_expires: null,
      stall_price: this.state.stall_price,
      rent_message: false
    }
    console.log('Updated Data: ', updated)
    Axios.put(`https://vendme.herokuapp.com/api/stalls/${stallsId}`, updated)
      .then(res => {
        this.getStalls()
        console.log(res)
        this.setState({
          stall_name: '',
          width: '',
          length: '',
          description: '',
          stall_price: ''
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
          Edit Market Profile
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
            <TextField
              id="standard-dense"
              label="Hours Open"
              margin="dense"
              name="hours_open"
              value={this.state.hours_open}
              onChange={this.changeHandler}
              className={classes.textField}
            />
            <TextField
              id="standard-dense"
              label="Phone Number"
              margin="dense"
              name="phone_num"
              value={this.state.phone_num}
              onChange={this.changeHandler}
              className={classes.textField}
            />
            <TextField
              id="standard-dense"
              label="Bio"
              margin="dense"
              name="market_info"
              value={this.state.market_info}
              onChange={this.changeHandler}
              className={classes.textField}
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
              changeHandler={this.changeHandler}
              removeStall={this.removeStall}
              updateStallHandler={this.updateStallHandler}
              onEdit={this.onEdit}
              stallInfo={this.state}
              stalls={this.state.submittedStallList}
            />
          </div>
          <Link to={"/marketprofile/" + this.state.id}>
            <Button fullWidth color="primary">
              Back to Profile
            </Button>
          </Link>
        </>
      </div>
    )
  }
}
MarketEdit.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MarketEdit)
