// src/components/Map/Map.js

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import L from "leaflet";

// Fix marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ data = [], visibleSpots = {} }) => {
  return (
    <div className="map-container">
      <h2>Map</h2>
      <MapContainer
        center={[37.983347, 23.746964]}
        zoom={11}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map(
          (spot) =>
            visibleSpots[spot.ID] && (
              <Marker key={spot.ID} position={[spot.Lat, spot.Lng]}>
                <Popup>
                  <div>
                    <strong>{spot.ParkingSpaceName}</strong>
                    <br />
                    Zone: {spot.ZoneName}
                    <br />
                    City: {spot.CityName}
                    <br />
                    Status: {spot.Status}
                    <br />
                    Battery: {spot.BatteryStatus}
                    <br />
                    Last Report: {spot.LastReport}
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
