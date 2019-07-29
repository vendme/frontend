import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, withStyles } from '@material-ui/core'
import { Attachment, Save } from '@material-ui/icons'

import cloudinaryUpload from '../../services/cloudinary'
import { AuthUserContext, withAuthorization } from '../session'
import PasswordChangeForm from '../passwordchange'
import tokenDateChecker from '../../services/tokenDateChecker'
import Snackbar from '../snackbar/Snackbar'
import styles from './account.styles.js'

const AccountPage = ({ firebase, classes, history }) => {
  const [user, setUser] = useState({})
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  useEffect(_ => {
    if (Object.keys(user).length === 0) {
      async function fetchData() {
        if (tokenDateChecker()) {
          const { data } = await Axios.get(
            'https://vendme.herokuapp.com/auth/verify'
          )
          setUser(data)
          firebase.getIdToken().then(idToken => {
            Axios.defaults.headers.common['Authorization'] = idToken
          })
        } else {
          history.push('/login')
        }
      }
      fetchData()
    }
  })
  const fileSelectedHandler = _ => {
    cloudinaryUpload(setFile)
  }
  const submitFile = _ => {
    Axios.put('https://vendme.herokuapp.com/api/users/' + user.id, {
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
      <Snackbar open={open} onClose={onClose} error={error} message={message} />
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
            <h2>
              Account Type:{' '}
              {user.account_type === 1
                ? 'Market'
                : user.account_type === 2
                ? 'Vendor'
                : 'Customer'}
            </h2>
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
        ) : (
          user.profile_pic && (
            <img
              className={classes.picture}
              src={user.profile_pic}
              alt="Picked File"
            />
          )
        )}
      </div>
    </>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(withStyles(styles)(AccountPage))
