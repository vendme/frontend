import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
const StripeModule = props => {
  const publishableKey = 'pk_test_lp8BmFIO2cR5VLED0xJMLNqY00jqSmId7g'

  const { setAppear, setMessage, setError } = props
  
  const onToken = token => {
    const body = {
      amount: props.amount,
      token: token
    };

    axios.post("https://vendme.herokuapp.com/api/payments", body)
      .then(response => {

        axios.put(`https://vendme.herokuapp.com/api/stalls/${props.stall.id}`, rented)
        .then(res => {
          console.log(res)
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
        setMessage(
          'There was an error with your payment, please try again.'
        )
        setError(true)
      })
  }
  return (
    <StripeCheckout
      label="Check Out" //Component button text
      name="Vendme" //Modal Header
      description="Add text here."
      panelLabel="Rent Stall for " //Submit button in modal
      amount={props.amount} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://www.vidhub.co" //Add logo here
      billingAddress={false}
    />
  )
}

export default StripeModule
