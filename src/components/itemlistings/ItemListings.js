import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function ItemListings(props) {
  const [data, setData] = useState([])
  useEffect(_ => {
    // const markets = await Axios.get('https://vendme.herokuapp.com/api/market')
    !data.length &&
      Axios.get('http://localhost:9000/api/products')
        .then(res => {
          console.log(res.data)
          setData(res.data)
        })
        .catch(error => {
          console.log('message: ', error)
        })
  })
  return (
    <div>
      {data.map(listing => (
        <div
          key={'listing' + listing.id + listing.market_id + listing.vendor_id}>
          {listing.product_name}
        </div>
      ))}
    </div>
  )
}

export default ItemListings
