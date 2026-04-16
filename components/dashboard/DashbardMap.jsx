import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function parseLatLng(raw) {
  if (raw == null || typeof raw !== "string") return null;
  const parts = raw.split(",").map((s) => Number(String(s).trim()));
  if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
    return null;
  }
  return [parts[0], parts[1]];
}

function distributorLabel(d) {
  if (!d || typeof d !== "object") return "Distributor";
  if (d.nom) return String(d.nom);
  if (d.name) return String(d.name);
  if (d.type && d.id != null) return `${d.type} · #${d.id}`;
  if (d.id != null) return `Distributor #${d.id}`;
  return "Distributor";
}

function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (!positions?.length) return;
    const bounds = L.latLngBounds(positions);
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [map, positions]);
  return null;
}

const DashboradMap = ({ distributeurs }) => {
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

  const markers = useMemo(() => {
    const list = Array.isArray(distributeurs) ? distributeurs : [];
    return list
      .map((d) => {
        const position = parseLatLng(d?.position);
        if (!position) return null;
        const rowKey = d.id != null ? String(d.id) : position.join(",");
        return { d, position, label: distributorLabel(d), rowKey };
      })
      .filter(Boolean);
  }, [distributeurs]);

  const fitPositions = useMemo(
    () => markers.map((m) => m.position),
    [markers]
  );

  const defaultCenter = [29.850077, 3.089760];
  const center =
    markers.length === 1 ? markers[0].position : defaultCenter;

  return (
    <div className="relative min-h-[320px] w-full">
      {markers.length === 0 ? (
        <div className="flex min-h-[50vh] items-center justify-center rounded-lg bg-slate-50 px-4 text-center text-sm text-slate-600">
          No distributor locations yet. Add distributors with valid coordinates to see them on the map.
        </div>
      ) : (
        <MapContainer
          style={{ height: "80vh", minHeight: 360 }}
          center={center}
          zoom={markers.length === 1 ? 12 : 5}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {fitPositions.length > 1 ? <FitBounds positions={fitPositions} /> : null}
          {markers.map(({ d, position, label, rowKey }) => (
            <Marker key={rowKey} position={position} icon={positionIcon}>
              <Popup>
                <span className="font-semibold">{label}</span>
                {d?.type ? (
                  <span className="mt-1 block text-xs text-slate-600">{d.type}</span>
                ) : null}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default DashboradMap;
