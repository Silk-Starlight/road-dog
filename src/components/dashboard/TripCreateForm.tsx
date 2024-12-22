import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import TripMap from "@/components/maps/TripMap";

interface TripCreateFormProps {
  onSubmit?: (data: TripFormData) => void;
  onCancel?: () => void;
}

export interface TripFormData {
  startPoint: string;
  destination: string;
  tripType: "one-way" | "round-trip";
  startDate: Date;
  endDate: Date;
  distance?: number;
}

const TripCreateForm = ({
  onSubmit = () => {},
  onCancel = () => {},
}: TripCreateFormProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<TripFormData>({
    defaultValues: {
      startPoint: "",
      destination: "",
      tripType: "one-way",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [distance, setDistance] = React.useState<number>();

  const startPoint = watch("startPoint");
  const destination = watch("destination");

  const handleFormSubmit = (data: TripFormData) => {
    onSubmit({
      ...data,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      distance,
    });
  };

  const handleDistanceCalculated = (calculatedDistance: number) => {
    setDistance(calculatedDistance);
    setValue("distance", calculatedDistance);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startPoint">Starting Point</Label>
              <Input
                id="startPoint"
                placeholder="Enter starting location"
                {...register("startPoint", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Enter destination"
                {...register("destination", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tripType">Trip Type</Label>
              <Select
                onValueChange={(value) =>
                  setValue("tripType", value as "one-way" | "round-trip")
                }
                defaultValue="one-way"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trip type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-way">One-way Trip</SelectItem>
                  <SelectItem value="round-trip">Round Trip</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setValue("startDate", date || new Date());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        setValue("endDate", date || new Date());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {distance && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Estimated Distance:{" "}
                  <span className="font-medium">{distance} miles</span>
                </p>
              </div>
            )}
          </div>

          <div className="h-[500px]">
            <TripMap
              startPoint={startPoint}
              destination={destination}
              onDistanceCalculated={handleDistanceCalculated}
              className="h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Trip</Button>
      </div>
    </form>
  );
};

export default TripCreateForm;
