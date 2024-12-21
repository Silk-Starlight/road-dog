import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Route } from "lucide-react";

interface TripStatsProps {
  totalTrips?: number;
  upcomingTrips?: number;
  totalDistance?: number;
}

const TripStats = ({
  totalTrips = 12,
  upcomingTrips = 3,
  totalDistance = 1250,
}: TripStatsProps) => {
  return (
    <div className="w-full h-[120px] bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <Card>
          <CardContent className="flex items-center p-4 h-full">
            <Calendar className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Trips</p>
              <p className="text-2xl font-bold">{totalTrips}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4 h-full">
            <MapPin className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Upcoming Trips</p>
              <p className="text-2xl font-bold">{upcomingTrips}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4 h-full">
            <Route className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Miles</p>
              <p className="text-2xl font-bold">
                {totalDistance.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripStats;
