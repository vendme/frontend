import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { mainListItems, secondaryListItems } from './navlist/NavItems'
import AccountList from './accountlist/AccountList'

import styles from './navbar.styles.js'
class NavBar extends React.Component {
  state = {
    open: false
  }

  handleDrawerOpen = _ => {
    this.setState({ open: true })
  }

  handleDrawerClose = _ => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}>
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              fontFamily="Pacifico"
              noWrap
              className={classes.title}>
              Vendme
            </Typography>
            <AccountList
              checked={this.props.checked}
              handleTheme={this.props.handleTheme}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}>
          <div
            style={{
              width: `${
                !this.state.open && window.innerWidth < 600 ? '0px' : '100%'
              }`
            }}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List className={classes.list}>{secondaryListItems}</List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.props.children}
        </main>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.number
}

export default withStyles(styles)(NavBar)
