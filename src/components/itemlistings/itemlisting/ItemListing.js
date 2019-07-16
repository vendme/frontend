import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Card, CardMedia, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import styles from './itemlisting.styles'

const ItemListing = props => {
  const { classes } = props
  console.log(props)
  const [listing, setListing] = useState({})
  useEffect(_ => {
    Axios.get(
      'https://vendme.herokuapp.com/api/products/' + props.match.params.id
    )
      .then(res => {
        console.log(res.data)
        setListing(res.data)
      })
      .catch(error => {
        console.log('message: ', JSON.stringify(error))
      })
  })
  return (
    <Card className={classes.item}>
      <CardMedia
        className={classes.cover}
        image={
          listing.product_image || 'http://lorempixel.com/160/160/business'
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
  )
}

export default withStyles(styles)(withRouter(ItemListing))
