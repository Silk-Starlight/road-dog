import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface TripMapProps {
  startPoint: string;
  destination: string;
  onDistanceCalculated?: (distance: number) => void;
  className?: string;
}

const TripMap: React.FC<TripMapProps> = ({
  startPoint,
  destination,
  onDistanceCalculated,
  className = "",
}) => {
  const [directions, setDirections] =
    React.useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus,
  ) => {
    if (status === "OK" && result) {
      setDirections(result);
      const distance = result.routes[0]?.legs[0]?.distance?.value || 0;
      onDistanceCalculated?.(Math.round(distance / 1609.34)); // Convert meters to miles
    } else {
      setError("Could not calculate route");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
    >
      <div className={`relative ${className}`}>
        <GoogleMap
          mapContainerClassName="w-full h-full rounded-lg"
          center={{ lat: 39.8283, lng: -98.5795 }} // Center of USA
          zoom={4}
        >
          {startPoint && destination && (
            <DirectionsService
              options={{
                destination,
                origin: startPoint,
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        {error && (
          <div className="absolute bottom-4 left-4 bg-red-100 text-red-800 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default TripMap;
