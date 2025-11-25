"use client";

import dynamic from "next/dynamic";

const IranMap = dynamic(() => import("../components/IranMap.jsx"), {
  ssr: false,
});

function MapWrapper() {
  return (
    <div>
      <IranMap />
    </div>
  );
}

export default MapWrapper;
