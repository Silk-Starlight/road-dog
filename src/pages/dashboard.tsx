import React from "react";
import { useNavigate } from "react-router-dom";
import TripStats from "@/components/dashboard/TripStats";
import TripFilterBar from "@/components/dashboard/TripFilterBar";
import TripGrid from "@/components/dashboard/TripGrid";
import { getTrips, deleteTrip, Trip } from "@/lib/trips";
import { useToast } from "@/components/ui/use-toast";

interface DashboardProps {
  initialFilter?: string;
  onCreateTrip?: () => void;
}

const Dashboard = ({ initialFilter = "all", onCreateTrip }: DashboardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filter, setFilter] = React.useState(initialFilter);
  const [trips, setTrips] = React.useState<Trip[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load trips",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleCreateTrip = () => {
    if (onCreateTrip) {
      onCreateTrip();
    } else {
      navigate("/create-trip");
    }
  };

  const handleDeleteTrip = async (id: string) => {
    try {
      await deleteTrip(id);
      await loadTrips();
      toast({
        title: "Success",
        description: "Trip deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete trip",
        variant: "destructive",
      });
    }
  };

  const filteredTrips = trips.filter((trip) =>
    filter === "all" ? true : trip.status === filter,
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Road Trips</h1>
            <p className="mt-2 text-sm text-gray-600">
              Plan, manage, and track all your road trip adventures in one
              place.
            </p>
          </div>

          <TripStats
            totalTrips={trips.length}
            upcomingTrips={
              trips.filter((trip) => trip.status === "upcoming").length
            }
          />

          <TripFilterBar
            selectedFilter={filter}
            onFilterChange={handleFilterChange}
            onCreateTrip={handleCreateTrip}
          />

          <TripGrid trips={filteredTrips} onDelete={handleDeleteTrip} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
