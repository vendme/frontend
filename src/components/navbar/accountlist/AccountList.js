import React from 'react'
import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'

import { AuthUserContext, withAuthorization } from '../../session'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing(2)
  }
}))

const AccountList = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  function handleToggle() {
    setOpen(prevOpen => !prevOpen)
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  function handleLogout(event) {
    props.firebase
      .doSignOut()
      .then(authUser => {
        console.log(authUser)
      })
      .catch(error => {
        console.log(error.message)
      })
    handleClose(event)
  }
  return (
    <div className={classes.root}>
      <div>
        <IconButton
          color="inherit"
          aria-label="Account"
          ref={anchorRef}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          onClick={handleToggle}>
          <AccountCircleIcon style={{ fontSize: 30 }} />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          keepMounted
          transition
          disablePortal
          style={{
            position: 'absolute'
          }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'center top',
                position: 'absolute',
                right: -30
              }}>
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={handleClose}>
                      <AuthUserContext.Consumer>
                        {authUser => authUser.email}
                      </AuthUserContext.Consumer>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <Link to="/account">
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuItem onClick={handleClose}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={props.checked ? true : false}
                            onChange={props.handleTheme}
                            value="checked"
                            color="secondary"
                            className={classes.switch}
                          />
                        }
                        label="Dark Theme"
                        className={classes.switchLabel}
                      />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountList)
