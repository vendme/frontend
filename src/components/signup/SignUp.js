import React from 'react'
import SignUpForm from './SignUpForm.js'

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  CssBaseline
} from '@material-ui/core'

import { Error, Close } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  open: false
}

class SignUp extends React.Component {
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
    const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === '' ||
      this.state.email === ''
    if (!isInvalid) {
      const { email, passwordOne } = this.state

      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          console.log(authUser)
          this.setState({ ...INITIAL_STATE })
        })
        .catch(error => {
          this.setState({ error: error.message })
          console.log(JSON.stringify(error))
        })
    } else {
      this.setState({
        error: { message: 'Passwords must match!' },
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
        <SignUpForm onChange={this.onChange} onSubmit={this.onSubmit} />
      </>
    )
  }
}
export default SignUp
