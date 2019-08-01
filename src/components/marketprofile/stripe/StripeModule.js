import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeModule = props => {
  const publishableKey = "pk_test_lp8BmFIO2cR5VLED0xJMLNqY00jqSmId7g";
   
  const onToken = token => {
    const body = {
      amount: props.amount,
      token: token
    };    
    const rented = {
      stall_name: props.stall.stall_name,
      market_id: this.state.id,
      vendor_id: 1,
      category_id: 3,
      length: this.state.length,
      width: this.state.width,
      availability: true,
      description: this.state.description,
      stall_photo: null,
      contract_expires: null,
      stall_price: props.stall.stall_price,
      rent_message: true
    }
    console.log(props)
    axios.post("https://vendme.herokuapp.com/api/payments", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
    };  
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
    );
};

export default StripeModule;