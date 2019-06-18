import React from 'react'
import Feature from 'ol/Feature.js'
import Geolocation from 'ol/Geolocation.js'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { fromLonLat } from 'ol/proj.js'
import Point from 'ol/geom/Point.js'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'
import olms from 'ol-mapbox-style'

import darkmap from './darkmap'
import lightmap from './lightmap'
let place = fromLonLat([-98, 38])
let view = new View({
  center: place,
  zoom: 4
})
class MapDiv extends React.Component {
  componentDidMount() {
    this.map = new Map({
      target: 'map',
      view
    })
    olms.apply(this, [
      this.map,
      this.props.theme === false || this.props.theme === 0 ? lightmap : darkmap
    ])

    this.geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: view.getProjection()
    })

    this.accuracyFeature = new Feature()
    this.geolocation.on('change:accuracyGeometry', _ => {
      this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry())
    })

    this.positionFeature = new Feature()
    this.positionFeature.setStyle(
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

    this.geolocation.setTracking(true)
    this.geolocation.on('change:position', _ => {
      this.coordinates = this.geolocation.getPosition()
      place = this.coordinates
      view.animate({
        center: place,
        zoom: 11,
        duration: 2000
      })
      this.positionFeature.setGeometry(
        this.coordinates ? new Point(this.coordinates) : null
      )
    })

    new VectorLayer({
      map: this.map,
      source: new VectorSource({
        features: [this.accuracyFeature, this.positionFeature]
      })
    })
  }
  componentWillUnmount() {
    this.myRef = null
  }
  render() {
    return (
      <>
        <div ref={this.myRef} id="map" style={{ height: '400px' }} />
      </>
    )
  }
}

export default MapDiv
