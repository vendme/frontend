import React from 'react'
import { withRouter } from 'react-router-dom'
import LoginForm from './LoginForm.js'

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  CssBaseline
} from '@material-ui/core'

import * as ROUTES from '../../constants/routes'

import { Error, Close } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  open: false
}

class Login extends React.Component {
  state = {
    ...INITIAL_STATE
  }
  onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }
  onSubmit = e => {
    e.preventDefault()
    const isInvalid = this.state.password === '' || this.state.email === ''
    if (!isInvalid) {
      const { email, password } = this.state

      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
          this.props.firebase.getIdToken().then(idToken => {
            localStorage.setItem(
              'idToken',
              `{"idToken":"${idToken}","expires_at":"${Date.now() + 3600000}"}`
            )
          })
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.HOME)
        })
        .catch(error => {
          this.setState({
            error: { message: error.message },
            open: true
          })
        })
    } else {
      this.setState({
        error: { message: 'Incorrect Email/Password' },
        open: true
      })
    }
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.onClose}
          style={{ margin: '3.5rem 0', left: 'calc(50% + 27px)' }}>
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span
                id="client-snackbar"
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Error
                  style={{
                    fontSize: 20,
                    opacity: 0.9,
                    marginRight: '8px'
                  }}
                />
                {this.state.error && this.state.error.message}
              </span>
            }
            style={{ backgroundColor: red[700] }}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.onClose}>
                <Close style={{ fontSize: 20 }} />
              </IconButton>
            ]}
          />
        </Snackbar>
        <LoginForm onChange={this.onChange} onSubmit={this.onSubmit} />
      </>
    )
  }
}

export default withRouter(Login)
