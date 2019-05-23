import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="For Sale" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Markets" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Stalls" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Pricing" />
    </ListItem>
  </div>
)

export const secondaryListItemsOptions = [
  <Link to="/signup">
    <ListItem button>
      <ListItemText primary="SignUp" />
    </ListItem>
  </Link>,
  <Link to="/login">
    <ListItem button>
      <ListItemText primary="LogIn" />
    </ListItem>
  </Link>,
  <Link to="/searchpage">
    <ListItem button>
      <ListItemText primary="SearchPage" />
    </ListItem>
  </Link>,
  <Link to="/searchbar">
    <ListItem button>
      <ListItemText primary="SearchBar" />
    </ListItem>
  </Link>,
  <Link to="/card">
    <ListItem button>
      <ListItemText primary="Card" />
    </ListItem>
  </Link>,
  <Link to="/cardinfo">
    <ListItem button>
      <ListItemText primary="CardInfo" />
    </ListItem>
  </Link>,
  <Link to="/marketprofile">
    <ListItem button>
      <ListItemText primary="MarketProfile" />
    </ListItem>
  </Link>,
  <Link to="/marketedit">
    <ListItem button>
      <ListItemText primary="MarketEdit" />
    </ListItem>
  </Link>,
  <Link to="/vendorprofile">
    <ListItem button>
      <ListItemText primary="VendorProfile" />
    </ListItem>
  </Link>,
  <Link to="/addstall">
    <ListItem button>
      <ListItemText primary="AddStall" />
    </ListItem>
  </Link>,
  <Link to="/rentstall">
    <ListItem button>
      <ListItemText primary="RentStall" />
    </ListItem>
  </Link>,
  <Link to="/itemlisting">
    <ListItem button>
      <ListItemText primary="ItemListing" />
    </ListItem>
  </Link>,
  <Link to="/itemlistings">
    <ListItem button>
      <ListItemText primary="ItemListings" />
    </ListItem>
  </Link>,
  <Link to="/map">
    <ListItem button>
      <ListItemText primary="Map" />
    </ListItem>
  </Link>
]

const ITEM_HEIGHT = 48

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}>
          {this.props.options.map(option => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default LongMenu

export const secondaryListItems = (
  <LongMenu options={secondaryListItemsOptions} />
)
