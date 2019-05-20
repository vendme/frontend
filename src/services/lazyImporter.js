import { lazy } from 'react'

export const NavBar = lazy(() => import('../components/navbar/NavBar'))
export const Login = lazy(() => import('../components/login/Login'))
export const SignUp = lazy(() => import('../components/signup/SignUp'))
export const Card = lazy(() => import('../components/card/Card'))
export const CardInfo = lazy(() =>
  import('../components/card/cardinfo/CardInfo')
)
export const SearchPage = lazy(() =>
  import('../components/searchpage/SearchPage')
)
export const SearchBar = lazy(() => import('../components/searchbar/SearchBar'))
export const MarketEditss = lazy(() =>
  import('../components/marketedit/MarketEditss')
)
export const AddStalls = lazy(() => import('../components/addstalls/AddStalls'))
export const RentStall = lazy(() => import('../components/rentstall/RentStall'))
export const MarketProfile = lazy(() =>
  import('../components/marketprofile/MarketProfile')
)
export const VendorProfile = lazy(() =>
  import('../components/vendorprofile/VendorProfile')
)
export const ItemListing = lazy(() =>
  import('../components/itemlistings/ItemListings')
)
export const ItemListings = lazy(() =>
  import('../components/itemlistings/itemlisting/ItemListing')
)
export const Map = lazy(() => import('../components/map/Map'))
