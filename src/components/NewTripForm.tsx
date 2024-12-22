import TripCreateForm from "@/components/dashboard/TripCreateForm";

const NewTripForm = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <TripCreateForm
        onSubmit={(data) => console.log("Form submitted:", data)}
        onCancel={() => console.log("Form cancelled")}
      />
    </div>
  );
};

export default NewTripForm;
