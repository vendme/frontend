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
  AddStalls,
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
          <Login />
          <SignUp />
          <NavBar />
          <SearchPage />
          <SearchBar />
          <Card />
          <CardInfo />
          <MarketEdit />
          <MarketProfile />
          <VendorProfile />
          <AddStalls />
          <RentStall />
          <ItemListing />
          <ItemListings />
          <Map />
        </Suspense>
      </>
    )
  }
}

export default App
