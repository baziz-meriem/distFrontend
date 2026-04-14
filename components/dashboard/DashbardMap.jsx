import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const DashboradMap = ({ distributeurs }) => {
  const [position, setPosition] = useState([51.505, -0.09]); // set the initial position for the marker
  const positionIcon = L.icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [20, 38],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  return (
    <div className="">
      <MapContainer
        style={{ height: "80vh" }}
        center={[29.850077, 3.089760]}
        zoom={5}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWVtOGIiLCJhIjoiY2xmdWN5NXIwMDlwazNxcjM2ZjV4eDVyayJ9.KI6q1LujGSSGkarrCG7aPw`}
        />
        {distributeurs.map((distributeur, key) => {
          let distributeurPosition = distributeur.position
            .split(",")
            .map((elem) => Number(elem));
          return (
            <Marker position={distributeurPosition} icon={positionIcon}>
              <Popup>Distributeur num {distributeur.id}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DashboradMap;
