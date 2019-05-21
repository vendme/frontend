import React, { Suspense, Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Login,
  SignUp,
  NavBar,
  SearchPage,
  SearchBar,
  Card,
  CardInfo,
  MarketEdit,
  MarketProfile,
  VendorProfile,
  AddStall,
  RentStall,
  ItemListing,
  ItemListings,
  Map
} from './services/lazyImporter'

class App extends Component {
  render() {
    return (
      <>
        <Suspense fallback="loading...">
          <NavBar>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/searchpage" component={SearchPage} />
              <Route path="/searchbar" component={SearchBar} />
              <Route path="/card" component={Card} />
              <Route path="/cardinfo" component={CardInfo} />
              <Route path="/marketedit" component={MarketEdit} />
              <Route path="/marketprofile" component={MarketProfile} />
              <Route path="/vendorprofile" component={VendorProfile} />
              <Route path="/addstall" component={AddStall} />
              <Route path="/rentstall" component={RentStall} />
              <Route path="/itemlisting" component={ItemListing} />
              <Route path="/itemlistings" component={ItemListings} />
              <Route path="/map" component={Map} />
            </Switch>
          </NavBar>
        </Suspense>
      </>
    )
  }
}

export default App
