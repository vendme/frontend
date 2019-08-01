import React from 'react'
import { IconButton, SnackbarContent } from '@material-ui/core'
import SnackbarComponent from '@material-ui/core/Snackbar'
import { Close, Error } from '@material-ui/icons'
import { red, green } from '@material-ui/core/colors'

const Snackbar = ({ open, onClose, message, error }) => {
  console.log(open)
  return (
    <SnackbarComponent
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
    </SnackbarComponent>
  )
}

export default Snackbar
