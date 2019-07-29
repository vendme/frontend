import { lazy } from 'react'

export const Login = lazy(() => import('../components/login/Login'))
export const SignUp = lazy(() => import('../components/signup/SignUp'))
export const Card = lazy(() => import('../components/card/Card'))
export const CardInfo = lazy(() =>
  import('../components/card/cardinfo/CardInfo')
)
export const SearchPage = lazy(() =>
  import('../components/searchpage/SearchPage')
)
export const VendorsPage = lazy(() =>
  import('../components/vendorspage/VendorsPage')
)
export const SearchBar = lazy(() => import('../components/searchbar/SearchBar'))
export const MarketEdit = lazy(() =>
  import('../components/marketedit/MarketEdit')
)
export const AddStall = lazy(() => import('../components/addstalls/AddStall'))
export const RentStall = lazy(() => import('../components/rentstall/RentStall'))
export const MarketProfile = lazy(() =>
  import('../components/marketprofile/MarketProfile')
)
export const VendorEdit = lazy(() =>
  import('../components/vendoredit/VendorEdit')
)
export const VendorProfile = lazy(() =>
  import('../components/vendorprofile/VendorProfile')
)
export const ItemListing = lazy(() =>
  import('../components/itemlistings/itemlisting/ItemListing')
)
export const ItemListings = lazy(() =>
  import('../components/itemlistings/ItemListings')
)
export const Map = lazy(() => import('../components/map/Map'))
export const Register = lazy(() => import('../components/register/Register'))
export const PasswordForgetPage = lazy(() =>
  import('../components/passwordforget')
)
export const PasswordChangePage = lazy(() =>
  import('../components/passwordchange')
)
export const AdminPage = lazy(() => import('../components/admin'))
export const Account = lazy(() => import('../components/account/Account'))
export const Page404 = lazy(() => import('../components/page404/Page404'))
export const Pricing = lazy(() => import('../components/pricing/Pricing'))
