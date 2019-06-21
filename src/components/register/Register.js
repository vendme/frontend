import React, { useState } from 'react'
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
import ProfileInfo from './steps/ProfileInfo'
import AddStalls from './steps/AddStalls'
import styles from './register.styles.js'

const steps = ['Account Type', 'Profile Info', 'Additional Steps']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AccountType />
    case 1:
      return <ProfileInfo />
    case 2:
      return <AddStalls />
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

export default withStyles(styles)(Register)
