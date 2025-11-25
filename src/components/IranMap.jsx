"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";

export default function IranMapClient() {
  const [geoData, setGeoData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/marakez_shar_geojson.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const onEachFeature = (feature, layer) => {
    const name = feature.properties?.name || "Unknown";

    layer.bindTooltip(name);

    layer.on("click", () => {
      // مرحله دوم: ارسال نام شهر به URL
      router.push(`?city=${encodeURIComponent(name)}`);
    });

    if (layer.setStyle) {
      layer.on("mouseover", () => {
        layer.setStyle({
          weight: 2,
          fillOpacity: 0.8,
        });
      });

      layer.on("mouseout", () => {
        layer.setStyle({
          weight: 1,
          fillOpacity: 0.6,
        });
      });
    }
  };

  return (
    <div className="w-full h-[600px]">
      <MapContainer
        center={[32, 53]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {geoData && (
          <GeoJSON
            data={geoData}
            onEachFeature={onEachFeature}
            style={{
              color: "#333",
              weight: 1,
              fillColor: "#cce5ff",
              fillOpacity: 0.6,
            }}
            pointToLayer={(feature, latlng) => {
              return L.circleMarker(latlng, {
                radius: 6,
                fillColor: "#3388ff",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
              });
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
