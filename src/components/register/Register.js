import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../firebase'
import Axios from 'axios'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import AccountType from './steps/AccountType'
import VendorProfileInfo from './steps/VendorProfileInfo'
import MarketProfileInfo from './steps/MarketProfileInfo'
import tokenDateChecker from '../../services/tokenDateChecker'
import styles from './register.styles.js'

const steps = ['Account Type', 'Profile Info']

function getStepContent(
  step,
  accountProp,
  handleAccountProp,
  inputProp,
  handleInputProp
) {
  switch (step) {
    case 0:
      return (
        <AccountType account={accountProp} handleAccount={handleAccountProp} />
      )
    case 1:
      return accountProp === 'market' ? (
        <MarketProfileInfo input={inputProp} handleInput={handleInputProp} />
      ) : (
        <VendorProfileInfo input={inputProp} handleInput={handleInputProp} />
      )
    default:
      throw new Error('Unknown step')
  }
}

const Register = props => {
  const { classes, firebase, history } = props
  const [activeStep, setActiveStep] = useState(0)
  const [account, setAccount] = useState('vendor')
  const [market_name, changeMarket_name] = useState('')
  const [vendor_name, changeVendor_name] = useState('')
  const [vendor_logo, changeVendor_logo] = useState('')
  const [bio, changeBio] = useState('')
  const [phone_number, changePhone_number] = useState('')
  const [address, changeAddress] = useState('')
  const [state, changeState] = useState('')
  const [city, changeCity] = useState('')
  const [zip_code, changeZip] = useState('')
  const [lon, changeLon] = useState('')
  const [lat, changeLat] = useState('')
  const [user, setUser] = useState({})
  const input = {
    market_name,
    address,
    state,
    city,
    zip_code,
    lon,
    lat,
    vendor_name,
    vendor_logo,
    bio,
    phone_number
  }
  const handleInputChanges = {
    changeMarket_name,
    changeAddress,
    changeState,
    changeCity,
    changeZip,
    changeLon,
    changeLat,
    changeVendor_name,
    changeVendor_logo,
    changeBio,
    changePhone_number
  }

  useEffect(_=>{
    if (Object.keys(user).length === 0) {
      async function fetchData() {
        if (tokenDateChecker()) {
          const { data } = await Axios.get(
            'https://vendme.herokuapp.com/auth/verify'
          )
          setUser(data)
          console.log(data)
          firebase.getIdToken().then(idToken => {
            Axios.defaults.headers.common['Authorization'] = idToken
          })
        } else {
          history.push('/login')
        }
      }
      fetchData()
    }
  })

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleAccount = newAccount => {
    setAccount(newAccount)
  }

  const changeUserAccount = type => {
    Axios.put('https://vendme.herokuapp.com/api/users/' + user.id, {
      account_type: type
    }).catch(err => console.log(err.message))
  }

  const handleSubmit = _ => {
    //set up account in database
    if (tokenDateChecker()) {
      switch (account) {
        case 'vendor':
          Axios.post('https://vendme.herokuapp.com/api/vendor', {
            vendor_name,
            bio,
            phone_number,
            vendor_logo
          })
            .then(res => {
              changeUserAccount(2)
              props.history.push('/')
            })
            .catch(err => console.log(err.message))
          break
        case 'market':
          if (market_name && address && city && state && zip_code)
            Axios.post('https://vendme.herokuapp.com/api/market', {
              market_name,
              address,
              city,
              state,
              lon,
              lat,
              zip_code,
              phone_num: '',
              market_info: '',
              hours_open: '',
              market_map_file: '',
              agreement_file: null
            })
              .then(res => {
                changeUserAccount(1)
                props.history.push('/')
              })
              .catch(err => console.log(err.message))
          break
        default:
          break
      }
    } else {
      props.history.push('/login')
    }
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Account Setup
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(
                activeStep,
                account,
                handleAccount,
                input,
                handleInputChanges
              )}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </>
          )}
        </>
      </Paper>
    </main>
  )
}

export default withFirebase(withStyles(styles)(withRouter(Register)))
