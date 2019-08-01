import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import gooogleButton2 from './btn_google_signin_light_normal_web@2x.png'
import styles from './signup.styles'

const SignUpForm = props => {
  const { classes, email, passwordOne, passwordTwo } = props

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={props.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={props.onChange}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password1">Password</InputLabel>
            <Input
              type="password"
              id="password1"
              autoComplete="current-password"
              name="passwordOne"
              value={passwordOne}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password2">Re-enter Password</InputLabel>
            <Input
              type="password"
              id="password2"
              autoComplete="current-password"
              name="passwordTwo"
              value={passwordTwo}
              onChange={props.onChange}
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
          <Link fullWidth to="/login" className={classes.signin}>
            <Button
              variant="contained"
              color="primary"
              className={classes.signin}>
              Log in
            </Button>
          </Link>
        </form>
      </Paper>
    </main>
  )
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUpForm)
