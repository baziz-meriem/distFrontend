import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../shared/Loader";

const Map = () => {
  const [disPosition, setPosition] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);
    if (!disPosition && id) {
      axios
        .get(
          `https://distbackend-96a5.onrender.com/api/v1/resourceManagement/distributeur/${id}`
        )
        .then((res) =>
          setPosition(
            res.data.data.position.split(",").map((elem) => Number(elem))
          )
        );
    }
  }, [id]);
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

  if (!disPosition) return <Loader/>;
  return (
    <div className="">
      <MapContainer
        style={{ height: "80vh" }}
        center={disPosition}
        zoom={5}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWVtOGIiLCJhIjoiY2xmdWN5NXIwMDlwazNxcjM2ZjV4eDVyayJ9.KI6q1LujGSSGkarrCG7aPw`}
        />
        <Marker position={disPosition} icon={positionIcon}>
          <Popup>Distributeur num {id}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
