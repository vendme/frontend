import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {
  Button,
  IconButton,
  withStyles,
  Snackbar,
  SnackbarContent
} from '@material-ui/core'
import { Attachment, Save, Close, Error } from '@material-ui/icons'
import { red, green } from '@material-ui/core/colors'

import { AuthUserContext, withAuthorization } from '../session'
import PasswordChangeForm from '../passwordchange'
import styles from './account.styles.js'
import tokenDateChecker from '../../services/tokenDateChecker'

const AccountPage = ({ firebase, classes, history }) => {
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  // const [user, setUser] = useState(null)
  useEffect(_ => {
    firebase.getIdToken().then(idToken => {
      Axios.defaults.headers.common['Authorization'] = idToken
    })
    // ;(async function verifyData() {
    //   if (tokenDateChecker()) {
    //     const { data } = await Axios.get(
    //       'https://vendme.herokuapp.com/auth/verify'
    //     )
    //     setUser(data)
    //   } else {
    //     history.push('/login')
    //   }
    // })()
  })
  const fileSelectedHandler = _ => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'vendme',
        upload_preset: 'jdm3qonc',
        tags: ['profile_pic']
      },
      function(error, result) {
        if (result) setFile(result[0].secure_url)
      }
    )
  }
  const submitFile = async _ => {
    if (tokenDateChecker()) {
      const { data } = await Axios.get(
        'https://vendme.herokuapp.com/auth/verify'
      )
      Axios.put('https://vendme.herokuapp.com/api/users/' + data.id, {
        profile_pic: file
      })
        .then(res => {
          setOpen(true)
          setMessage('Succesfully saved change.')
          setError(false)
        })
        .catch(err => {
          setOpen(true)
          setMessage(
            'There was an error saving your changes, please try again later.'
          )
          setError(true)
        })
    } else {
      history.push('/login')
    }
  }
  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setError(false)
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
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
              {error && (
                <Error
                  style={{
                    fontSize: 20,
                    opacity: 0.9,
                    marginRight: '8px'
                  }}
                />
              )}
              {message}
            </span>
          }
          style={{ backgroundColor: error ? red[700] : green[700] }}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose}>
              <Close style={{ fontSize: 20 }} />
            </IconButton>
          ]}
        />
      </Snackbar>
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
            <h2>Account Type: {authUser.email}</h2>
            <PasswordChangeForm />
          </div>
        )}
      </AuthUserContext.Consumer>
      <div>
        <div className={classes.uploadButtons}>
          <Button
            variant="outlined"
            className={classes.button}
            style={{ display: 'block' }}
            onClick={fileSelectedHandler}>
            <Attachment />
          </Button>
          {file && (
            <Button
              variant="outlined"
              className={classes.button}
              style={{ display: 'block' }}
              onClick={submitFile}>
              <Save />
            </Button>
          )}
        </div>
        {file ? (
          <img className={classes.picture} src={file} alt="Picked File" />
        ) : null}
      </div>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(withStyles(styles)(AccountPage))
