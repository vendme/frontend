import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import {
  Divider,
  Modal,
  Card,
  CardMedia,
  Typography,
  Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import styles from './itemlisting.styles'

const ItemListing = props => {
  const { classes } = props
  const [listing, setListing] = useState({})
  const [vendor, setVendor] = useState('')
  const [market, setMarket] = useState({})
  const [open, setOpen] = React.useState(false)
  useEffect(_ => {
    if (Object.keys(listing).length === 0) {
      Axios.get(
        'https://vendme.herokuapp.com/api/products/' + props.match.params.id
      )
        .then(res => {
          setListing(res.data)
        })
        .catch(error => {
          console.log('message: ', JSON.stringify(error))
        })
    }
    Axios.get(
      'https://vendme.herokuapp.com/api/vendor/' + listing.vendor_id
    ).then(res => setVendor(res.data.vendor_name))
  })
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <CardMedia
          classNames={classes.picture}
          image={
            listing.product_image || 'http://lorempixel.com/160/160/business'
          }
          title={listing.product_name}
        />
      </Modal>
      <div className={classes.blurBox}>
        <div
          className={classes.picturesContainer}
          style={{
            backgroundImage: `url(${listing.product_image ||
              'http://lorempixel.com/160/160/business'})`
          }}
        />
      </div>
      <div className={classes.pictures}>
        <CardMedia
          className={classes.picture}
          onClick={handleOpen}
          image={
            listing.product_image || 'http://lorempixel.com/160/160/business'
          }
          title={listing.product_name}
        />
      </div>
      <div className={classes.about}>
        <div className={classes.left}>
          <div className={classes.info}>
            <span className={classes.priceBox}>
              {'$' + listing.product_price}
            </span>
            <Typography component="h2" variant="h5" className={classes.name}>
              {listing.product_name}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="subtitle1" className={classes.description}>
            {listing.product_description}
          </Typography>
        </div>
        <div className={classes.right}>
          <Card className={classes.vendor}>
            <img
              className={classes.vendor_pic}
              src="http://lorempixel.com/160/160/business"
            />
            <Typography variant="subtitle1">{vendor}</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}>
              MAKE OFFER
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(withRouter(ItemListing))
