import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import PriceStripeModule from './stripe/PriceStripeModule'
import Snackbar from '../snackbar/Snackbar'
import styles from './pricing.styles'

const tiers = [
  {
    title: 'Free',
    displayPrice: '0',
    price: null,
    description: ['10 stalls', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined'
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    displayPrice: '15',
    price: 1500,
    description: ['50 stalls', 'Phone & email support'],
    buttonText: 'Get started',
    buttonVariant: 'contained'
  },
  {
    title: 'Enterprise',
    displayPrice: '30',
    price: 3000,
    description: ['Unlimited stalls', 'Premium pins for our map'],
    buttonText: 'Contact us',
    buttonVariant: 'outlined'
  }
]

const Pricing = props => {
  const { classes } = props

  const [appear, setAppear] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAppear(false)
    setError(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        open={appear}
        onClose={onClose}
        error={error}
        message={message}
      />
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          Quickly build an effective account for your potential customers and
          clients with Vendme. The only tool you need to rent out stalls for
          your market.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.displayPrice}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map(line => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions
                  style={{ display: 'flex', justifyContent: 'center' }}>
                  {tier.price === null ? (
                    <Link to="/login">
                      <Button
                        fullWidth
                        variant="contained"
                        className={classes.link}
                        color="primary">
                        {tier.buttonText}
                      </Button>
                    </Link>
                  ) : (
                    <PriceStripeModule
                      setAppear={setAppear}
                      setMessage={setMessage}
                      setError={setError}
                      amount={tier.price}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default withStyles(styles)(Pricing)
