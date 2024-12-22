import React from "react";
import { useNavigate } from "react-router-dom";
import TripCreateForm, {
  TripFormData,
} from "@/components/dashboard/TripCreateForm";
import { createTrip } from "@/lib/trips";
import { useToast } from "@/components/ui/use-toast";

const CreateTripPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: TripFormData) => {
    try {
      const thumbnail = `https://source.unsplash.com/featured/800x600/?road,trip,${encodeURIComponent(data.destination)}`;

      await createTrip({
        start_point: data.startPoint,
        destination: data.destination,
        trip_type: data.tripType,
        start_date: data.startDate,
        end_date: data.endDate,
        thumbnail,
        status: new Date(data.startDate) > new Date() ? "upcoming" : "past",
      });

      toast({
        title: "Success",
        description: "Trip created successfully",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create trip",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Trip</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to plan your new road trip adventure.
          </p>
        </div>
        <TripCreateForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default CreateTripPage;
