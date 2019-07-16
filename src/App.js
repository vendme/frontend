import React, { Suspense, Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from './styles/maintheme'
import NavBar from './components/navbar/NavBar'
import * as ROUTES from './constants/routes'
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
  Register,
  PasswordForgetPage,
  PasswordChangePage,
  AdminPage,
  Account
} from './services/lazyImporter'
import { withFirebase } from './components/firebase'
import { withAuthentication } from './components/session'

class App extends Component {
  state = {
    theme: 0
  }
  handleTheme = _ => {
    console.log(this.state.theme)
    window.localStorage.setItem('theme', `${!this.state.theme}`)
    this.setState(prevState => ({ theme: !prevState.theme }))
    console.log(this.state.theme)
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
              <Route path="/signup" component={withFirebase(SignUp)} />
              <Route path="/login" component={withFirebase(Login)} />
              <Route
                exact
                path="/"
                component={_ => <SearchPage theme={this.state.theme} />}
              />
              <Route path="/searchbar" component={SearchBar} />
              <Route path="/card" component={Card} />
              <Route path="/cardinfo" component={CardInfo} />
              <Route path="/marketedit" component={MarketEdit} />
              <Route path="/marketprofile/:id" component={MarketProfile} />
              <Route path="/vendoredit" component={VendorEdit} />
              <Route path="/vendorprofile/:id" component={VendorProfile} />
              <Route path="/addstall" component={AddStall} />
              <Route path="/rentstall" component={RentStall} />
              <Route path="/itemlisting/:id" component={ItemListing} />
              <Route path="/itemlistings" component={ItemListings} />
              <Route
                path="/map"
                component={_ => <Map theme={this.state.theme} />}
              />
              <Route path="/register" component={Register} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route path="/pw-change" component={PasswordChangePage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/account" component={Account} />
            </Switch>
          </Suspense>
        </NavBar>
      </MuiThemeProvider>
    )
  }
}

export default withAuthentication(App)
