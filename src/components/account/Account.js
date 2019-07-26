import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button, withStyles } from '@material-ui/core'
import { Attachment, Save } from '@material-ui/icons'

import { AuthUserContext, withAuthorization } from '../session'
import PasswordChangeForm from '../passwordchange'
import styles from './account.styles.js'
import tokenDateChecker from '../../services/tokenDateChecker'

const AccountPage = ({ classes, history }) => {
  const [file, setFile] = useState(null)
  // const [user, setUser] = useState(null)
  // useEffect(_ => {
  //   ;(async function verifyData() {
  //     if (tokenDateChecker()) {
  //       const { data } = await Axios.get(
  //         'https://vendme.herokuapp.com/auth/verify'
  //       )
  //       setUser(data)
  //     } else {
  //       history.push('/login')
  //     }
  //   })()
  // })
  const fileSelectedHandler = e => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'vendme',
        upload_preset: 'jdm3qonc',
        tags: ['profile_pic']
      },
      function(error, result) {
        if (result) {
          setFile(result[0].secure_url)
          Axios.put('https://vendme.herokuapp.com/api/users', {
            profile_pic: result[0].secure_url
          })
            .then(res => {
              console.log(res)
            })
            .catch(err => console.log(err.message))
        }
      }
    )
  }
  return (
    <>
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
