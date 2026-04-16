import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../shared/Loader";
import { apiUrl } from "@/config/config";

const Map = () => {
  const [disPosition, setPosition] = useState(null);
  const [detail, setDetail] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios
      .get(
        `${apiUrl.url}/resourceManagement/distributeur/${id}`
      )
      .then((res) => {
        const d = res.data?.data;
        setDetail(d);
        if (d?.position) {
          setPosition(
            String(d.position).split(",").map((elem) => Number(elem))
          );
        }
      })
      .catch(() => setPosition(null));
  }, [id]);

  const positionIcon = L.icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  const label =
    detail?.nom ||
    detail?.name ||
    (detail?.type && id ? `${detail.type} · #${id}` : null) ||
    (id ? `Distributor #${id}` : "Distributor");

  if (!disPosition) return <Loader />;
  return (
    <div className="">
      <MapContainer
        style={{ height: "80vh" }}
        center={disPosition}
        zoom={14}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={disPosition} icon={positionIcon}>
          <Popup>
            <span className="font-semibold">{label}</span>
            {detail?.type ? (
              <span className="mt-1 block text-xs text-slate-600">{detail.type}</span>
            ) : null}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
