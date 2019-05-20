import React from 'react'
import { Grid, TextField, Button, Card, CardContent } from '@material-ui/core'

import styles from './login.module.css'

const Login = props => {
  return (
    <>
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={16}
        className={styles.login}>
        <Grid item >
          <Card className={styles.card}>
            <CardContent>
              <h1>Login</h1>
              <form action="" className={styles.formContainer}>
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
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
