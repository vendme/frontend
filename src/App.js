import React, { Suspense, Component } from 'react'

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
            <SignUp />
            {/* <Login /> */}
            {/* <SearchPage /> */}
            {/* <SearchBar /> */}
            {/* <Card /> */}
            {/* <CardInfo /> */}
            {/* <MarketEdit /> */}
            {/* <MarketProfile /> */}
            {/* <VendorProfile /> */}
            {/* <AddStall /> */}
            {/* <RentStall /> */}
            {/* <ItemListing /> */}
            {/* <ItemListings /> */}
            {/* <Map /> */}
          </NavBar>
        </Suspense>
      </>
    )
  }
}

export default App
