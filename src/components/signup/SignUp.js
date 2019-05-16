import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core'

import styles from './signup.module.css'

const SignUp = props => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={16}
        className={styles.signup}>
        <Grid item>
          <form action="" className={styles.container}>
            <TextField
              id="outlined-name"
              label="email"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="password"
              type="password"
              className={styles.textField}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" className={styles.button}>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp
