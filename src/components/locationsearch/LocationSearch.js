import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  withStyles
} from '@material-ui/core'

import styles from './locationsearch.styles'

var google = window.google
var service = new google.maps.DistanceMatrixService()

class LocationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      street: '',
      city: '',
      state: '',
      zip_code: '',
      origin: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        origin: new google.maps.LatLng({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      })
    })
  }

  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        const newState = {
          address: results[0].formatted_address,
          street: `${results[0].address_components[0].short_name} ${
            results[0].address_components[1].short_name
          }`,
          city: results[0].address_components[3].short_name,
          state: results[0].address_components[5].short_name,
          zip_code: results[0].address_components[7].short_name
        }
        service.getDistanceMatrix(
          {
            origins: [this.state.origin],
            destinations: [results[0].formatted_address],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          },
          callback
        )
        this.setState(newState)
        if (this.props.updateLocation) this.props.updateLocation(newState)
      })
      .catch(error => console.error('Error: ', error))
    function callback(res, status) {
      console.log(res)
      console.log(res.rows[0].elements[0].distance.text + ' away')
    }
  }

  render() {
    const { classes } = this.props
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.widthFix}>
            <TextField
              id="standard-dense"
              label="Location"
              name="location"
              className={classes.widthFix}
              {...getInputProps({
                placeholder: 'Search Address ...'
              })}
              inputProps={{
                'aria-label': 'Search Address'
              }}
            />
            <List component="nav" aria-label="main mailbox folders">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, id) => {
                return (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={`place: ${id}-${suggestion.description}`}>
                    <ListItem button>
                      <ListItemText primary={suggestion.description} />
                    </ListItem>
                    {id !== suggestions.length - 1 && <Divider />}
                  </div>
                )
              })}
            </List>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default withStyles(styles)(LocationSearch)
