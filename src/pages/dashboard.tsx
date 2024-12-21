import React from "react";
import TripStats from "@/components/dashboard/TripStats";
import TripFilterBar from "@/components/dashboard/TripFilterBar";
import TripGrid from "@/components/dashboard/TripGrid";

interface DashboardProps {
  initialFilter?: string;
  onCreateTrip?: () => void;
}

const Dashboard = ({
  initialFilter = "all",
  onCreateTrip = () => console.log("Create new trip clicked"),
}: DashboardProps) => {
  const [filter, setFilter] = React.useState(initialFilter);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Road Trips</h1>
            <p className="mt-2 text-sm text-gray-600">
              Plan, manage, and track all your road trip adventures in one
              place.
            </p>
          </div>

          {/* Trip Statistics */}
          <TripStats />

          {/* Filter Bar */}
          <TripFilterBar
            selectedFilter={filter}
            onFilterChange={handleFilterChange}
            onCreateTrip={onCreateTrip}
          />

          {/* Trip Grid */}
          <TripGrid
            trips={[
              {
                id: "1",
                thumbnail:
                  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
                destination: "Pacific Coast Highway",
                startDate: "2024-06-01",
                endDate: "2024-06-07",
                status: "upcoming",
              },
              {
                id: "2",
                thumbnail:
                  "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2",
                destination: "Route 66 Adventure",
                startDate: "2024-07-15",
                endDate: "2024-07-25",
                status: "upcoming",
              },
              {
                id: "3",
                thumbnail:
                  "https://images.unsplash.com/photo-1510312305653-8ed496efae75",
                destination: "Blue Ridge Parkway",
                startDate: "2023-10-01",
                endDate: "2023-10-07",
                status: "past",
              },
            ].filter((trip) =>
              filter === "all" ? true : trip.status === filter,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
