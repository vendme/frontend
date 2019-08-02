import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Typography,
  withStyles,
  TextField,
  Paper,
  Button
} from '@material-ui/core'
import Axios from 'axios'
import AddStall from '../addstalls/AddStall'
import EditStallsTable from './editstallstable/EditStallsTable'
import Snackbar from '../snackbar/Snackbar'
import tokenDateChecker from '../../services/tokenDateChecker'

import styles from './marketedit.styles.js'

class MarketEdit extends Component {
  state = {
    id: null,
    user_id: null,
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
    stall_price: '',
    checked: [],
    changeTime: false,
    days: [
      {
        id: 0,
        open: false,
        day: 'Sunday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      },
      {
        id: 1,
        open: false,
        day: 'Monday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      },
      {
        id: 2,
        open: false,
        day: 'Tuesday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      },
      {
        id: 3,
        open: false,
        day: 'Wednesday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      },
      {
        id: 4,
        open: false,
        day: 'Thursday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      },
      {
        id: 5,
        open: false,
        day: 'Friday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      },
      {
        id: 6,
        open: false,
        day: 'Saturday',
        time: '600',
        timeClose: '1800',
        selectedDate: new Date('2019-08-01T06:00:00'),
        selectedDateClose: new Date('2019-08-01T18:00:00')
      }
    ],
    open: false,
    message: null,
    error: false
  }

  componentDidMount = async () => {
    if (!this.state.user_market) {
      this.getMarket()
      const market = await Axios.get(
        'https://vendme.herokuapp.com/api/market/' + this.props.match.params.id
      )
      const { user_market } = market.data
      if (tokenDateChecker()) {
        const { data } = await Axios.get(
          'https://vendme.herokuapp.com/auth/verify'
        )
        if (data.id === user_market) {
          this.setState({ user_id: data.id })
          this.getStalls()
        } else {
          this.props.history.push('/login')
        }
      } else {
        this.props.history.push('/login')
      }
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
            stall_price: '',
            open: true,
            message: 'Succesfully added stall.',
            error: false
          })
          this.getStalls()
        })
        .catch(error => {
          console.log(JSON.stringify(error))
          this.setState({
            open: true,
            message:
              'There was an error saving your changes, please try again later.',
            error: true
          })
        })
    }
  }
  onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false, error: false })
  }

  updateProfile = () => {
    const newTime = this.state.days.map(day => {
      return `${day.open ? day.time : 'null'},${
        day.open ? day.timeClose : 'null'
      }${day.id !== 6 ? ';' : ''}`
    }).join``
    console.log(newTime)
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
      hours_open: newTime,
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
        this.setState({
          changeTime: false,
          open: true,
          message: 'Succesfully updated profile.',
          error: false
        })
      })
      .catch(error => {
        this.setState({
          open: true,
          message:
            'There was an error updating your profile, please try again.',
          error: true
        })
      })
  }

  removeStall = id => {
    Axios.delete(`https://vendme.herokuapp.com/api/stalls/${id}`)
      .then(res => {
        const updated = this.state.submittedStallList.filter(stall => {
          return stall.id !== id ? stall : null
        })
        this.setState({
          submittedStallList: updated,
          open: true,
          message: 'Succesfully removed stall.',
          error: false
        })
      })
      .catch(error => {
        this.setState({
          open: true,
          message: 'There was an error, please try again.',
          setError: false
        })
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
          stall_price: '',
          open: true,
          message: 'Succesfully updated stall.',
          error: false
        })
      })
      .catch(error => {
        this.setState({
          open: true,
          message: 'There was an error, please try again.',
          error: false
        })
      })
  }

  handleDateChange = (date, givenTime, value) => {
    let both = givenTime.split` `
    givenTime = both[0].split`:`.join``
    if (givenTime[0] === '0') givenTime = givenTime.substring(1)
    givenTime = Number(givenTime)
    let ampm = both[1]
    let official =
      ampm === 'AM' ? givenTime.toString() : (givenTime + 1200).toString()
    let twleveCheck =
      official >= 2400 ? '00' + (official - 2400) : official.toString()
    const newTime = twleveCheck
    const newDays = [...this.state.days].map(
      ({ day, open, id, time, timeClose, selectedDate, selectedDateClose }) => {
        return {
          id,
          day,
          open: day === value.day ? true : open,
          time: day === value.day ? newTime : time,
          timeClose,
          selectedDate: day === value.day ? date : selectedDate,
          selectedDateClose
        }
      }
    )
    console.log(newDays)
    this.setState({ days: newDays })
  }

  handleDateChangeClose = (date, givenTime, value) => {
    let both = givenTime.split` `
    givenTime = both[0].split`:`.join``
    if (givenTime[0] === '0') givenTime = givenTime.substring(1)
    givenTime = Number(givenTime)
    let ampm = both[1]
    let official =
      ampm === 'AM' ? givenTime.toString() : (givenTime + 1200).toString()
    let twleveCheck =
      official >= 2400 ? '00' + (official - 2400) : official.toString()
    const newTime = twleveCheck
    console.log(newTime)
    const newDays = [...this.state.days].map(
      ({ day, open, id, time, timeClose, selectedDate, selectedDateClose }) => {
        return {
          id,
          day,
          open: day === value.day ? true : open,
          time,
          timeClose: day === value.day ? newTime : timeClose,
          selectedDate,
          selectedDateClose: day === value.day ? date : selectedDateClose
        }
      }
    )
    console.log(newDays)
    this.setState({ days: newDays })
  }

  handleToggle = value => {
    const currentIndex = this.state.checked.indexOf(value.id)
    const newChecked = [...this.state.checked]
    if (currentIndex === -1) {
      newChecked.push(value.id)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    const newDays = [...this.state.days].map(
      ({ day, open, id, time, timeClose, selectedDate, selectedDateClose }) => {
        return {
          id,
          day,
          open: id === value.id ? true : open,
          time,
          timeClose,
          selectedDate,
          selectedDateClose
        }
      }
    )
    this.setState({ days: newDays, checked: newChecked })
  }
  changeTime = _ => {
    this.setState({ changeTime: true })
  }

  render() {
    const { classes } = this.props

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.root}>
          <Snackbar
            open={this.state.open}
            onClose={this.onClose}
            error={this.state.error}
            message={this.state.message}
          />
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
              {this.state.changeTime && (
                <List className={classes.list}>
                  {[
                    { id: 0, day: 'Sunday' },
                    { id: 1, day: 'Monday' },
                    { id: 2, day: 'Tuesday' },
                    { id: 3, day: 'Wednesday' },
                    { id: 4, day: 'Thursday' },
                    { id: 5, day: 'Friday' },
                    { id: 6, day: 'Saturday' }
                  ].map(value => (
                    <ListItem
                      className={classes.listItem}
                      key={value.day}
                      role={undefined}
                      dense
                      button
                      onClick={_ => this.handleToggle(value)}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={this.state.checked.indexOf(value.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            'aria-labelledby': `checkbox-list-label-${
                              value.day
                            }`
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={`checkbox-list-label-${value.day}`}
                        primary={value.day}
                      />
                      <ListItemSecondaryAction
                        style={{
                          width: '60%',
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}>
                        <KeyboardTimePicker
                          style={{ width: '40%' }}
                          margin="normal"
                          id="mui-pickers-time"
                          label="Opening time"
                          value={this.state.days[value.id].selectedDate}
                          onChange={(date, e) =>
                            this.handleDateChange(date, e, value)
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change time'
                          }}
                        />
                        <KeyboardTimePicker
                          style={{ width: '40%' }}
                          margin="normal"
                          id="mui-pickers-time"
                          label="Closing time"
                          value={this.state.days[value.id].selectedDateClose}
                          onChange={(date, e) =>
                            this.handleDateChangeClose(date, e, value)
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change time'
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
              {!this.state.changeTime && (
                <Button fullWidth onClick={this.changeTime}>
                  Change hours
                </Button>
              )}
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
            <Link to={'/marketprofile/' + this.state.id}>
              <Button fullWidth color="primary">
                Back to Profile
              </Button>
            </Link>
          </>
        </div>
      </MuiPickersUtilsProvider>
    )
  }
}
MarketEdit.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MarketEdit)
