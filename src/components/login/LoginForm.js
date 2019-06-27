import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Link,
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
import { PasswordForgetLink } from '../passwordforget'
import styles from './login.styles'

const LoginForm = props => {
  const { classes, email, password } = props

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
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
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
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
            Sign in
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
          <PasswordForgetLink />
        </form>
      </Paper>
    </main>
  )
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginForm)
