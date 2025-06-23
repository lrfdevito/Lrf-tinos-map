import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapComponent() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch("/activity_levels.json")
      .then((res) => res.json())
      .then((data) => setSpots(data));
  }, []);

  return (
    <MapContainer center={[37.6, 25.15]} zoom={11} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((s, i) => (
        <Marker key={i} position={[s.lat, s.lon]}>
          <Popup>
            <b>{s.name}</b><br />
            Είδος: {s.species}<br />
            Πιθανότητα: {s.probability}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
