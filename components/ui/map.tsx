"use client";
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMeters } from "@/hooks/useMeter";
import { Skeleton } from "./skeleton";
import { chipConfig, MeterStatus } from "@/utils/getChipColor";
import Chip from "./chip";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: -34.905,
  lng: -58.038,
};

function Map() {
  const { data, isLoading, isError, error } = useMeters();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) || "",
  });

  const OPTIONS = {
    minZoom: 2,
    maxZoom: 16,
  };

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = React.useState<number | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (index: number) => {
    setActiveMarker((prev) => (prev === index ? null : index)); // Toggle marker visibility
  };

  if (isLoading) return <Skeleton className="h-[617px] w-full bg-gray-300" />;
  if (isError) return <p>Error: {error?.message}</p>;

  // Ensure data has coordinates

  const markers = data?.filter((item: any) => item.coordinates) || [];

  return isLoaded ? (
    <GoogleMap
      options={OPTIONS}
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((item: any, index: any) => {
        const status = item.status as MeterStatus;
        const { color, text } = chipConfig[status];
        return (
          <Marker
            key={index}
            position={{
              lat: item.coordinates.lat,
              lng: item.coordinates.lng,
            }}
            onClick={() => handleMarkerClick(index)}
          >
            {activeMarker === index && (
              <InfoWindow
                position={{
                  lat: item.coordinates.lat,
                  lng: item.coordinates.lng,
                }}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="p-2 bg-white rounded shadow-lg flex flex-col justify-start items-start gap-4">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground">
                      Dirección
                    </p>
                    <p className="text-balance text-md text-left">
                      {item.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-balance text-sm text-muted-foreground">
                      Estado
                    </p>
                    <Chip text={text} backgroundColor={color} />
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  ) : (
    <Skeleton className="h-[617px] w-full bg-gray-300" />
  );
}

export default React.memo(Map);
