import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";

const CedarmapToken = "2e2dfe4dc320a34c99736b8693cd6c99d7f6f985";
const defaultCenter = [35.75734729205658, 51.40998601913453];

const Map = (props) => {
  const { children, bounds, setMapData, centerMarker, zoom = 14 } = props;
  const [center, setCenter] = useState(props.center || defaultCenter);

  const renderMarker = () => (
    <div
      className="position-absolute w-100 d-flex align-items-center justify-content-center"
      style={{ height: "90%" }}
    >
      <Image src="/images/enamad.png" width={55} height={70} />
    </div>
  );

  // Get location name on start
  useEffect(() => {
    if (setMapData) {
      getLocationName(center).then((res) => setMapData({ name: res, center }));
    }
  }, [center]);

  return (
    <>
      <Head>
        <link
          href="https://api.cedarmaps.com/cedarmaps.js/v1.8.0/cedarmaps.css"
          rel="stylesheet"
        />
      </Head>

      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom="center"
        zoomControl={false}
        {...props}
        doubleClickZoom={false}
      >
        <TileLayer
          url={`https://api.cedarmaps.com/v1/tiles/cedarmaps.streets/{z}/{x}/{y}.png?access_token=${CedarmapToken}`}
        />

        {children}
      </MapContainer>
    </>
  );
};

export default Map;
