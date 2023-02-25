import React from 'react';
import {
  MapContainer,
  FeatureGroup,
  TileLayer,
  GeoJSON,
  Tooltip
} from 'react-leaflet';
import { geojson } from '../output_geojson';

export default function LeafletMap(props) {
  const styles = {
    mapContainer: {
      width: "100%", 
      height: "100vh" 
    },
    Open: {
      color: 'green',
      weight: 6
    },
    Closed: {
      color: 'red',
      weight: 6
    }
  }
  const center = [ 35.5951, -82.5515 ] // Asheville, NC
  const zoom = 10

  return (
    <MapContainer 
      style={styles.mapContainer}
      center={center}
      zoom={zoom}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      closePopupOnClick={false}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
        {geojson.features.map((feature, index) => {
          return (
            <FeatureGroup>
              {feature.properties.status === 'Closed' &&
                <GeoJSON style={styles.Closed} data={feature}>
                  <Tooltip direction="center">
                    <ul>
                      <li>Mileposts: {feature.properties.mileposts}</li>
                      <li>Name: {feature.properties.name}</li>
                      <li>Status: {feature.properties.status}</li>
                      <li>Notes: {feature.properties.notes}</li>
                    </ul>
                  </Tooltip>
                </GeoJSON>
              }
              {feature.properties.status === 'Open' &&
                <GeoJSON style={styles.Open} data={feature}>
                  <Tooltip direction="center">
                    <ul>
                      <li>Mileposts: {feature.properties.mileposts}</li>
                      <li>Name: {feature.properties.name}</li>
                      <li>Status: {feature.properties.status}</li>
                      <li>Notes: {feature.properties.notes}</li>
                    </ul>
                  </Tooltip>
                </GeoJSON>
              }
              {feature.properties.status === 'Ungated' &&
                <GeoJSON style={styles.Open} data={feature}>
                  <Tooltip direction="center">
                    <ul>
                      <li>Mileposts: {feature.properties.mileposts}</li>
                      <li>Name: {feature.properties.name}</li>
                      <li>Status: {feature.properties.status}</li>
                      <li>Notes: {feature.properties.notes}</li>
                    </ul>
                  </Tooltip>
                </GeoJSON>
              }
            </FeatureGroup>
          )
        })}
    </MapContainer>
  );
}
