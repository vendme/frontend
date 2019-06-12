import React from 'react'
import Feature from 'ol/Feature.js'
import Geolocation from 'ol/Geolocation.js'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import Point from 'ol/geom/Point.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { OSM, Vector as VectorSource } from 'ol/source.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'

const GeoCode = require('geo-coder').GeoCode
let geocode = new GeoCode()
let place = fromLonLat([-98, 37])
let view = new View({
  center: place,
  zoom: 4
})

class MapDiv extends React.Component {
  componentDidMount() {
    let map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: view
    })

    let geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: view.getProjection()
    })

    function el(id) {
      return document.getElementById(id)
    }

    el('track').addEventListener('change', function() {
      geolocation.setTracking(this.checked)
    })

    // handle geolocation error.
    geolocation.on('error', function(error) {
      let info = document.getElementById('info')
      info.innerHTML = error.message
      info.style.display = ''
    })

    let accuracyFeature = new Feature()
    geolocation.on('change:accuracyGeometry', function() {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry())
    })

    let positionFeature = new Feature()
    positionFeature.setStyle(
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

    geolocation.on('change:position', function() {
      let coordinates = geolocation.getPosition()
      place = coordinates
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null)
    })

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature]
      })
    })
  }
  componentWillUnmount() {
    this.refs.myRef = null
  }
  panToHome = _ => {
    console.log(place)
    view.animate({
      center: place,
      duration: 2000
    })
  }
  render() {
    return (
      <>
        <label htmlFor="track">
          track position
          <input id="track" type="checkbox" />
        </label>
        <button htmlFor="pan" id="pan" onClick={this.panToHome}>
          pan to home
        </button>
        <div ref={this.myRef} id="map" style={{ height: '400px' }} />
      </>
    )
  }
}

export default MapDiv
