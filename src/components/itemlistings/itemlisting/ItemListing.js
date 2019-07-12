import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const ItemListing = props => {
  const { classes } = props
  const [data, setData] = useState([])
  useEffect(_ => {
    !data.length &&
      Axios.get('https://vendme.herokuapp.com/api/products')
        .then(res => {
          console.log(res.data)
          setData(res.data)
        })
        .catch(error => {
          console.log('message: ', error)
        })
  })
  return (
    // <Card
    //   className={classes.item}
    //   key={'listing' + listing.id + listing.market_id + listing.vendor_id}>
    //   <CardMedia
    //     className={classes.cover}
    //     image={
    //       listing.product_image || 'http://lorempixel.com/160/160/business'
    //     }
    //     title="Market"
    //   />
    //   <Typography component="h2" variant="h5" className={classes.name}>
    //     {listing.product_name}
    //   </Typography>
    //   <Typography component="h3" variant="h5" className={classes.price}>
    //     {'$' + listing.product_price.toFixed(2)}
    //   </Typography>
    // </Card>
    'hi'
  )
}

export default ItemListing
