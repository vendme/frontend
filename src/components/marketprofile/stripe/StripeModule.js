import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { withStyles } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'

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

const StripeModule = props => {
  const { classes } = props
  const publishableKey = process.env.REACT_APP_STRIPE_KEY

  const { setAppear, setMessage, setError } = props

  const rented = {
    stall_name: props.stall.stall_name,
    market_id: props.stall.market_id,
    vendor_id: props.vendorId,
    category_id: 3,
    length: props.stall.length,
    width: props.stall.width,
    availability: false,
    description: props.stall.description,
    stall_photo: props.stall.stall_photo,
    contract_expires: props.expires,
    stall_price: props.stall.stall_price,
    rent_message: true
  }

  const onToken = token => {
    const body = {
      amount: props.amount,
      token: token
    }

    axios
      .post('https://vendme.herokuapp.com/api/payments', body)
      .then(response => {
        axios
          .put(
            `https://vendme.herokuapp.com/api/stalls/${props.stall.id}`,
            rented
          )
          .then(res => {
            axios
              .put(
                `https://vendme.herokuapp.com/api/vendor/${props.vendorId}`,
                { market_id: props.stall.market_id }
              )
              .then(res => {
                console.log(res)
              })
              .catch(error => {
                console.log(JSON.stringify(error))
              })
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })

        setAppear(true)
        props.handleClose()
        console.log(response)
        setMessage('Purchase was Successful')
        setError(false)
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        setMessage('There was an error with your payment, please try again.')
        setError(true)
      })
  }
  return (
    <StripeCheckout
      className={classes.stripe}
      label="CHECK OUT" //Component button text
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

export default withStyles(styles)(StripeModule)
