import React, { Suspense, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from './styles/maintheme'
import NavBar from './components/navbar/NavBar'
import {
  Login,
  SignUp,
  SearchPage,
  SearchBar,
  Card,
  CardInfo,
  MarketEdit,
  MarketProfile,
  VendorEdit,
  VendorProfile,
  AddStall,
  RentStall,
  ItemListing,
  ItemListings,
  Map,
  Register
} from './services/lazyImporter'

class App extends Component {
  state = {
    theme: 0
  }
  handleTheme = _ => {
    window.localStorage.setItem('theme', `${!this.state.theme}`)
    this.setState(prevState => ({ theme: !prevState.theme }))
  }
  componentDidMount() {
    this.setState({
      theme: window.localStorage.getItem('theme') === 'true' ? 1 : 0
    })
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme ? darkTheme : lightTheme}>
        <NavBar
          handleTheme={this.handleTheme}
          checked={this.state.theme ? 1 : 0}>
          <Suspense fallback={'loading'}>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route
                path="/searchpage"
                component={_ => <SearchPage theme={this.state.theme} />}
              />
              <Route path="/searchbar" component={SearchBar} />
              <Route path="/card" component={Card} />
              <Route path="/cardinfo" component={CardInfo} />
              <Route path="/marketedit" component={MarketEdit} />
              <Route path="/marketprofile" component={MarketProfile} />
              <Route path="/vendoredit" component={VendorEdit} />
              <Route path="/vendorprofile" component={VendorProfile} />
              <Route path="/addstall" component={AddStall} />
              <Route path="/rentstall" component={RentStall} />
              <Route path="/itemlisting" component={ItemListing} />
              <Route path="/itemlistings" component={ItemListings} />
              <Route
                path="/map"
                component={_ => <Map theme={this.state.theme} />}
              />
              <Route path="/register" component={Register} />
            </Switch>
          </Suspense>
        </NavBar>
      </MuiThemeProvider>
    )
  }
}

export default App
