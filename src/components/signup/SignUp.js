import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Link,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core'

import gooogleButton2 from '../../images/google_signin_buttons/web/2x/btn_google_signin_light_normal_web@2x.png'

import styles from './signup.styles'

function SignUp(props) {
  const { classes } = props
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign up
          </Button>
          <Link
            href="http://vendme.herokuapp.com/auth/google"
            variant="body2"
            className={classes.google}>
            <img
              src={gooogleButton2}
              className={classes.googleButton}
              alt="Google Sign In"
            />
          </Link>
        </form>
      </Paper>
    </main>
  )
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp)
