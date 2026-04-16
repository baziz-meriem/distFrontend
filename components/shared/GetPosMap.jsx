import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const GetPosMap = ({ setData, data }) => {
  function AddMarkerToClick() {
    const [initialPosition, setInitialPosition] = useState([36, 5]);
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
    const [marker, setMarker] = useState(
      data.position ? data.position.split(",") : null
    );

    const map = useMapEvents({
      click(e) {
        const newMarker = e.latlng;
        setData({ ...data, position: newMarker.lat + "," + newMarker.lng });
        setMarker(newMarker);
      },
    });

    return (
      <>
        {marker ? (
          <Marker position={marker} icon={positionIcon}>
            <Popup>Marker is at {marker}</Popup>
          </Marker>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-gray-300">
        <div className="p-2">Click the map to set the distributor location</div>
      <MapContainer style={{ height: "45vh" }} center={[31, 5]} zoom={6}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWVtOGIiLCJhIjoiY2xmdWN5NXIwMDlwazNxcjM2ZjV4eDVyayJ9.KI6q1LujGSSGkarrCG7aPw`}
        />
        <AddMarkerToClick />
      </MapContainer>
    </div>
  );
};

export default GetPosMap;
