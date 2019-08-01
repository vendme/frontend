import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeModule = props => {
  const publishableKey = 'pk_test_lp8BmFIO2cR5VLED0xJMLNqY00jqSmId7g'

  const rented = {
    stall_name: props.stall.stall_name,
    market_id: props.stall.market_id,
    vendor_id: props.vendorId,
    category_id: 3,
    length: props.stall.length,
    width: props.stall.width,
    availability: true,
    description: props.stall.description,
    stall_photo: props.stall.stall_photo,
    contract_expires: props.expires,
    stall_price: props.stall.stall_price,
    rent_message: true
  };
  
  const onToken = token => {
    const body = {
      amount: props.amount,
      token: token
    };

    axios.post("https://vendme.herokuapp.com/api/payments", body)
      .then(response => {
        console.log(rented)
        console.log(response)
        alert('Payment Success')
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        alert('Payment Error')
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
