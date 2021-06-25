import React from 'react';
import './Map.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../Util/util';

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className='map'>
      <MapContainer
        key={center[0] + casesType}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
