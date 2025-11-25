"use client";

import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function IranMapClient() {
  const [geoData, setGeoData] = useState(null);
  const router = useRouter();

  // -----------------------------
  // Define custom marker icon
  // -----------------------------
  const customIcon = new L.Icon({
    iconUrl: "/pink-location.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  // -----------------------------
  // Load GeoJSON file
  // -----------------------------
  useEffect(() => {
    fetch("/marakez_shar_geojson.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <div className="w-full h-[600px]">
      <MapContainer
        center={[32, 53]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Create markers for cities */}
        {geoData &&
          geoData.features
            .filter((f) => f.geometry.type === "Point")
            .map((city, idx) => (
              <Marker
                key={idx}
                position={[
                  city.geometry.coordinates[1],
                  city.geometry.coordinates[0],
                ]}
                icon={customIcon}
                eventHandlers={{
                  click: () =>
                    router.push(
                      `?city=${encodeURIComponent(city.properties.name)}`
                    ),
                }}
              >
                <Popup>{city.properties.name}</Popup>
              </Marker>
            ))}
      </MapContainer>
    </div>
  );
}
