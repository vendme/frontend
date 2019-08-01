import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { withStyles } from '@material-ui/core'
import axios from 'axios'

const styles = ({ spacing, palette, transitions, breakpoints }) => {
  return {
    stripe: {
      boxShadow:
        '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12) !important',
      background: palette.primary.main + ' !important',
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',
      '&:hover': {
        background: palette.primary.dark + ' !important'
      },
      '& span': {
        fontWeight: 'normal !important',
        background: palette.primary.main + ' !important',
        boxShadow: 'none !important',
        textShadow: 'none !important',
        transition:
          'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',
        '&:hover': {
          background: palette.primary.dark + ' !important'
        }
      }
    }
  }
}

const PriceStripeModule = props => {
  const { classes } = props
  const publishableKey = process.env.REACT_APP_STRIPE_KEY

  const { setAppear, setMessage, setError } = props
  
  const onToken = token => {
    const body = {
      amount: props.amount,
      token: token
    };

    axios.post("https://vendme.herokuapp.com/api/payments", body)
      .then(response => {
        setAppear(true)
        console.log(response)
        setMessage('Purchase was Successful')
        setError(false)
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        setMessage(
          'There was an error with your payment, please try again.'
        )
        setError(true)
      })
  }
  return (
    <StripeCheckout
      className={classes.stripe}
      label="GET STARTED" //Component button text
      name="Vendme" //Modal Header
      description="Add text here."
      panelLabel="Rent Stall for " //Submit button in modal
      amount={props.amount} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://res.cloudinary.com/vendme/image/upload/v1564637956/icons/Vendme_icon-01_rkqp6j.png" //Add logo here
      billingAddress={false}
    />
  )
}

export default withStyles(styles)(PriceStripeModule)
