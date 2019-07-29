import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { Card, CardMedia, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import styles from './itemlistings.styles'

function ItemListings(props) {
  const { classes, vendor } = props
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(_ => {
    if (data.length === 0 && loading) {
      if (vendor === null) {
        Axios.get('https://vendme.herokuapp.com/api/products')
          .then(res => {
            setData(res.data)
          })
          .catch(error => {
            console.log('message: ', error)
          })
      } else {
        Axios.get('https://vendme.herokuapp.com/api/products/vendor/11')
          .then(res => {
            setData(res.data)
            setLoading(false)
          })
          .catch(error => {
            console.log('message: ', error)
          })
      }
    }
  })
  return (
    <div className={classes.root}>
      {data.map(listing => (
        <Link key={'listing-' + listing.id} to={'/itemlisting/' + listing.id}>
          <Card
            className={classes.item}
            key={
              'listing' + listing.id + listing.market_id + listing.vendor_id
            }>
            <CardMedia
              className={classes.cover}
              image={
                listing.product_image ||
                'http://lorempixel.com/160/160/business'
              }
              title="Market"
            />
            <Typography component="h2" variant="h5" className={classes.name}>
              {listing.product_name}
            </Typography>
            <Typography component="h3" variant="h5" className={classes.price}>
              {'$' + listing.product_price}
            </Typography>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default withStyles(styles)(ItemListings)
