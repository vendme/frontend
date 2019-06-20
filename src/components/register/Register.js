import React, { useState } from 'react'
import Axios from 'axios'
import {
  AppBar,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import AccountType from './steps/AccountType'
import ProfileInfo from './steps/ProfileInfo'
import AddStall from '../addstalls/AddStall'
import styles from './register.styles.js'

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AccountType />
    case 1:
      return <ProfileInfo />
    case 2:
      return <AddStall />
    default:
      throw new Error('Unknown step')
  }
}

const Register = props => {
  const { classes } = props
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
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
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  )
}

export default withStyles(styles)(Register)
