import React from 'react';
import {
  MapContainer,
  FeatureGroup,
  TileLayer,
  GeoJSON,
  Tooltip,
  Popup,
  Marker
} from 'react-leaflet';
import { Chip } from '@mui/material';
import Control from 'react-leaflet-custom-control';

export default function LeafletMap(props) {
  const styles = {
    mapContainer: {
      width: "100%", 
      height: "100vh" 
    },
    lastUpdatedChip: {
      'font-size': '1.5em'
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
  const geojson = require('../output.json');
  const currentDate = new Date().toJSON().slice(0, 10);
  const lastUpdatedDate = "2023-03-26";
  // const lastUpdatedString = 'LAST UPDATED: '.concat(currentDate);
  const lastUpdatedString = 'LAST UPDATED: '.concat(lastUpdatedDate);

  return (
    <MapContainer 
      style={styles.mapContainer}
      center={center}
      zoom={zoom}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      closePopupOnClick={false}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        crossOrigin=""/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Control prepend='true' position='topleft'>
        <Chip
          label={lastUpdatedString}
          color="primary"
          style={styles.lastUpdatedChip}
        />
      </Control>
        {geojson.features.map((feature, index) => {
          return (
            <FeatureGroup>
              {feature.properties.status === 'Closed' &&
                <GeoJSON style={styles.Closed} data={feature}>
                  <Tooltip direction="top">
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
                  <Tooltip direction="top">
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
                  <Tooltip direction="top">
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
