import React from "react";
import TripCard from "./TripCard";

interface Trip {
  id: string;
  thumbnail: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "past";
}

interface TripGridProps {
  trips?: Trip[];
}

const defaultTrips: Trip[] = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    destination: "Pacific Coast Highway",
    startDate: "2024-06-01",
    endDate: "2024-06-07",
    status: "upcoming",
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2",
    destination: "Route 66 Adventure",
    startDate: "2024-07-15",
    endDate: "2024-07-25",
    status: "upcoming",
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1510312305653-8ed496efae75",
    destination: "Blue Ridge Parkway",
    startDate: "2023-10-01",
    endDate: "2023-10-07",
    status: "past",
  },
];

const TripGrid = ({ trips = defaultTrips }: TripGridProps) => {
  const handleEdit = (tripId: string) => {
    console.log("Edit trip:", tripId);
  };

  const handleDelete = (tripId: string) => {
    console.log("Delete trip:", tripId);
  };

  const handleShare = (tripId: string, link: string) => {
    console.log("Share trip:", tripId, "with link:", link);
  };

  return (
    <div className="w-full min-h-[700px] bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            thumbnail={trip.thumbnail}
            destination={trip.destination}
            startDate={trip.startDate}
            endDate={trip.endDate}
            status={trip.status}
            onEdit={() => handleEdit(trip.id)}
            onDelete={() => handleDelete(trip.id)}
            onShare={(link) => handleShare(trip.id, link)}
          />
        ))}
      </div>
      {trips.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[700px]">
          <p className="text-xl text-gray-500">No trips found</p>
          <p className="text-sm text-gray-400">
            Create a new trip to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default TripGrid;
