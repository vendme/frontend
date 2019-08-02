import React from 'react'
import { withRouter } from 'react-router-dom'
import Feature from 'ol/Feature.js'
import Overlay from 'ol/Overlay.js'
import Geolocation from 'ol/Geolocation.js'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import Point from 'ol/geom/Point.js'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'
import olms from 'ol-mapbox-style'

import { withStyles } from '@material-ui/core'
import styles from './map.styles.js'
import darkmap from './darkmap'
import lightmap from './lightmap'

let place = fromLonLat([-98, 38])
let view = new View({
  center: place,
  zoom: 4
})
const geocoder = new window.google.maps.Geocoder()
class MapDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
    this.map = null
  }
  componentDidMount() {
    var container = document.getElementById('popup')
    var content = document.getElementById('popup-content')
    var closer = document.getElementById('popup-closer')

    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    })
    closer.onclick = function() {
      overlay.setPosition(undefined)
      closer.blur()
      return false
    }

    this.map = new Map({
      overlays: [overlay],
      target: 'map',
      view
    })
    olms.apply(this, [
      this.map,
      this.props.theme === false || this.props.theme === 0 ? lightmap : darkmap
    ])
    this.map.on('pointermove', evt => {
      var coordinate = evt.coordinate
      var pixel = evt.pixel
      var feature =
        this.map.forEachFeatureAtPixel &&
        this.map.forEachFeatureAtPixel(pixel, feature => feature)
      content.style.display = feature && feature.market ? '' : 'none'
      container.style.display = feature && feature.market ? '' : 'none'
      closer.style.display = feature && feature.market ? '' : 'none'
      if (feature && feature.market) {
        overlay.setPosition(coordinate)
        content.innerHTML = `<div><div>${feature.market}</div><div>${
          feature.address
        }</div></div>`
      }
    })
    this.map.on('click', evt => {
      var pixel = evt.pixel
      var feature =
        this.map.forEachFeatureAtPixel &&
        this.map.forEachFeatureAtPixel(pixel, feature => feature)
      if (feature && feature.market) {
        this.props.history.push('marketprofile/' + feature.market_id)
      }
    })

    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: view.getProjection()
    })

    this.accuracyFeature = new Feature()

    this.positionFeature = new Feature()

    this.geolocation.setTracking(true)
    this.geolocation.on('change:position', _ => {
      this.coordinates = this.geolocation.getPosition()
      place = this.coordinates
      view.animate({
        center: place,
        zoom: 11,
        duration: 2000
      })
    })
    view.animate({
      center: place,
      zoom: 11,
      duration: 2000
    })

    new VectorLayer({
      map: this.map,
      source: new VectorSource({
        features: [this.accuracyFeature, this.positionFeature]
      })
    })
  }
  markerMaker = (lon, lat, market_id, market, address) => {
    var marker = new Feature()
    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#CC3333'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          })
        })
      })
    )
    marker.setGeometry(new Point(fromLonLat([lat, lon])))
    let exists = false
    const newMarkers = this.state.markers
    marker.market_id = market_id
    marker.market = market
    marker.address = address
    for (let i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].market_id === marker.market_id) exists = true
    }
    if (!exists) {
      newMarkers.push(marker)
      this.setState({ markers: newMarkers })
    }
  }
  makeMarkers = marketsProp => {
    marketsProp &&
      marketsProp.forEach(market => {
        this.markerMaker(
          Number(market.lon),
          Number(market.lat),
          market.id,
          market.market_name,
          `${market.address}, ${market.city}, ${market.state} ${
            market.zip_code
          }`
        )
      })
    if (this.state.markers.length > 6) {
      new VectorLayer({
        map: this.map,
        source: new VectorSource({
          features: this.state.markers
        })
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    this.makeMarkers(nextProps.markets)
  }
  componentWillUnmount() {
    this.myRef = null
  }
  render() {
    const { classes } = this.props
    return (
      <>
        <div ref={this.myRef} id="map" style={{ height: '400px' }} />
        <div id="popup" className={classes.popup}>
          <div href="#" id="popup-closer" className={classes.closer} />
          <div id="popup-content" />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(withRouter(MapDiv))
