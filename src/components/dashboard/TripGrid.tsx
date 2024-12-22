import React from "react";
import TripCard from "./TripCard";
import { Trip } from "@/lib/trips";

interface TripGridProps {
  trips?: Trip[];
  onDelete?: (id: string) => void;
}

const TripGrid = ({ trips = [], onDelete }: TripGridProps) => {
  return (
    <div className="w-full min-h-[700px] bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            thumbnail={trip.thumbnail}
            destination={trip.destination}
            startDate={trip.start_date}
            endDate={trip.end_date}
            status={trip.status}
            onDelete={() => onDelete?.(trip.id)}
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
