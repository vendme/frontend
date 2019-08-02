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
          <Link fullWidth to="/signup" className={classes.signin}>
            <Button
              variant="contained"
              color="primary"
              className={classes.signin}>
              Sign up
            </Button>
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
